import { Link } from "wouter";
import { useWeather } from "@/hooks/useWeather";
import { useSoilData } from "@/hooks/useSoilData";
import { useCropData } from "@/hooks/useCropData";

const WelcomeSection = () => {
  const { data: weather, isLoading: isWeatherLoading } = useWeather();
  const { data: soilData, isLoading: isSoilLoading } = useSoilData();
  const { data: cropData, isLoading: isCropLoading } = useCropData();

  return (
    <section className="mb-8">
      <div className="glass rounded-3xl p-6 relative overflow-hidden shadow-glass">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M30,4C16.8,4,6,14.8,6,28c0,13.2,10.8,24,24,24s24-10.8,24-24C54,14.8,43.2,4,30,4z M30,46c-9.9,0-18-8.1-18-18 s8.1-18,18-18s18,8.1,18,18S39.9,46,30,46z" fill="#4CAF50"/>
            <path d="M70,28c0-4.4-3.6-8-8-8h-8c-4.4,0-8,3.6-8,8s3.6,8,8,8h8C66.4,36,70,32.4,70,28z M62,30h-8c-1.1,0-2-0.9-2-2 s0.9-2,2-2h8c1.1,0,2,0.9,2,2S63.1,30,62,30z" fill="#4CAF50"/>
            <path d="M72,36c-9.9,0-18,8.1-18,18c0,9.9,8.1,18,18,18s18-8.1,18-18C90,44.1,81.9,36,72,36z M72,66c-6.6,0-12-5.4-12-12 s5.4-12,12-12s12,5.4,12,12S78.6,66,72,66z" fill="#4CAF50"/>
            <path d="M89.8,77.6L77.6,65.4c-1.6-1.6-4.1-1.6-5.7,0L59.8,77.6c-1.6,1.6-1.6,4.1,0,5.7l12.2,12.2c1.6,1.6,4.1,1.6,5.7,0 l12.2-12.2C91.4,81.7,91.4,79.1,89.8,77.6z" fill="#4CAF50"/>
          </svg>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-lg font-medium font-quicksand text-primary-dark mb-1">
            Welcome to your <span className="handwritten text-xl">Zen</span> farm
          </h2>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-white/50 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-[#A5D6A7]/30 flex items-center justify-center">
                <i className="ri-sun-line text-primary-dark"></i>
              </div>
              <div>
                <p className="text-xs text-secondary-dark opacity-75">Weather</p>
                {isWeatherLoading ? (
                  <p className="text-sm font-medium text-secondary-dark">Loading...</p>
                ) : (
                  <p className="text-sm font-medium text-secondary-dark">
                    {weather?.condition}, {weather?.temperature}°C
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/50 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-[#D7CCC8]/30 flex items-center justify-center">
                <i className="ri-water-percent-line text-secondary-dark"></i>
              </div>
              <div>
                <p className="text-xs text-secondary-dark opacity-75">Soil Moisture</p>
                {isSoilLoading ? (
                  <p className="text-sm font-medium text-secondary-dark">Loading...</p>
                ) : (
                  <p className="text-sm font-medium text-secondary-dark">
                    {soilData?.status} ({soilData?.percentage}%)
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/50 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-[#B3E5FC]/30 flex items-center justify-center">
                <i className="ri-plant-line text-accent-dark"></i>
              </div>
              <div>
                <p className="text-xs text-secondary-dark opacity-75">Current Crop</p>
                {isCropLoading ? (
                  <p className="text-sm font-medium text-secondary-dark">Loading...</p>
                ) : (
                  <p className="text-sm font-medium text-secondary-dark">
                    {cropData?.name} {cropData?.emoji} ({cropData?.status})
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/scan">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary rounded-full text-white text-sm font-medium shadow-sm hover:shadow-md transition-all">
                <i className="ri-scan-2-line"></i> Scan Crops
              </button>
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-primary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all">
              <i className="ri-mic-line"></i> Voice Assistant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
