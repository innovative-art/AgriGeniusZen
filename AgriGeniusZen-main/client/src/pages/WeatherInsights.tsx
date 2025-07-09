import { useState } from "react";
import { Link } from "wouter";
import { useWeather } from "@/hooks/useWeather";

interface DayForecast {
  day: string;
  date: string;
  icon: string;
  condition: string;
  temp: { min: number; max: number };
  humidity: number;
  precipitation: number;
  wind: number;
}

const WeatherInsights = () => {
  const { data: currentWeather, isLoading } = useWeather();
  const [activeView, setActiveView] = useState<'forecast' | 'alerts'>('forecast');
  
  // Mock forecast data
  const forecast: DayForecast[] = [
    {
      day: "Today",
      date: "Sep 15",
      icon: "ri-sun-line",
      condition: "Sunny",
      temp: { min: 24, max: 32 },
      humidity: 65,
      precipitation: 0,
      wind: 8
    },
    {
      day: "Tomorrow",
      date: "Sep 16",
      icon: "ri-sun-cloudy-line",
      condition: "Partly Cloudy",
      temp: { min: 25, max: 31 },
      humidity: 70,
      precipitation: 10,
      wind: 10
    },
    {
      day: "Friday",
      date: "Sep 17",
      icon: "ri-cloudy-line",
      condition: "Cloudy",
      temp: { min: 23, max: 29 },
      humidity: 75,
      precipitation: 30,
      wind: 12
    },
    {
      day: "Saturday",
      date: "Sep 18",
      icon: "ri-drizzle-line",
      condition: "Light Rain",
      temp: { min: 22, max: 27 },
      humidity: 85,
      precipitation: 60,
      wind: 15
    },
    {
      day: "Sunday",
      date: "Sep 19",
      icon: "ri-sun-line",
      condition: "Sunny",
      temp: { min: 23, max: 30 },
      humidity: 70,
      precipitation: 5,
      wind: 10
    },
    {
      day: "Monday",
      date: "Sep 20",
      icon: "ri-sun-line",
      condition: "Sunny",
      temp: { min: 24, max: 32 },
      humidity: 65,
      precipitation: 0,
      wind: 9
    },
    {
      day: "Tuesday",
      date: "Sep 21",
      icon: "ri-sun-cloudy-line",
      condition: "Partly Cloudy",
      temp: { min: 25, max: 31 },
      humidity: 68,
      precipitation: 5,
      wind: 10
    }
  ];
  
  // Mock alerts
  const alerts = [
    {
      id: 1,
      type: "Rain Alert",
      icon: "ri-drizzle-line",
      message: "Heavy rainfall expected this Saturday. Consider covering your rice crop to prevent damage.",
      severity: "medium",
      time: "In 3 days"
    },
    {
      id: 2,
      type: "Wind Advisory",
      icon: "ri-windy-line",
      message: "Strong winds (15-20 km/h) expected on Saturday. Secure any loose farming equipment.",
      severity: "low",
      time: "In 3 days"
    }
  ];
  
  // Weather condition icons mapping
  const getWeatherIcon = (condition: string) => {
    const conditionMap: Record<string, string> = {
      'Sunny': 'ri-sun-line text-yellow-500',
      'Clear': 'ri-moon-clear-line text-blue-400',
      'Partly Cloudy': 'ri-sun-cloudy-line text-gray-500',
      'Cloudy': 'ri-cloudy-line text-gray-500',
      'Overcast': 'ri-cloudy-2-line text-gray-600',
      'Light Rain': 'ri-drizzle-line text-blue-400',
      'Rain': 'ri-heavy-showers-line text-blue-500',
      'Thunderstorm': 'ri-thunderstorms-line text-purple-500'
    };
    
    return conditionMap[condition] || 'ri-question-line';
  };
  
  // Weather action recommendations
  const getWeatherActionRecs = () => {
    if (!currentWeather) return [];
    
    const { condition, temperature } = currentWeather;
    
    if (condition.includes('Rain') || condition.includes('Thunderstorm')) {
      return [
        "Move harvested crops to storage",
        "Check drainage systems in fields",
        "Postpone fertilizer application"
      ];
    } else if (temperature > 35) {
      return [
        "Increase irrigation frequency",
        "Apply mulch to retain moisture",
        "Avoid spraying during peak sun hours"
      ];
    } else if (condition.includes('Sunny') || condition.includes('Clear')) {
      return [
        "Good day for harvesting",
        "Apply fertilizers if scheduled",
        "Check irrigation systems"
      ];
    }
    
    return [
      "Routine field maintenance",
      "Check crop health",
      "Monitor soil moisture"
    ];
  };

  return (
    <div className="py-4">
      <div className="glass rounded-2xl p-5 shadow-glass mb-6">
        <h2 className="text-xl font-quicksand font-medium text-secondary-dark mb-1 flex items-center gap-2">
          <i className="ri-cloud-line"></i> Weather Insights
        </h2>
        <p className="text-sm text-secondary-dark mb-5">
          Personalized weather forecasts and smart alerts for your farm
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading weather data...</p>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-5 mb-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-20">
                <i className={`${getWeatherIcon(currentWeather?.condition || 'Sunny')} text-9xl`}></i>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-end gap-3 mb-5">
                  <h3 className="text-4xl font-medium text-secondary-dark">
                    {currentWeather?.temperature}°C
                  </h3>
                  <div>
                    <p className="text-lg text-secondary-dark">{currentWeather?.condition}</p>
                    <p className="text-xs text-secondary-dark opacity-75">
                      Feels like {(currentWeather?.temperature || 0) + 1}°C
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="bg-white/70 rounded-lg p-2 text-center">
                    <p className="text-xs text-secondary-dark opacity-75">Humidity</p>
                    <p className="text-sm font-medium text-secondary-dark">
                      {currentWeather?.humidity || 65}%
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2 text-center">
                    <p className="text-xs text-secondary-dark opacity-75">Wind</p>
                    <p className="text-sm font-medium text-secondary-dark">
                      {currentWeather?.wind || 8} km/h
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2 text-center">
                    <p className="text-xs text-secondary-dark opacity-75">Rainfall</p>
                    <p className="text-sm font-medium text-secondary-dark">
                      {currentWeather?.precipitation || 0} mm
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-secondary-dark opacity-75">
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="bg-white/50 rounded-xl p-4 mb-2">
              <h4 className="text-sm font-medium text-secondary-dark mb-2 flex items-center gap-1">
                <i className="ri-plant-line text-primary"></i> Farm Action Recommendations
              </h4>
              <ul className="text-sm text-secondary-dark">
                {getWeatherActionRecs().map((rec, index) => (
                  <li key={index} className="flex items-center gap-2 mb-1">
                    <i className="ri-check-line text-primary"></i> {rec}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      
      <div className="flex border-b mb-4">
        <button
          className={`flex-1 py-2 text-sm font-medium ${activeView === 'forecast' ? 'text-primary-dark border-b-2 border-primary' : 'text-secondary-dark'}`}
          onClick={() => setActiveView('forecast')}
        >
          7-Day Forecast
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${activeView === 'alerts' ? 'text-primary-dark border-b-2 border-primary' : 'text-secondary-dark'}`}
          onClick={() => setActiveView('alerts')}
        >
          Weather Alerts
        </button>
      </div>
      
      {activeView === 'forecast' && (
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <div key={index} className="glass rounded-xl p-4 shadow-soft">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <i className={`${getWeatherIcon(day.condition)} text-2xl`}></i>
                  <div>
                    <h4 className="font-medium text-secondary-dark">{day.day}</h4>
                    <p className="text-xs text-secondary-dark opacity-75">{day.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-secondary-dark">{day.temp.max}° / {day.temp.min}°</p>
                  <p className="text-xs text-secondary-dark opacity-75">{day.condition}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/40 rounded-lg p-2">
                  <p className="text-xs text-secondary-dark opacity-75">Humidity</p>
                  <p className="text-xs font-medium text-secondary-dark">{day.humidity}%</p>
                </div>
                <div className="bg-white/40 rounded-lg p-2">
                  <p className="text-xs text-secondary-dark opacity-75">Rain</p>
                  <p className="text-xs font-medium text-secondary-dark">{day.precipitation}%</p>
                </div>
                <div className="bg-white/40 rounded-lg p-2">
                  <p className="text-xs text-secondary-dark opacity-75">Wind</p>
                  <p className="text-xs font-medium text-secondary-dark">{day.wind} km/h</p>
                </div>
              </div>
              
              {index === 3 && (
                <div className="mt-3 p-2 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-xs text-accent flex items-center gap-1">
                    <i className="ri-alert-line"></i> Rain expected. Consider adjusting your irrigation schedule.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {activeView === 'alerts' && (
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`glass rounded-xl p-4 shadow-soft border-l-4 ${
                  alert.severity === 'high' ? 'border-red-500' : 
                  alert.severity === 'medium' ? 'border-orange-400' : 
                  'border-yellow-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-500' : 
                      alert.severity === 'medium' ? 'bg-orange-100 text-orange-500' : 
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      <i className={alert.icon}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary-dark">{alert.type}</h4>
                      <p className="text-xs text-secondary-dark opacity-75">{alert.time}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-600' : 
                    alert.severity === 'medium' ? 'bg-orange-100 text-orange-600' : 
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </div>
                </div>
                
                <p className="text-sm text-secondary-dark mb-3">{alert.message}</p>
                
                <div className="flex gap-2">
                  <button className="flex-1 text-center px-3 py-2 bg-white/80 rounded-lg text-secondary-dark text-xs font-medium border border-gray-200">
                    Dismiss
                  </button>
                  <button className="flex-1 text-center px-3 py-2 bg-primary rounded-lg text-white text-xs font-medium">
                    Take Action
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="glass rounded-xl p-6 text-center shadow-soft">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                <i className="ri-shield-check-line text-2xl text-green-600"></i>
              </div>
              <h4 className="font-medium text-secondary-dark mb-1">No Weather Alerts</h4>
              <p className="text-sm text-secondary-dark opacity-75">
                Weather conditions look favorable for your crops. We'll notify you if any alerts arise.
              </p>
            </div>
          )}
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

export default WeatherInsights;
