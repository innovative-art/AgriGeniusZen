import { useEffect, useState } from "react";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import FloatingLeaves from "./FloatingLeaves";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'day' | 'evening' | 'night'>('day');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateTimeOfDay = () => {
      const currentHour = new Date().getHours();
      
      if (currentHour >= 5 && currentHour < 12) {
        setTimeOfDay('morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setTimeOfDay('day');
      } else if (currentHour >= 17 && currentHour < 20) {
        setTimeOfDay('evening');
      } else {
        setTimeOfDay('night');
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen transition-time ${
      timeOfDay === 'morning' ? 'bg-gradient-to-br from-[#f8f9fa] to-[#e3f2fd]' :
      timeOfDay === 'day' ? 'bg-gradient-to-br from-[#ffffff] to-[#f1f8e9]' :
      timeOfDay === 'evening' ? 'bg-gradient-to-br from-[#fff8e1] to-[#ffebee]' :
      'bg-gradient-to-br from-[#e8eaf6] to-[#e1f5fe]'
    }`}>
      <FloatingLeaves />
      <TopBar timeOfDay={timeOfDay} />
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>
      
      {isScrolled && (
        <button 
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg z-40 transition-all"
          onClick={() => window.location.href = '/scan'}
        >
          <i className="ri-scan-2-line text-xl"></i>
        </button>
      )}
      
      <BottomNav />
    </div>
  );
};

export default Layout;
