# ZS Daily Prophet Card

An elegant Daily Prophet inspired weather card for Home Assistant Lovelace.

## Status

Current release line: `0.1.0`

This first version includes:

- a complete standalone repository and build pipeline
- a polished `Classic Prophet` preset
- architecture prepared for `Weather Bureau Bulletin` and `Animated Front Page`
- responsive layout for desktop and mobile
- flexible YAML API around `weather.*` plus optional sensor overrides
- a Home Assistant visual config editor for the main card options
- basic tests for headline and metric presentation logic

## Vision

`zs-daily-prophet-card` is part of a larger wizard-themed dashboard, but its visual language is intentionally distinct from `zs-wizard-clock-card`.

Instead of a magical instrument, this card feels like a printed weather edition:

- editorial masthead
- atmospheric hero panel
- important field notes and weather facts
- forecast presented like a newspaper strip
- optional alert treatment for severe conditions

## Presets

- `classic_prophet`
- `weather_bureau`
- `animated_frontpage`

The first implementation is tuned for `classic_prophet`, while the other two presets are already available in the API and prepared for visual expansion.

## Example

```yaml
type: custom:zs-daily-prophet-card
entity: weather.home
title: Prorok Codzienny
subtitle: Wydanie pogodowe
location: Hogwart i okolice
style:
  preset: classic_prophet
  density: comfortable
  paper_texture: true
  animated_hero: false
  show_masthead: true
  show_almanac: true
  show_forecast: true
  show_alerts: true
layout:
  forecast_mode: auto
  forecast_items: 5
  facts:
    - humidity
    - wind
    - pressure
    - precipitation
content:
  headline_mode: auto
  condition_labels: pl
entities:
  forecast_entity: sensor.weather_home_daily
  forecast_attribute: forecast
  humidity: sensor.outdoor_humidity
  pressure: sensor.outdoor_pressure
  wind_speed: sensor.wind_speed
  wind_bearing: sensor.wind_bearing
  apparent_temperature: sensor.feels_like
  sunrise: sensor.sun_next_rising
  sunset: sensor.sun_next_setting
  alerts:
    - binary_sensor.weather_warning
```

## Data Sources

The card is designed around `weather.*` as the primary source.

- `entity: weather.home` provides the current weather state and headline data.
- The card now also tries to fetch forecast data directly via Home Assistant `weather.get_forecasts`.
- If your Home Assistant setup does not expose forecast data directly on the `weather.*` entity, use `entities.forecast_entity`.
- `entities.forecast_entity` should point to a helper or template sensor whose attribute contains a forecast array.
- `entities.forecast_attribute` defaults to `forecast`.

Example bridge pattern for newer Home Assistant setups:

```yaml
type: custom:zs-daily-prophet-card
entity: weather.home
entities:
  forecast_entity: sensor.weather_home_daily
```

## Forecast and Alerts

Forecast rendering now supports:

- `forecast_mode: auto` to infer hourly vs daily from timestamps
- `forecast_mode: hourly`
- `forecast_mode: daily`
- precipitation amount and probability when available
- daily high/low presentation when `templow` is present

Alerts support one or more entities in `entities.alerts`.

Useful alert attributes if your entity exposes them:

- `headline`
- `title`
- `description`
- `message`
- `severity`

Example:

```yaml
type: custom:zs-daily-prophet-card
entity: weather.home
entities:
  alerts:
    - binary_sensor.meteo_warning
```

## Development

```bash
npm install
npm test
npm run build
```
