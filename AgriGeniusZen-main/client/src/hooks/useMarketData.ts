import { useQuery } from "@tanstack/react-query";

export interface MarketData {
  cropName: string;
  price: number;
  trend: number;
  lastUpdated: string;
  aiTip: string;
  nearbyMandis: {
    name: string;
    price: number;
    distance: number;
  }[];
  forecastTrend: {
    days: string[];
    prices: number[];
  };
}

export const useMarketData = (cropId?: number) => {
  return useQuery<MarketData>({
    queryKey: cropId ? ['/api/market', cropId] : ['/api/market/current'],
    refetchInterval: 3600000, // Refetch every hour
    initialData: {
      cropName: "Rice",
      price: 2050,
      trend: 2.5,
      lastUpdated: new Date().toISOString(),
      aiTip: "Consider holding your harvest for 15 more days. Prices are projected to rise by 8% during festival season.",
      nearbyMandis: [
        { name: "Rajpur Mandi", price: 2050, distance: 5 },
        { name: "Bhopal Central", price: 2020, distance: 12 },
        { name: "Indore Agri Hub", price: 2120, distance: 25 }
      ],
      forecastTrend: {
        days: ["Today", "1 Week", "2 Weeks", "1 Month"],
        prices: [2050, 2100, 2210, 2150]
      }
    }
  });
};
