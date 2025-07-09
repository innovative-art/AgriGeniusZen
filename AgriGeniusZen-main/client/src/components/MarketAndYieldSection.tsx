import { useMarketData } from "@/hooks/useMarketData";
import CircularProgress from "./CircularProgress";

const MarketAndYieldSection = () => {
  const { data: marketData, isLoading } = useMarketData();

  return (
    <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-5 shadow-glass">
        <h3 className="flex items-center gap-2 font-quicksand font-medium text-secondary-dark mb-4">
          <i className="ri-line-chart-line"></i> Yield Forecast
        </h3>
        
        <div className="flex items-center justify-center p-4">
          <CircularProgress 
            value={75} 
            size="lg" 
            label="75%" 
            sublabel="of expected yield" 
          />
        </div>
        
        <div className="bg-white/50 rounded-xl p-4 mt-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-secondary-dark">Estimated Harvest</p>
            <p className="text-sm font-medium text-primary-dark">4.8 tonnes</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-secondary-dark">Current Market Price</p>
            <p className="text-sm font-medium text-secondary-dark">
              {isLoading ? "Loading..." : `₹${marketData?.price}/quintal`}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-secondary-dark">Potential Revenue</p>
            <p className="text-sm font-medium text-accent-dark">
              {isLoading ? "Loading..." : `₹${((marketData?.price || 0) * 48).toLocaleString()}`}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/80 rounded-xl text-secondary-dark text-sm font-medium shadow-sm hover:shadow-md transition-all">
            <i className="ri-tools-line"></i> Optimize Yield
          </button>
        </div>
      </div>
      
      <div className="glass rounded-2xl p-5 shadow-glass">
        <h3 className="flex items-center gap-2 font-quicksand font-medium text-secondary-dark mb-4">
          <i className="ri-store-2-line"></i> Market Insights
        </h3>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <p>Loading market data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white/50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D7CCC8]/30 flex items-center justify-center">
                  <i className="ri-plant-line text-primary-dark"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-dark">{marketData?.cropName} Market Price</p>
                  <p className="text-xs text-secondary-dark opacity-75">
                    Trending 
                    <span className={marketData?.trend > 0 ? 'text-[#66BB6A]' : 'text-[#EF5350]'}>
                      {' '}{marketData?.trend > 0 ? '+' : ''}{marketData?.trend}%
                    </span> 
                    {' '}this week
                  </p>
                </div>
              </div>
              <p className="text-lg font-medium text-primary-dark">₹{marketData?.price}</p>
            </div>
            
            <div className="glass rounded-xl p-4 border border-accent-light/30">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-lightbulb-flash-line text-accent-dark"></i>
                <p className="text-sm font-medium text-accent-dark">AI Market Tip</p>
              </div>
              <p className="text-sm text-secondary-dark">{marketData?.aiTip}</p>
            </div>
            
            <div className="bg-white/50 rounded-xl p-4">
              <p className="text-sm font-medium text-secondary-dark mb-2">Nearby Mandis</p>
              <div className="space-y-3">
                {marketData?.nearbyMandis.map((mandi, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{mandi.name}</span>
                    <span className="font-medium text-primary-dark">₹{mandi.price}/q</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketAndYieldSection;
