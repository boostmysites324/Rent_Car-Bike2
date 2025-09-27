import { Badge } from "@/components/ui/badge";

interface CarCardProps {
  id: string;
  image: string;
  year: number;
  brand: string;
  model: string;
  contract: string;
  mileage: number;
  weeklyFee: number;
  available: boolean;
}

export const CarCard = ({
  image,
  year,
  brand,
  model,
  contract,
  mileage,
  weeklyFee,
  available,
}: CarCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_hsl(217,91%,60%/0.1)] hover:shadow-[0_4px_16px_hsl(217,91%,60%/0.15)] transition-all duration-300 overflow-hidden border border-grey-border">
      {/* Car Image */}
      <div className="aspect-video bg-gradient-to-br from-grey-light to-white flex items-center justify-center p-4">
        <img
          src={image}
          alt={`${year} ${brand} ${model}`}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Car Details */}
      <div className="p-4 space-y-3">
        {/* Year and Model */}
        <div>
          <h3 className="font-semibold text-lg text-foreground">
            {year} {brand}
          </h3>
          <p className="text-grey-text text-sm">{model}</p>
        </div>
        
        {/* Contract and Mileage */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-grey-text">{contract}</span>
          <span className="text-grey-text">{mileage.toLocaleString()} km</span>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {weeklyFee.toFixed(2)}
            </div>
            <div className="text-xs text-grey-text">Weekly fee</div>
          </div>
          
          {/* Availability Badge */}
          <Badge 
            variant={available ? "default" : "secondary"}
            className={available 
              ? "bg-green-100 text-green-800 hover:bg-green-100" 
              : "bg-grey-light text-grey-text"
            }
          >
            {available ? "Available Now" : "Not Available"}
          </Badge>
        </div>
        
        {/* Action Button */}
        <button className="w-full mt-4 bg-blue-primary hover:bg-blue-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
          {available ? "Book Now" : "Join Waitlist"}
        </button>
      </div>
    </div>
  );
};