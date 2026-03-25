import { getTranslations } from './i18n';
import type { FactKey, PresentedFact, WeatherSnapshot } from './types';

export function formatNumber(value: number | undefined, fractionDigits = 0): string {
  if (value === undefined || Number.isNaN(value)) {
    return '-';
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatTime(value?: string): string {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function cardinalFromBearing(bearing?: number): string {
  if (bearing === undefined || Number.isNaN(bearing)) {
    return '';
  }

  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((((bearing % 360) + 360) % 360) / 45) % 8;
  return directions[index];
}

export function buildHeadline(snapshot: WeatherSnapshot, language: 'pl' | 'en'): string {
  const t = getTranslations(language);
  const condition = t.conditions[snapshot.condition as keyof typeof t.conditions] || snapshot.condition || t.conditions.cloudy;
  const temp = snapshot.temperature !== undefined ? `${Math.round(snapshot.temperature)}°` : '';

  if (snapshot.alerts.length) {
    return language === 'pl'
      ? `Pilna depesza: ${condition} nadciaga do ${snapshot.friendlyName}`
      : `Urgent bulletin: ${condition} moving over ${snapshot.friendlyName}`;
  }

  if (snapshot.condition === 'sunny') {
    return language === 'pl'
      ? `Jasne niebo nad ${snapshot.friendlyName}, ${temp} w porannym wydaniu`
      : `Clear skies over ${snapshot.friendlyName}, ${temp} in the morning edition`;
  }

  if (snapshot.condition === 'rainy' || snapshot.condition === 'pouring' || snapshot.condition === 'lightning_rainy') {
    return language === 'pl'
      ? `Deszczowy numer dla ${snapshot.friendlyName}, przygotuj peleryne`
      : `Rain-soaked edition for ${snapshot.friendlyName}, cloaks advised`;
  }

  if (snapshot.condition === 'snowy' || snapshot.condition === 'snowy_rainy') {
    return language === 'pl'
      ? `Zimny front nad ${snapshot.friendlyName}, pergaminy trzepoca na wietrze`
      : `A cold front over ${snapshot.friendlyName}, parchments flutter in the wind`;
  }

  return language === 'pl'
    ? `${condition} w ${snapshot.friendlyName}, obecnie ${temp}`
    : `${condition} in ${snapshot.friendlyName}, currently ${temp}`;
}

export function buildFacts(snapshot: WeatherSnapshot, facts: FactKey[], language: 'pl' | 'en'): PresentedFact[] {
  const t = getTranslations(language);

  const map: Record<FactKey, PresentedFact> = {
    humidity: { key: 'humidity', label: t.facts.humidity, value: snapshot.humidity !== undefined ? `${formatNumber(snapshot.humidity)}%` : '-' },
    wind: {
      key: 'wind',
      label: t.facts.wind,
      value: snapshot.windSpeed !== undefined ? `${formatNumber(snapshot.windSpeed)} ${cardinalFromBearing(snapshot.windBearing)}`.trim() : '-',
    },
    pressure: { key: 'pressure', label: t.facts.pressure, value: snapshot.pressure !== undefined ? `${formatNumber(snapshot.pressure)} hPa` : '-' },
    precipitation: {
      key: 'precipitation',
      label: t.facts.precipitation,
      value: snapshot.precipitation !== undefined ? `${formatNumber(snapshot.precipitation, 1)} mm` : '-',
    },
    visibility: { key: 'visibility', label: t.facts.visibility, value: snapshot.visibility !== undefined ? `${formatNumber(snapshot.visibility, 1)} km` : '-' },
    uv: { key: 'uv', label: t.facts.uv, value: snapshot.uvIndex !== undefined ? formatNumber(snapshot.uvIndex, 1) : '-' },
    cloud_coverage: {
      key: 'cloud_coverage',
      label: t.facts.cloud_coverage,
      value: snapshot.cloudCoverage !== undefined ? `${formatNumber(snapshot.cloudCoverage)}%` : '-',
    },
    sunrise: { key: 'sunrise', label: t.facts.sunrise, value: formatTime(snapshot.sunrise) },
    sunset: { key: 'sunset', label: t.facts.sunset, value: formatTime(snapshot.sunset) },
  };

  return facts.map((fact) => map[fact]).filter(Boolean);
}
