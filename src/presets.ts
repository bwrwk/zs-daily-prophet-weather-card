import type { CardStyleConfig } from './types';

export const PRESET_STYLES = {
  classic_prophet: {
    cardBackground: 'linear-gradient(180deg, rgba(118,91,56,0.96), rgba(68,49,28,0.98))',
    paper: 'linear-gradient(180deg, #f3e8c9 0%, #e8d7b1 54%, #d3ba8b 100%)',
    ink: '#2e2215',
    muted: 'rgba(46, 34, 21, 0.64)',
    accent: '#8f6230',
    accentSoft: 'rgba(143, 98, 48, 0.18)',
    border: '#8f6b3d',
    alert: '#8d2b1f',
    shadow: 'rgba(34, 22, 10, 0.24)',
  },
  weather_bureau: {
    cardBackground: 'linear-gradient(180deg, rgba(44,54,58,0.96), rgba(22,29,31,0.98))',
    paper: 'linear-gradient(180deg, #e8ece8 0%, #d9ddd8 58%, #c9cec8 100%)',
    ink: '#1f2d2f',
    muted: 'rgba(31, 45, 47, 0.68)',
    accent: '#44656a',
    accentSoft: 'rgba(68, 101, 106, 0.18)',
    border: '#5c787c',
    alert: '#8d2b1f',
    shadow: 'rgba(8, 16, 18, 0.24)',
  },
  animated_frontpage: {
    cardBackground: 'linear-gradient(180deg, rgba(56,45,31,0.96), rgba(24,19,13,0.99))',
    paper: 'linear-gradient(180deg, #f1e2bc 0%, #e2cca0 58%, #caa56d 100%)',
    ink: '#2a1f14',
    muted: 'rgba(42, 31, 20, 0.66)',
    accent: '#b37a3d',
    accentSoft: 'rgba(179, 122, 61, 0.2)',
    border: '#b7874b',
    alert: '#a43224',
    shadow: 'rgba(27, 18, 9, 0.3)',
  },
} as const;

export function getDensityValues(density?: CardStyleConfig['density']) {
  if (density === 'compact') {
    return { cardPadding: '18px', heroPadding: '16px', gap: '14px' };
  }

  if (density === 'airy') {
    return { cardPadding: '28px', heroPadding: '24px', gap: '22px' };
  }

  return { cardPadding: '22px', heroPadding: '20px', gap: '18px' };
}

