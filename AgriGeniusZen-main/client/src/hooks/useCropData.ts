import { useQuery } from "@tanstack/react-query";

export interface CropData {
  id: number;
  name: string;
  emoji: string;
  status: string;
  plantedDate: string;
  expectedHarvest: string;
  growthProgress: number;
  waterNeeds: string;
  nutritionNeeds: string;
}

export const useCropData = (cropId?: number) => {
  return useQuery<CropData>({
    queryKey: cropId ? ['/api/crops', cropId] : ['/api/crops/current'],
    refetchInterval: 86400000, // Refetch every 24 hours
    initialData: {
      id: 1,
      name: "Rice",
      emoji: "🌾",
      status: "Healthy",
      plantedDate: "2023-08-01",
      expectedHarvest: "2023-10-15",
      growthProgress: 65,
      waterNeeds: "High",
      nutritionNeeds: "Nitrogen, Potassium"
    }
  });
};
