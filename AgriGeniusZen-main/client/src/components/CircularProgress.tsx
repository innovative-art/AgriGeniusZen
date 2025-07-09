interface CircularProgressProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

const CircularProgress = ({ 
  value, 
  size = 'md', 
  strokeWidth = 10, 
  color = '#4CAF50',
  label,
  sublabel
}: CircularProgressProps) => {
  const radius = size === 'sm' ? 12 : size === 'md' ? 50 : 70;
  const center = size === 'sm' ? 16 : size === 'md' ? 60 : 80;
  const viewBox = size === 'sm' ? '0 0 32 32' : size === 'md' ? '0 0 120 120' : '0 0 160 160';
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  const containerSize = size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-28 h-28' : 'w-40 h-40';
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-2xl' : 'text-3xl';
  const subtextSize = size === 'sm' ? 'text-xs' : 'text-xs';

  return (
    <div className={`relative ${containerSize}`}>
      <svg className="w-full h-full -rotate-90" viewBox={viewBox}>
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="none" 
          stroke="#E0E0E0" 
          strokeWidth={strokeWidth} 
        />
        <circle 
          cx={center} 
          cy={center} 
          r={radius} 
          fill="none" 
          stroke={color} 
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference} 
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && <span className={`font-medium ${textSize}`}>{label}</span>}
          {sublabel && <span className={`${subtextSize} text-secondary-dark opacity-75`}>{sublabel}</span>}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
