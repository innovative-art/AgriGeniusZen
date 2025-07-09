import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function getTimeOfDay(): 'morning' | 'day' | 'evening' | 'night' {
  const hours = new Date().getHours();
  
  if (hours >= 5 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 17) {
    return 'day';
  } else if (hours >= 17 && hours < 20) {
    return 'evening';
  } else {
    return 'night';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export function getWeatherIcon(condition: string): string {
  const conditionMap: Record<string, string> = {
    'Sunny': 'ri-sun-line',
    'Clear': 'ri-moon-clear-line',
    'Partly Cloudy': 'ri-sun-cloudy-line',
    'Cloudy': 'ri-cloudy-line',
    'Overcast': 'ri-cloudy-2-line',
    'Light Rain': 'ri-drizzle-line',
    'Rain': 'ri-heavy-showers-line',
    'Thunderstorm': 'ri-thunderstorms-line'
  };
  
  return conditionMap[condition] || 'ri-question-line';
}

export function calculateGrowthDays(plantedDate: string): number {
  const planted = new Date(plantedDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - planted.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getRemainingDays(harvestDate: string): number {
  const harvest = new Date(harvestDate);
  const now = new Date();
  const diffTime = Math.abs(harvest.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
