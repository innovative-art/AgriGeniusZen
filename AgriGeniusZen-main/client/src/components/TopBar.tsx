import { Link } from "wouter";

interface TopBarProps {
  timeOfDay: 'morning' | 'day' | 'evening' | 'night';
}

const TopBar = ({ timeOfDay }: TopBarProps) => {
  const greeting = 
    timeOfDay === 'morning' ? 'Good Morning' :
    timeOfDay === 'day' ? 'Good Afternoon' :
    timeOfDay === 'evening' ? 'Good Evening' :
    'Good Night';

  return (
    <header className="glass sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center">
              <i className="ri-plant-line text-white text-xl"></i>
            </div>
            <div>
              <h1 className="font-quicksand font-semibold text-lg text-primary-dark">
                AgriGenius<span className="handwritten text-accent-dark">Zen</span>
              </h1>
              <p className="text-xs text-secondary-dark opacity-75 -mt-1">Smart Farming Assistant</p>
            </div>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-secondary-dark">{greeting}</p>
            <p className="text-xs text-secondary opacity-75">Farmer Raj</p>
          </div>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full bg-natural-stone flex items-center justify-center cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <i className="ri-user-line text-green-700"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
