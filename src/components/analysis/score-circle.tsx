import { cn } from "@/lib/utils";

interface ScoreCircleProps {
  score: number;
  label: string;
  size?: "small" | "large";
  color?: "yellow" | "blue" | "green" | "gradient";
  className?: string;
  totalScore?: boolean;
}

export function ScoreCircle({ score, label, size = "small", color = "green", className, totalScore = false }: ScoreCircleProps) {
  const circumference = 2 * Math.PI * (size === 'small' ? 35 : 60);
  const offset = circumference - (score / 100) * circumference;

  const colorClasses = {
    yellow: "stroke-yellow-400 text-yellow-400",
    blue: "stroke-blue-400 text-blue-400",
    green: "stroke-green-500 text-green-500",
    gradient: ""
  };
  
  const scoreColor = score >= 70 ? 'success' : score >= 40 ? 'warning' : 'danger';
  const scoreTextColor = `text-${scoreColor}`;
  const scoreStrokeColor = `stroke-${scoreColor}`;
  
  const gradientId = "totalScoreGradient";
  const gradientColors = {
    success: ['#10B981', '#6EE7B7'],
    warning: ['#F59E0B', '#FBBF24'],
    danger: ['#EF4444', '#F87171'],
  };

  const [startColor, endColor] = gradientColors[scoreColor];

  const circleSize = size === 'small' ? 80 : 130;
  const radius = size === 'small' ? 35 : 60;
  const strokeWidth = size === 'small' ? 8 : 10;
  
  return (
    <div className={cn("flex flex-col items-center gap-2 text-center", className)}>
      <div className="relative" style={{ width: circleSize, height: circleSize }}>
        <svg className="w-full h-full transform -rotate-90">
          <defs>
            {totalScore && (
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={startColor} />
                <stop offset="100%" stopColor={endColor} />
              </linearGradient>
            )}
          </defs>
          <circle
            className="text-card"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={circleSize/2}
            cy={circleSize/2}
          />
          <circle
            className={cn(totalScore ? scoreStrokeColor : colorClasses[color!])}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={circleSize/2}
            cy={circleSize/2}
            style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
            stroke={totalScore ? `url(#${gradientId})` : undefined}
          />
        </svg>
        <div className={cn("absolute inset-0 flex flex-col items-center justify-center", totalScore ? scoreTextColor : colorClasses[color!])}>
          <span className={cn("font-bold", size === 'small' ? 'text-2xl' : 'text-4xl')}>
            {score}
          </span>
          {totalScore && <span className="text-xs font-medium">/ 100</span>}
        </div>
      </div>
      <p className={cn("font-semibold", size === 'small' ? 'text-sm' : 'text-base')}>{label}</p>
    </div>
  );
}
