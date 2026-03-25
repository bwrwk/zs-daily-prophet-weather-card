import { describe, expect, it } from 'vitest';
import { buildFacts, buildHeadline, cardinalFromBearing } from './presenters';
import type { WeatherSnapshot } from './types';

const baseSnapshot: WeatherSnapshot = {
  entityId: 'weather.home',
  state: 'sunny',
  condition: 'sunny',
  temperature: 21,
  apparentTemperature: 23,
  humidity: 48,
  pressure: 1016,
  windSpeed: 14,
  windBearing: 45,
  visibility: 10,
  uvIndex: 3.2,
  cloudCoverage: 18,
  precipitation: 0,
  sunrise: '2026-03-25T06:01:00+01:00',
  sunset: '2026-03-25T18:14:00+01:00',
  friendlyName: 'Hogsmeade',
  attribution: '',
  forecast: [],
  alerts: [],
  lastUpdatedLabel: 'Mar 25, 2026, 6:00 PM',
};

describe('presenters', () => {
  it('builds a sunny Polish headline', () => {
    expect(buildHeadline(baseSnapshot, 'pl')).toContain('Jasne niebo');
  });

  it('builds metric cards in order', () => {
    const facts = buildFacts(baseSnapshot, ['humidity', 'wind', 'pressure'], 'pl');
    expect(facts.map((item) => item.key)).toEqual(['humidity', 'wind', 'pressure']);
    expect(facts[1]?.value).toContain('NE');
  });

  it('maps bearing to cardinal direction', () => {
    expect(cardinalFromBearing(225)).toBe('SW');
  });
});
