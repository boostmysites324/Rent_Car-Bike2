import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
}

const brands = [
  { name: "BMW", models: ["Series 3", "Series 5", "X3", "X5"] },
  { name: "Audi", models: ["A3", "A4", "A6", "Q3", "Q5"] },
  { name: "Chevrolet", models: ["Cruze", "Malibu", "Equinox", "Tahoe"] },
  { name: "Mercedes", models: ["C-Class", "E-Class", "GLA", "GLC"] },
  { name: "Toyota", models: ["Camry", "Corolla", "RAV4", "Highlander"] },
  { name: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot"] },
];

export const FilterSidebar = ({ selectedBrands, onBrandChange }: FilterSidebarProps) => {
  const [expandedBrands, setExpandedBrands] = useState<string[]>([]);

  const toggleBrand = (brandName: string) => {
    setExpandedBrands(prev => 
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  const handleBrandSelection = (brandName: string) => {
    const newSelectedBrands = selectedBrands.includes(brandName)
      ? selectedBrands.filter(b => b !== brandName)
      : [...selectedBrands, brandName];
    onBrandChange(newSelectedBrands);
  };

  return (
    <div className="w-80 bg-white border-r border-grey-border p-6 h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 text-foreground">Filters</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground mb-4">Brand + Model</h3>
        
        <div className="space-y-2">
          {brands.map((brand) => {
            const isExpanded = expandedBrands.includes(brand.name);
            const isSelected = selectedBrands.includes(brand.name);
            
            return (
              <div key={brand.name} className="border border-grey-border rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-grey-light transition-colors"
                  onClick={() => toggleBrand(brand.name)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleBrandSelection(brand.name)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 text-blue-primary bg-white border-grey-border rounded focus:ring-blue-primary focus:ring-2"
                    />
                    <span className="text-sm font-medium text-foreground">{brand.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-grey-text" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-grey-text" />
                  )}
                </div>
                
                {isExpanded && (
                  <div className="border-t border-grey-border bg-grey-light p-3">
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {brand.models.map((model) => (
                        <label key={model} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-3 h-3 text-blue-primary bg-white border-grey-border rounded focus:ring-blue-primary focus:ring-1"
                          />
                          <span className="text-xs text-grey-text hover:text-foreground transition-colors">
                            {model}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};