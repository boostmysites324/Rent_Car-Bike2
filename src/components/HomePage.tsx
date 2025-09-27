import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CarCard } from "./CarCard";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Clock, Users, Shield, Star, CheckCircle, Car } from "lucide-react";
import heroImage from "@/assets/hero-cars.jpg";
import bmwSedan from "@/assets/bmw-sedan.jpg";
import audiSedan from "@/assets/audi-sedan.jpg";
import chevroletSedan from "@/assets/chevrolet-sedan.jpg";
import mercedesSedan from "@/assets/mercedes-sedan.jpg";

const featuredCars = [
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
    image: mercedesSedan,
    year: 2020,
    brand: "Mercedes",
    model: "C-Class",
    contract: "8 weekly",
    mileage: 4100,
    weeklyFee: 350.00,
    available: true,
  },
];

const features = [
  {
    icon: Clock,
    title: "Flexible Subscriptions",
    description: "Choose daily or monthly plans that fit your lifestyle and budget perfectly."
  },
  {
    icon: Car,
    title: "Premium Vehicle Selection",
    description: "Access to luxury cars from BMW, Audi, Mercedes, and more top brands."
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All vehicles are regularly maintained and insured for your peace of mind."
  }
];

const steps = [
  {
    number: "01",
    title: "Browse & Select",
    description: "Choose from our wide selection of premium vehicles"
  },
  {
    number: "02",
    title: "Choose Your Plan", 
    description: "Pick daily or monthly subscription based on your needs"
  },
  {
    number: "03",
    title: "Book Instantly",
    description: "Complete your booking in just a few clicks"
  },
  {
    number: "04",
    title: "Drive Away",
    description: "Pick up your car and enjoy the freedom of the road"
  }
];

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-light to-background py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Drive Your Dreams with
                  <span className="text-blue-primary"> Flexible </span>
                  Car Subscriptions
                </h1>
                <p className="text-lg text-grey-text max-w-lg">
                  Experience premium vehicles with our convenient daily and monthly subscription plans. 
                  No long-term commitments, just pure driving pleasure.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/cars">Browse Cars</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-grey-text">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-primary" />
                  <span>1000+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-primary" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Premium cars available for rental" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Service
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              We provide the best car rental experience with flexible plans, premium vehicles, 
              and exceptional service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-light flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-grey-text">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-grey-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Getting your perfect car is simple with our streamlined process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-primary text-white flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-grey-text">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Vehicles
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Discover our most popular premium vehicles available for subscription
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/cars">View All Cars</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 bg-blue-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Join our community of satisfied customers who trust us for their mobility needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-primary mb-2">1000+</div>
              <div className="text-grey-text">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-primary mb-2">50+</div>
              <div className="text-grey-text">Premium Vehicles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-primary mb-2">24/7</div>
              <div className="text-grey-text">Customer Support</div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-blue-primary text-blue-primary" />
                  ))}
                </div>
                <blockquote className="text-lg text-grey-text mb-4">
                  "Amazing service! The booking process was seamless and the car was in perfect condition. 
                  I'll definitely be using this service again for my next trip."
                </blockquote>
                <footer>
                  <div className="font-semibold text-foreground">Sarah Johnson</div>
                  <div className="text-sm text-grey-text">Business Executive</div>
                </footer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};