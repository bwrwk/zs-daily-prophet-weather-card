import type { CardConfig, ForecastItem, HassEntity, HomeAssistant, WeatherSnapshot } from './types';

function getEntity(hass: HomeAssistant | undefined, entityId?: string): HassEntity | undefined {
  if (!hass || !entityId) {
    return undefined;
  }

  return hass.states?.[entityId];
}

function readNumberEntityState(entity?: HassEntity): number | undefined {
  if (!entity) {
    return undefined;
  }

  const value = Number(entity.state);
  return Number.isFinite(value) ? value : undefined;
}

function readNumberAttribute(entity: HassEntity | undefined, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = Number(entity?.attributes?.[key]);
    if (Number.isFinite(value)) {
      return value;
    }
  }

  return undefined;
}

function readStringAttribute(entity: HassEntity | undefined, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = entity?.attributes?.[key];
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value);
    }
  }

  return undefined;
}

function normalizeForecast(raw: any): ForecastItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.map((item) => ({
    datetime: item?.datetime,
    temperature: Number.isFinite(Number(item?.temperature)) ? Number(item.temperature) : undefined,
    templow: Number.isFinite(Number(item?.templow)) ? Number(item.templow) : undefined,
    condition: item?.condition ? String(item.condition) : undefined,
    precipitation: Number.isFinite(Number(item?.precipitation)) ? Number(item.precipitation) : undefined,
    precipitation_probability: Number.isFinite(Number(item?.precipitation_probability)) ? Number(item.precipitation_probability) : undefined,
    wind_speed: Number.isFinite(Number(item?.wind_speed)) ? Number(item.wind_speed) : undefined,
  }));
}

export function createWeatherSnapshot(hass: HomeAssistant, config: CardConfig): WeatherSnapshot {
  const weatherEntity = getEntity(hass, config.entity);
  const overrides = config.entities || {};

  const humidityEntity = getEntity(hass, overrides.humidity);
  const pressureEntity = getEntity(hass, overrides.pressure);
  const windSpeedEntity = getEntity(hass, overrides.wind_speed);
  const windBearingEntity = getEntity(hass, overrides.wind_bearing);
  const apparentEntity = getEntity(hass, overrides.apparent_temperature);
  const visibilityEntity = getEntity(hass, overrides.visibility);
  const uvEntity = getEntity(hass, overrides.uv_index);
  const cloudEntity = getEntity(hass, overrides.cloud_coverage);
  const precipitationEntity = getEntity(hass, overrides.precipitation);
  const sunriseEntity = getEntity(hass, overrides.sunrise);
  const sunsetEntity = getEntity(hass, overrides.sunset);
  const alertEntities = (overrides.alerts || []).map((entityId) => getEntity(hass, entityId)).filter(Boolean) as HassEntity[];

  const lastUpdated = weatherEntity?.attributes?.forecast?.[0]?.datetime || weatherEntity?.attributes?.last_updated;
  const lastUpdatedLabel = lastUpdated
    ? new Date(lastUpdated).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

  return {
    entityId: config.entity,
    state: weatherEntity?.state || 'unknown',
    condition: weatherEntity?.state || 'cloudy',
    temperature: readNumberAttribute(weatherEntity, ['temperature']) ?? readNumberEntityState(weatherEntity),
    apparentTemperature: readNumberEntityState(apparentEntity) ?? readNumberAttribute(weatherEntity, ['apparent_temperature', 'feels_like']),
    humidity: readNumberEntityState(humidityEntity) ?? readNumberAttribute(weatherEntity, ['humidity']),
    pressure: readNumberEntityState(pressureEntity) ?? readNumberAttribute(weatherEntity, ['pressure']),
    windSpeed: readNumberEntityState(windSpeedEntity) ?? readNumberAttribute(weatherEntity, ['wind_speed']),
    windBearing: readNumberEntityState(windBearingEntity) ?? readNumberAttribute(weatherEntity, ['wind_bearing']),
    visibility: readNumberEntityState(visibilityEntity) ?? readNumberAttribute(weatherEntity, ['visibility']),
    uvIndex: readNumberEntityState(uvEntity) ?? readNumberAttribute(weatherEntity, ['uv_index']),
    cloudCoverage: readNumberEntityState(cloudEntity) ?? readNumberAttribute(weatherEntity, ['cloud_coverage']),
    precipitation: readNumberEntityState(precipitationEntity) ?? readNumberAttribute(weatherEntity, ['precipitation', 'precipitation_amount']),
    sunrise: sunriseEntity?.state || readStringAttribute(weatherEntity, ['sunrise']),
    sunset: sunsetEntity?.state || readStringAttribute(weatherEntity, ['sunset']),
    friendlyName: config.location || String(weatherEntity?.attributes?.friendly_name || config.title || 'Hogwarts'),
    attribution: readStringAttribute(weatherEntity, ['attribution']),
    forecast: normalizeForecast(weatherEntity?.attributes?.forecast),
    alerts: alertEntities
      .filter((entity) => ['on', 'true', 'problem', 'warning'].includes(String(entity.state).toLowerCase()))
      .map((entity) => String(entity.attributes?.friendly_name || entity.entity_id)),
    lastUpdatedLabel,
  };
}

