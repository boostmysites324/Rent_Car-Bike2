import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Car, Shield, Star, Users, Phone, Mail, MapPin } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Browse & Select",
    description: "Choose from our wide selection of premium vehicles",
    icon: Car,
    details: "Explore our extensive fleet of luxury cars from top brands like BMW, Audi, Mercedes, and more. Filter by brand, price, or features to find your perfect match."
  },
  {
    number: "02",
    title: "Choose Your Plan", 
    description: "Pick daily or monthly subscription based on your needs",
    icon: Clock,
    details: "Select from flexible daily or monthly plans. No long-term commitments required. Change your plan anytime to suit your changing needs."
  },
  {
    number: "03",
    title: "Book Instantly",
    description: "Complete your booking in just a few clicks",
    icon: CheckCircle,
    details: "Our streamlined booking process takes just minutes. Upload your documents, make payment, and you're ready to drive."
  },
  {
    number: "04",
    title: "Drive Away",
    description: "Pick up your car and enjoy the freedom of the road",
    icon: Shield,
    details: "Pick up your vehicle from our convenient locations or get it delivered to your doorstep. All cars are fully insured and regularly maintained."
  }
];

const features = [
  {
    title: "Flexible Subscriptions",
    description: "Choose daily or monthly plans that fit your lifestyle and budget perfectly.",
    icon: Clock
  },
  {
    title: "Premium Vehicle Selection",
    description: "Access to luxury cars from BMW, Audi, Mercedes, and more top brands.",
    icon: Car
  },
  {
    title: "Safe & Secure",
    description: "All vehicles are regularly maintained and insured for your peace of mind.",
    icon: Shield
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you whenever you need help.",
    icon: Phone
  }
];

const stats = [
  { number: "1000+", label: "Happy Customers" },
  { number: "50+", label: "Premium Vehicles" },
  { number: "24/7", label: "Customer Support" },
  { number: "4.9/5", label: "Customer Rating" }
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-light to-background py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            How It <span className="text-blue-primary">Works</span>
          </h1>
          <p className="text-lg text-grey-text max-w-2xl mx-auto mb-8">
            Getting your perfect car is simple with our streamlined process. 
            From browsing to driving, we make car rental effortless.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/cars">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Our streamlined process makes getting your perfect car quick and easy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-primary text-white flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-light flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-blue-primary" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-grey-text mb-4">
                    {step.description}
                  </CardDescription>
                  <p className="text-sm text-grey-text text-center">
                    {step.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-grey-light">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Stats Section */}
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
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-blue-primary mb-2">{stat.number}</div>
                <div className="text-grey-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-grey-text mb-8">
            Join thousands of satisfied customers and experience the freedom of flexible car rental.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/cars">Browse Cars</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
