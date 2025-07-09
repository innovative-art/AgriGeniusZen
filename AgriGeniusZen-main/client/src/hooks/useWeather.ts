import { useQuery } from "@tanstack/react-query";

export interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
  wind: number;
  precipitation: number;
  feelsLike: number;
  uvIndex: number;
}

export const useWeather = () => {
  return useQuery<WeatherData>({
    queryKey: ['/api/weather'],
    refetchInterval: 1800000, // Refetch every 30 minutes
    initialData: {
      condition: "Sunny",
      temperature: 28,
      humidity: 65,
      wind: 8,
      precipitation: 0,
      feelsLike: 29,
      uvIndex: 7
    }
  });
};
