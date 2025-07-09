import { Link } from "wouter";

interface Action {
  id: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  path: string;
}

const actions: Action[] = [
  {
    id: 'crop-suitability',
    icon: 'ri-plant-line',
    title: 'Crop Suitability',
    description: 'AI analysis for optimal crops',
    bgColor: 'bg-[#A5D6A7]/50',
    iconColor: 'text-primary-dark',
    path: '/crop-suitability'
  },
  {
    id: 'disease-detection',
    icon: 'ri-bug-line',
    title: 'Disease Detection',
    description: 'Scan & identify crop issues',
    bgColor: 'bg-[#FFB74D]/20',
    iconColor: 'text-[#F57C00]',
    path: '/disease-detection'
  },
  {
    id: 'weather-insights',
    icon: 'ri-cloud-line',
    title: 'Weather Insights',
    description: '7-day forecast & alerts',
    bgColor: 'bg-[#B3E5FC]/50',
    iconColor: 'text-accent-dark',
    path: '/weather'
  },
  {
    id: 'govt-schemes',
    icon: 'ri-government-line',
    title: 'Govt. Schemes',
    description: 'Subsidies & grants finder',
    bgColor: 'bg-[#D7CCC8]/50',
    iconColor: 'text-secondary-dark',
    path: '/government-schemes'
  }
];

const ActionCards = () => {
  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-2 font-quicksand font-medium text-secondary-dark mb-4">
        <i className="ri-apps-line"></i> Farm Smart Actions
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {actions.map(action => (
          <Link key={action.id} href={action.path}>
            <div className="glass rounded-2xl p-5 transition-all hover:shadow-md flex flex-col items-center text-center cursor-pointer">
              <div className={`w-14 h-14 rounded-full ${action.bgColor} flex items-center justify-center mb-3`}>
                <i className={`${action.icon} text-2xl ${action.iconColor}`}></i>
              </div>
              <h3 className="font-quicksand font-medium text-secondary-dark mb-1">{action.title}</h3>
              <p className="text-xs text-secondary-dark opacity-75">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ActionCards;
