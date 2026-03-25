import { LitElement, css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { getLanguage, getTranslations } from './i18n';
import { PRESET_STYLES, getDensityValues } from './presets';
import { buildFacts, buildHeadline, formatTime } from './presenters';
import type { CardConfig, FactKey, ForecastItem, HomeAssistant } from './types';
import { createWeatherSnapshot } from './weather';

declare global {
  interface Window {
    customCards?: Array<Record<string, any>>;
  }
}

const CARD_TAG = 'zs-daily-prophet-card';

const DEFAULT_CONFIG: CardConfig = {
  type: `custom:${CARD_TAG}`,
  entity: '',
  title: 'Daily Prophet',
  subtitle: 'Weather Edition',
  location: '',
  style: {
    preset: 'classic_prophet',
    density: 'comfortable',
    paper_texture: true,
    animated_hero: false,
    show_masthead: true,
    show_almanac: true,
    show_forecast: true,
    show_alerts: true,
  },
  layout: {
    mode: 'frontpage',
    forecast_mode: 'daily',
    forecast_items: 5,
    facts: ['humidity', 'wind', 'pressure', 'precipitation'],
  },
  content: {
    headline_mode: 'auto',
    headline_template: '',
    condition_labels: 'auto',
  },
  entities: {},
  tap_action: {
    action: 'more-info',
  },
};

function mergeConfig(config: CardConfig): CardConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    style: { ...DEFAULT_CONFIG.style, ...(config.style || {}) },
    layout: { ...DEFAULT_CONFIG.layout, ...(config.layout || {}) },
    content: { ...DEFAULT_CONFIG.content, ...(config.content || {}) },
    entities: { ...DEFAULT_CONFIG.entities, ...(config.entities || {}) },
    tap_action: { ...DEFAULT_CONFIG.tap_action, ...(config.tap_action || {}) },
  };
}

function getConditionIcon(condition: string): string {
  switch (condition) {
    case 'sunny':
      return '☼';
    case 'partlycloudy':
      return '⛅';
    case 'rainy':
    case 'pouring':
      return '☔';
    case 'lightning':
    case 'lightning_rainy':
      return '☇';
    case 'snowy':
    case 'snowy_rainy':
      return '❄';
    case 'fog':
      return '〰';
    case 'windy':
    case 'windy_variant':
      return '🜁';
    default:
      return '☁';
  }
}

