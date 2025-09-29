import vroomLogo from "@/assets/logo_Vroom.png";

interface VroomLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const VroomLogo = ({ size = "md", showText = false, className = "" }: VroomLogoProps) => {
  const sizeClasses = {
    sm: "h-14",
    md: "h-20", 
    lg: "h-28"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* VROOM Logo Image */}
      <img 
        src={vroomLogo} 
        alt="VROOM Logo" 
        className={`object-contain ${sizeClasses[size]}`}
      />
      
      {showText && (
        <span className={`font-bold text-black ${textSizes[size]} tracking-wide drop-shadow-sm`}>
          VROOM
        </span>
      )}
    </div>
  );
};
