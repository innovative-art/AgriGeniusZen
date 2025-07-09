import { useQuery } from "@tanstack/react-query";

export interface SoilData {
  status: string;
  percentage: number;
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  type: string;
}

export const useSoilData = () => {
  return useQuery<SoilData>({
    queryKey: ['/api/soil-data'],
    refetchInterval: 43200000, // Refetch every 12 hours
    initialData: {
      status: "Optimal",
      percentage: 68,
      pH: 6.8,
      nitrogen: 75,
      phosphorus: 62,
      potassium: 80,
      type: "Clay Loam"
    }
  });
};