function formatForecastLabel(item: ForecastItem, mode: 'auto' | 'hourly' | 'daily'): string {
  if (!item.datetime) {
    return 'Edition';
  }

  const date = new Date(item.datetime);
  if (Number.isNaN(date.getTime())) {
    return 'Edition';
  }

  if (mode === 'hourly') {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return date.toLocaleDateString([], {
    weekday: 'short',
  });
}

class ZSDailyProphetCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
  };

  static getStubConfig() {
    return {
      type: `custom:${CARD_TAG}`,
      entity: 'weather.home',
      title: 'Prorok Codzienny',
      subtitle: 'Wydanie pogodowe',
      location: 'Hogwart i okolice',
      style: {
        preset: 'classic_prophet',
      },
    };
  }

  static styles = css`
    :host {
      display: block;
      --zs-prophet-card-bg: linear-gradient(180deg, rgba(118,91,56,0.96), rgba(68,49,28,0.98));
      --zs-prophet-paper: linear-gradient(180deg, #f3e8c9 0%, #e8d7b1 54%, #d3ba8b 100%);
      --zs-prophet-ink: #2e2215;
      --zs-prophet-muted: rgba(46, 34, 21, 0.64);
      --zs-prophet-accent: #8f6230;
      --zs-prophet-accent-soft: rgba(143, 98, 48, 0.18);
      --zs-prophet-border: #8f6b3d;
      --zs-prophet-alert: #8d2b1f;
      --zs-prophet-shadow: rgba(34, 22, 10, 0.24);
      --zs-prophet-title: "Cinzel Decorative", "Cinzel", Georgia, serif;
      --zs-prophet-copy: "Cormorant Garamond", Georgia, serif;
      --zs-prophet-card-padding: 22px;
      --zs-prophet-gap: 18px;
      --zs-prophet-hero-padding: 20px;
    }

    ha-card {
      position: relative;
      overflow: hidden;
      border-radius: 30px;
      padding: var(--zs-prophet-card-padding);
      background: var(--zs-prophet-card-bg);
      border: 1px solid color-mix(in srgb, var(--zs-prophet-border) 50%, transparent);
      box-shadow: 0 24px 44px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      color: var(--zs-prophet-ink);
      cursor: pointer;
    }

    .frame {
      position: relative;
      display: grid;
      gap: var(--zs-prophet-gap);
      background: var(--zs-prophet-paper);
      border-radius: 24px;
      padding: var(--zs-prophet-card-padding);
      border: 1px solid color-mix(in srgb, var(--zs-prophet-border) 42%, transparent);
      box-shadow: inset 0 0 0 1px rgba(255, 248, 230, 0.26), 0 16px 32px var(--zs-prophet-shadow);
    }

    .frame::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.5;
      background:
        radial-gradient(circle at 15% 12%, rgba(255,255,255,0.38), transparent 22%),
        linear-gradient(135deg, rgba(255,255,255,0.08), transparent 38%, rgba(88,57,28,0.04) 90%);
      mix-blend-mode: screen;
    }

    .paper-texture::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.18;
      background-image:
        radial-gradient(rgba(79, 51, 23, 0.28) 0.55px, transparent 0.7px),
        radial-gradient(rgba(255, 251, 239, 0.45) 0.55px, transparent 0.8px);
      background-size: 18px 18px, 24px 24px;
      background-position: 0 0, 11px 9px;
    }

    .masthead {
      display: grid;
      gap: 4px;
      justify-items: center;
      text-align: center;
      padding-bottom: 14px;
      border-bottom: 1px solid color-mix(in srgb, var(--zs-prophet-border) 48%, transparent);
    }

    .eyebrow,
    .subtitle,
    .edition-row,
    .lede,
    .fact-label,
    .section-meta,
    .forecast-name,
    .forecast-extra {
      font-family: var(--zs-prophet-copy);
    }

    .eyebrow {
      font-size: 0.84rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--zs-prophet-muted);
    }

    .title,
    .headline,
    .temperature,
    .fact-value,
    .section-title {
      font-family: var(--zs-prophet-title);
    }

    .title {
      font-size: clamp(2rem, 5vw, 3.4rem);
      line-height: 0.95;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .subtitle {
      font-size: 1.08rem;
      color: var(--zs-prophet-muted);
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(210px, 0.9fr);
      gap: 18px;
      align-items: stretch;
    }

    .lead,
    .hero-side {
      padding: var(--zs-prophet-hero-padding);
      border-radius: 22px;
      border: 1px solid rgba(104, 73, 39, 0.12);
    }

    .lead {
      display: grid;
      gap: 12px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08)),
        color-mix(in srgb, var(--zs-prophet-accent-soft) 100%, transparent);
    }

    .edition-row,
    .section-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px 14px;
      align-items: center;
    }

    .edition-row,
    .section-meta,
    .lede,
    .forecast-extra,
    .forecast-name {
      color: var(--zs-prophet-muted);
    }

    .headline {
      font-size: clamp(1.3rem, 3vw, 2rem);
      line-height: 1.05;
      text-wrap: balance;
    }

    .lede {
      font-size: 1.08rem;
      line-height: 1.18;
    }

    .hero-side {
      position: relative;
      display: grid;
      gap: 12px;
      align-content: space-between;
      background:
        radial-gradient(circle at 50% 28%, rgba(255,255,255,0.42), transparent 32%),
        linear-gradient(180deg, rgba(250,240,215,0.82), rgba(227,208,168,0.75));
      overflow: hidden;
      min-height: 260px;
    }

    .hero-side.animated::before {
      content: "";
      position: absolute;
      inset: auto -10% 18% -10%;
      height: 84px;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(255,255,255,0.38), rgba(255,255,255,0));
      animation: drift 11s ease-in-out infinite alternate;
      opacity: 0.75;
    }

    .icon-medallion {
      width: 124px;
      height: 124px;
      margin: 0 auto;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background:
        radial-gradient(circle at 50% 35%, rgba(255,255,255,0.86), rgba(214,180,122,0.75) 64%, rgba(120,79,37,0.84) 100%);
      border: 2px solid color-mix(in srgb, var(--zs-prophet-border) 72%, white);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.56), 0 16px 26px rgba(88, 57, 28, 0.18);
      font-size: 3rem;
    }

    .temperature {
      font-size: clamp(2.8rem, 7vw, 4.8rem);
      line-height: 0.92;
      text-align: center;
    }

    .condition,
    .apparent {
      font-family: var(--zs-prophet-copy);
      text-align: center;
    }

    .condition {
      font-size: 1.2rem;
      text-transform: capitalize;
    }

    .apparent {
      font-size: 1rem;
      color: var(--zs-prophet-muted);
    }

    .facts,
    .forecast,
    .almanac {
      display: grid;
      gap: 12px;
    }

    .facts {
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    }

    .forecast {
      grid-template-columns: repeat(auto-fit, minmax(94px, 1fr));
    }

    .almanac {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .fact,
    .forecast-item,
    .almanac-item,
    .alert {
      border-radius: 16px;
      border: 1px solid rgba(104, 73, 39, 0.12);
    }

    .fact,
    .almanac-item {
      padding: 12px 14px;
      background: rgba(255, 248, 230, 0.28);
    }

    .forecast-item {
      padding: 14px 12px;
      text-align: center;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.34), rgba(255,255,255,0.14)),
        rgba(255, 248, 230, 0.16);
    }

    .alert {
      padding: 14px 16px;
      background: linear-gradient(180deg, rgba(166,56,40,0.12), rgba(141,43,31,0.18));
      color: var(--zs-prophet-alert);
    }

    .fact-label {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--zs-prophet-muted);
    }

    .fact-value {
      margin-top: 4px;
      font-size: 1.2rem;
    }

    .section {
      display: grid;
      gap: 12px;
    }

    .section-header {
      padding-top: 4px;
      border-top: 1px solid color-mix(in srgb, var(--zs-prophet-border) 38%, transparent);
    }

    .section-title {
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 1rem;
    }

    .forecast-temp {
      margin: 8px 0;
      font-family: var(--zs-prophet-title);
      font-size: 1.35rem;
    }

    .empty {
      padding: 24px 16px;
      font-family: var(--zs-prophet-copy);
      color: var(--zs-prophet-muted);
      text-align: center;
    }

    @keyframes drift {
      from { transform: translateX(-4%); }
      to { transform: translateX(7%); }
    }

    @media (max-width: 760px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .hero-side {
        min-height: 0;
      }

      .title {
        font-size: clamp(1.8rem, 9vw, 2.9rem);
      }
    }
  `;

  hass?: HomeAssistant;
  config!: CardConfig;

  setConfig(config: CardConfig) {
    const mergedConfig = mergeConfig(config);
    if (!mergedConfig.entity?.trim()) {
      throw new Error('`entity` is required.');
    }
    this.config = mergedConfig;
  }

  getCardSize() {
    return 6;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 4,
      rows: 6,
      min_rows: 5,
    };
  }

  get language() {
    const configured = this.config?.content?.condition_labels;
    if (configured && configured !== 'auto') {
      return configured;
    }

    return getLanguage(this.hass);
  }

  get t() {
    return getTranslations(this.language);
  }

  get preset() {
    return PRESET_STYLES[this.config.style?.preset || 'classic_prophet'] || PRESET_STYLES.classic_prophet;
  }

  get selectedFacts(): FactKey[] {
    return this.config.layout?.facts?.length ? this.config.layout.facts : ['humidity', 'wind', 'pressure', 'precipitation'];
  }

  openMoreInfo() {
    if (this.config.tap_action?.action === 'none') {
      return;
    }

    const event = new Event('hass-more-info', { bubbles: true, composed: true }) as Event & {
      detail?: { entityId: string };
    };
    event.detail = { entityId: this.config.entity };
    this.dispatchEvent(event);
  }

  computeCardStyle() {
    const density = getDensityValues(this.config.style?.density);

    return {
      '--zs-prophet-card-bg': this.config.style?.background || this.preset.cardBackground,
      '--zs-prophet-paper': this.config.style?.paper_color || this.preset.paper,
      '--zs-prophet-ink': this.config.style?.ink_color || this.preset.ink,
      '--zs-prophet-muted': this.preset.muted,
      '--zs-prophet-accent': this.config.style?.accent_color || this.preset.accent,
      '--zs-prophet-accent-soft': this.preset.accentSoft,
      '--zs-prophet-border': this.config.style?.accent_color || this.preset.border,
      '--zs-prophet-alert': this.preset.alert,
      '--zs-prophet-shadow': this.preset.shadow,
      '--zs-prophet-card-padding': density.cardPadding,
      '--zs-prophet-gap': density.gap,
      '--zs-prophet-hero-padding': density.heroPadding,
    };
  }

  renderForecastItem(item: ForecastItem) {
    const mode = this.config.layout?.forecast_mode || 'daily';
    return html`
      <div class="forecast-item">
        <div class="forecast-name">${formatForecastLabel(item, mode)}</div>
        <div class="forecast-temp">${item.temperature !== undefined ? `${Math.round(item.temperature)}°` : '-'}</div>
        <div class="forecast-extra">${getConditionIcon(item.condition || 'cloudy')} ${item.condition || ''}</div>
      </div>
    `;
  }

  render() {
    if (!this.config || !this.hass) {
      return html`<ha-card><div class="empty">Loading weather edition...</div></ha-card>`;
    }

    const snapshot = createWeatherSnapshot(this.hass, this.config);
    const facts = buildFacts(snapshot, this.selectedFacts, this.language);
    const headline = this.config.content?.headline_mode === 'none'
      ? ''
      : this.config.content?.headline_mode === 'custom' && this.config.content.headline_template
        ? this.config.content.headline_template
        : buildHeadline(snapshot, this.language);
    const forecastItems = snapshot.forecast.slice(0, this.config.layout?.forecast_items || 5);
    const conditionLabel = this.t.conditions[snapshot.condition as keyof typeof this.t.conditions] || snapshot.condition;

    return html`
      <ha-card style=${styleMap(this.computeCardStyle())} @click=${() => this.openMoreInfo()}>
        <div class=${`frame ${this.config.style?.paper_texture === false ? '' : 'paper-texture'}`}>
          ${this.config.style?.show_masthead === false ? '' : html`
            <div class="masthead">
              <div class="eyebrow">${this.t.eyebrow}</div>
              <div class="title">${this.config.title || this.t.defaultTitle}</div>
              ${this.config.subtitle ? html`<div class="subtitle">${this.config.subtitle}</div>` : ''}
            </div>
          `}

          <section class="hero">
            <div class="lead">
              <div class="edition-row">
                <span>${snapshot.friendlyName}</span>
                <span>${this.t.updated}: ${snapshot.lastUpdatedLabel}</span>
              </div>
              ${headline ? html`<div class="headline">${headline}</div>` : ''}
              <div class="lede">${snapshot.attribution || this.config.location || snapshot.friendlyName}</div>
              <div class="facts">
                ${facts.map((fact) => html`
                  <div class="fact">
                    <div class="fact-label">${fact.label}</div>
                    <div class="fact-value">${fact.value}</div>
                  </div>
                `)}
              </div>
            </div>

            <div class=${`hero-side ${this.config.style?.animated_hero ? 'animated' : ''}`}>
              <div class="icon-medallion">${getConditionIcon(snapshot.condition)}</div>
              <div class="temperature">${snapshot.temperature !== undefined ? `${Math.round(snapshot.temperature)}°` : '-'}</div>
              <div class="condition">${conditionLabel}</div>
              <div class="apparent">
                ${this.t.feelsLike}: ${snapshot.apparentTemperature !== undefined ? `${Math.round(snapshot.apparentTemperature)}°` : '-'}
              </div>
            </div>
          </section>

          ${this.config.style?.show_alerts === false || !snapshot.alerts.length ? '' : html`
            <section class="section">
              <div class="section-header">
                <div class="section-title">${this.t.specialEdition}</div>
              </div>
              ${snapshot.alerts.map((alert) => html`<div class="alert">${alert}</div>`)}
            </section>
          `}

          ${this.config.style?.show_forecast === false ? '' : html`
            <section class="section">
              <div class="section-header">
                <div class="section-title">${this.t.forecastTitle}</div>
                <div class="section-meta">${forecastItems.length} items</div>
              </div>
              ${forecastItems.length
                ? html`<div class="forecast">${forecastItems.map((item) => this.renderForecastItem(item))}</div>`
                : html`<div class="empty">${this.t.noForecast}</div>`}
            </section>
          `}

          ${this.config.style?.show_almanac === false ? '' : html`
            <section class="section">
              <div class="section-header">
                <div class="section-title">${this.t.almanacTitle}</div>
                <div class="section-meta">${snapshot.state}</div>
              </div>
              <div class="almanac">
                <div class="almanac-item">
                  <div class="fact-label">${this.t.facts.sunrise}</div>
                  <div class="fact-value">${formatTime(snapshot.sunrise)}</div>
                </div>
                <div class="almanac-item">
                  <div class="fact-label">${this.t.facts.sunset}</div>
                  <div class="fact-value">${formatTime(snapshot.sunset)}</div>
                </div>
              </div>
            </section>
          `}
        </div>
      </ha-card>
    `;
  }
}

customElements.define(CARD_TAG, ZSDailyProphetCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: 'ZS Daily Prophet Card',
  preview: true,
  description: 'Daily Prophet inspired weather card for Home Assistant',
  documentationURL: 'https://github.com/bwrwk/zs-daily-prophet-card',
});
