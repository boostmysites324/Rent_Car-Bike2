import { useState } from "react";
import { VroomLogo } from "./VroomLogo";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { SubscriptionToggle } from "./SubscriptionToggle";
import { FilterSidebar } from "./FilterSidebar";
import { CarCard } from "./CarCard";
import bmwSedan from "@/assets/bmw-sedan.jpg";
import audiSedan from "@/assets/audi-sedan.jpg";
import chevroletSedan from "@/assets/chevrolet-sedan.jpg";
import mercedesSedan from "@/assets/mercedes-sedan.jpg";

const cars = [
  {
    id: "1",
    image: bmwSedan,
    year: 2020,
    brand: "BMW",
    model: "Series 3",
    contract: "7 weekly",
    mileage: 3000,
    weeklyFee: 300.00,
    available: true,
  },
  {
    id: "2",
    image: audiSedan,
    year: 2019,
    brand: "Audi",
    model: "A4",
    contract: "4 weekly",
    mileage: 5200,
    weeklyFee: 280.00,
    available: true,
  },
  {
    id: "3",
    image: chevroletSedan,
    year: 2021,
    brand: "Chevrolet",
    model: "Malibu",
    contract: "6 weekly",
    mileage: 2800,
    weeklyFee: 250.00,
    available: false,
  },
  {
    id: "4",
    image: mercedesSedan,
    year: 2020,
    brand: "Mercedes",
    model: "C-Class",
    contract: "8 weekly",
    mileage: 4100,
    weeklyFee: 350.00,
    available: true,
  },
  {
    id: "5",
    image: bmwSedan,
    year: 2018,
    brand: "BMW",
    model: "Series 5",
    contract: "5 weekly",
    mileage: 6500,
    weeklyFee: 320.00,
    available: true,
  },
  {
    id: "6",
    image: audiSedan,
    year: 2021,
    brand: "Audi",
    model: "A6",
    contract: "3 weekly",
    mileage: 1900,
    weeklyFee: 380.00,
    available: true,
  },
];

export const CarRentalPlatform = () => {
  const [subscriptionType, setSubscriptionType] = useState<"daily" | "monthly">("daily");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Filter cars based on selected brands
  const filteredCars = selectedBrands.length > 0 
    ? cars.filter(car => selectedBrands.includes(car.brand))
    : cars;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Subscription Toggle Header */}
      <header className="bg-white border-b border-grey-border px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <SubscriptionToggle 
            value={subscriptionType} 
            onChange={setSubscriptionType} 
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar 
          selectedBrands={selectedBrands}
          onBrandChange={setSelectedBrands}
        />

        {/* Car Listings */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Available Cars ({filteredCars.length})
              </h2>
              <div className="text-sm text-grey-text">
                Showing {subscriptionType} rentals
              </div>
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>

            {/* No Results */}
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <div className="text-grey-text mb-2">No cars found</div>
                <div className="text-sm text-grey-text">
                  Try adjusting your filters to see more options
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};