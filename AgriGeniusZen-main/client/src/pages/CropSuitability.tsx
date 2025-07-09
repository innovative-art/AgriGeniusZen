import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@/components/CircularProgress";

interface SuitabilityCrop {
  name: string;
  icon: string;
  score: number;
  soil: string;
  water: string;
  season: string;
}

const CropSuitability = () => {
  const [selectedLocation, setSelectedLocation] = useState("Current Farm");
  
  const { data, isLoading } = useQuery({
    queryKey: ['/api/crop-suitability'],
    enabled: true
  });
  
  // Since we don't have a real API for the demo, we'll use mock data
  const crops: SuitabilityCrop[] = [
    {
      name: "Rice",
      icon: "🌾",
      score: 92,
      soil: "Clay loam",
      water: "High",
      season: "Kharif (June-Oct)"
    },
    {
      name: "Wheat",
      icon: "🌿",
      score: 78,
      soil: "Clay loam",
      water: "Medium",
      season: "Rabi (Nov-Apr)"
    },
    {
      name: "Corn",
      icon: "🌽",
      score: 85,
      soil: "Loam",
      water: "Medium",
      season: "Kharif (June-Oct)"
    },
    {
      name: "Soybeans",
      icon: "🫘",
      score: 70,
      soil: "Loam",
      water: "Medium-Low",
      season: "Kharif (June-Oct)"
    }
  ];

  return (
    <div className="py-4">
      <div className="glass rounded-2xl p-5 shadow-glass mb-6">
        <h2 className="text-xl font-quicksand font-medium text-secondary-dark mb-1 flex items-center gap-2">
          <i className="ri-plant-line"></i> Crop Suitability
        </h2>
        <p className="text-sm text-secondary-dark mb-6">
          AI-powered analysis to help you choose the most suitable crops for your land
        </p>
        
        <div className="bg-white/50 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-secondary-dark">Location</p>
            <select 
              className="text-sm bg-white/80 border border-gray-200 rounded-lg px-3 py-2"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option>Current Farm</option>
              <option>North Field</option>
              <option>South Field</option>
              <option>West Field</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-white/80 rounded-lg p-3">
              <p className="text-xs text-secondary-dark opacity-75">Soil Type</p>
              <p className="text-sm font-medium text-secondary-dark">Clay Loam</p>
            </div>
            
            <div className="bg-white/80 rounded-lg p-3">
              <p className="text-xs text-secondary-dark opacity-75">pH Level</p>
              <p className="text-sm font-medium text-secondary-dark">6.8 (Neutral)</p>
            </div>
            
            <div className="bg-white/80 rounded-lg p-3">
              <p className="text-xs text-secondary-dark opacity-75">Water Availability</p>
              <p className="text-sm font-medium text-secondary-dark">High (Irrigation)</p>
            </div>
            
            <div className="bg-white/80 rounded-lg p-3">
              <p className="text-xs text-secondary-dark opacity-75">Climate Zone</p>
              <p className="text-sm font-medium text-secondary-dark">Tropical</p>
            </div>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 rounded-lg text-primary-dark text-sm font-medium hover:bg-primary/20 transition-all mb-2">
          <i className="ri-camera-line"></i> Scan Soil For More Accuracy
        </button>
      </div>
      
      <h3 className="font-quicksand font-medium text-secondary-dark mb-3 flex items-center gap-2">
        <i className="ri-leaf-line"></i> Recommended Crops
      </h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Analyzing your land...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {crops.map((crop, index) => (
            <div key={index} className="glass rounded-xl p-4 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    {crop.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-dark">{crop.name}</h4>
                    <p className="text-xs text-secondary-dark opacity-75">
                      Best for: {crop.season}
                    </p>
                  </div>
                </div>
                <CircularProgress 
                  value={crop.score} 
                  size="sm" 
                  label={`${crop.score}%`}
                  color={
                    crop.score >= 90 ? '#4CAF50' : 
                    crop.score >= 80 ? '#8BC34A' : 
                    crop.score >= 70 ? '#FFC107' : 
                    '#FF9800'
                  }
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/40 rounded-lg p-2">
                  <p className="text-xs text-secondary-dark opacity-75">Soil</p>
                  <p className="text-xs font-medium text-secondary-dark">{crop.soil}</p>
                </div>
                <div className="bg-white/40 rounded-lg p-2">
                  <p className="text-xs text-secondary-dark opacity-75">Water</p>
                  <p className="text-xs font-medium text-secondary-dark">{crop.water}</p>
                </div>
                <div className="bg-white/40 rounded-lg p-2">
                  <p className="text-xs text-secondary-dark opacity-75">ROI</p>
                  <p className="text-xs font-medium text-secondary-dark">
                    {crop.score >= 85 ? "High" : crop.score >= 75 ? "Medium" : "Low"}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 flex gap-2">
                <button className="flex-1 text-center px-3 py-2 bg-primary/10 rounded-lg text-primary-dark text-xs font-medium hover:bg-primary/20 transition-all">
                  Detailed Analysis
                </button>
                <button className="flex-1 text-center px-3 py-2 bg-primary rounded-lg text-white text-xs font-medium hover:bg-primary-dark transition-all">
                  Select This Crop
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Link href="/">
        <div className="mt-6 text-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/80 rounded-full text-secondary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all mx-auto">
            <i className="ri-arrow-left-line"></i> Back to Home
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CropSuitability;
