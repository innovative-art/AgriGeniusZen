import { Link, useLocation } from "wouter";

const BottomNav = () => {
  const [location] = useLocation();
  
  return (
    <nav className="glass fixed bottom-4 left-1/2 transform -translate-x-1/2 rounded-full px-2 py-2 flex items-center gap-1 shadow-glass z-50">
      <Link href="/">
        <a className={`w-12 h-12 rounded-full flex items-center justify-center ${location === '/' ? 'text-primary-dark bg-primary/10' : 'text-secondary-dark hover:bg-white/50 transition-colors'}`}>
          <i className="ri-home-4-line text-xl"></i>
        </a>
      </Link>
      
      <Link href="/crop-suitability">
        <a className={`w-12 h-12 rounded-full flex items-center justify-center ${location === '/crop-suitability' ? 'text-primary-dark bg-primary/10' : 'text-secondary-dark hover:bg-white/50 transition-colors'}`}>
          <i className="ri-landscape-line text-xl"></i>
        </a>
      </Link>
      
      <Link href="/scan">
        <a className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-md -mt-6">
          <i className="ri-scan-2-line text-2xl"></i>
        </a>
      </Link>
      
      <Link href="/weather">
        <a className={`w-12 h-12 rounded-full flex items-center justify-center ${location === '/weather' ? 'text-primary-dark bg-primary/10' : 'text-secondary-dark hover:bg-white/50 transition-colors'}`}>
          <i className="ri-cloud-line text-xl"></i>
        </a>
      </Link>
      
      <Link href="/profile">
        <a className={`w-12 h-12 rounded-full flex items-center justify-center ${location === '/profile' ? 'text-primary-dark bg-primary/10' : 'text-secondary-dark hover:bg-white/50 transition-colors'}`}>
          <i className="ri-user-line text-xl"></i>
        </a>
      </Link>
    </nav>
  );
};

export default BottomNav;
