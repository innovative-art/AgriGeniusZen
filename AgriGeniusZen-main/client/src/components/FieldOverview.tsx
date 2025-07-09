import { useState } from "react";
import { Link } from "wouter";
import { useCropData } from "@/hooks/useCropData";
import CircularProgress from "./CircularProgress";

const FieldOverview = () => {
  const { data: cropData, isLoading } = useCropData();
  const [lastScanned, setLastScanned] = useState("Today at 8:30 AM");

  const handleScan = () => {
    setLastScanned(`Today at ${new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })}`);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 font-quicksand font-medium text-secondary-dark">
          <i className="ri-landscape-line"></i> Your Fields
        </h2>
        <button className="text-accent-dark text-sm flex items-center gap-1">
          <i className="ri-add-line"></i> Add Field
        </button>
      </div>
      
      <div className="glass rounded-2xl p-5 shadow-glass">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading field data...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <div>
                <h3 className="font-quicksand font-medium text-secondary-dark">North Field - {cropData?.name} {cropData?.emoji}</h3>
                <p className="text-xs text-secondary-dark opacity-75">Planted: 45 days ago • 2.5 acres</p>
              </div>
              <div className="text-right">
                <div className="font-medium text-[#66BB6A] flex items-center gap-1">
                  <i className="ri-heart-pulse-line"></i> {cropData?.status}
                </div>
                <p className="text-xs text-secondary-dark opacity-75">Expected harvest: 25 days</p>
              </div>
            </div>
            
            <div className="relative h-48 rounded-xl overflow-hidden mb-5 bg-[#f1f8e9]">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 C150,150 350,0 500,100 C650,200 750,100 800,200 L800,300 L0,300 Z" fill="#8BC34A" opacity="0.2" />
                <path d="M0,150 C150,200 350,50 500,150 C650,250 750,150 800,250 L800,300 L0,300 Z" fill="#4CAF50" opacity="0.2" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                  <path d="M4.5 12.5C8.5 13.5 12 12 12 6.5" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.5 3C13.5 7.5 18 12 21.5 13" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 19C10.5 17 12 14.5 12 12" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.5 15.5C15.5 17.5 14.5 20 12 21" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="absolute bottom-3 left-3 glass rounded-full px-3 py-1 text-xs font-medium text-secondary-dark">
                Last Scanned: {lastScanned}
              </div>
              
              <button 
                className="absolute top-3 right-3 glass rounded-full w-8 h-8 flex items-center justify-center"
                onClick={handleScan}
              >
                <i className="ri-scan-2-line text-primary-dark"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/50 rounded-xl p-3">
                <p className="text-xs text-secondary-dark opacity-75">Water Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#B3E5FC]/50 flex items-center justify-center">
                    <i className="ri-drop-line text-accent-dark"></i>
                  </div>
                  <p className="text-sm font-medium text-secondary-dark">Optimal</p>
                </div>
              </div>
              
              <div className="bg-white/50 rounded-xl p-3">
                <p className="text-xs text-secondary-dark opacity-75">Nutrition</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#A5D6A7]/50 flex items-center justify-center">
                    <i className="ri-seedling-line text-primary-dark"></i>
                  </div>
                  <p className="text-sm font-medium text-secondary-dark">Good (N+K)</p>
                </div>
              </div>
              
              <div className="bg-white/50 rounded-xl p-3">
                <p className="text-xs text-secondary-dark opacity-75">Pests</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#66BB6A]/20 flex items-center justify-center">
                    <i className="ri-bug-line text-[#66BB6A]"></i>
                  </div>
                  <p className="text-sm font-medium text-secondary-dark">No threats</p>
                </div>
              </div>
              
              <div className="bg-white/50 rounded-xl p-3">
                <p className="text-xs text-secondary-dark opacity-75">Growth</p>
                <div className="flex items-center gap-2">
                  <CircularProgress 
                    value={65} 
                    size="sm" 
                    strokeWidth={3}
                  />
                  <p className="text-sm font-medium text-secondary-dark">On track</p>
                </div>
              </div>
            </div>
            
            <div className="mt-5 border-t border-gray-100 pt-4 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-full text-white text-sm font-medium shadow-sm hover:shadow-md transition-all">
                <i className="ri-file-list-3-line"></i> Detailed Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-secondary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all">
                <i className="ri-history-line"></i> Field History
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FieldOverview;
