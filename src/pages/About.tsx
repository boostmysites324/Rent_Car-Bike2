import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Users, Shield, Star, Award, Target, Heart, Globe } from "lucide-react";
import heroImage from "@/assets/hero-cars.jpg";

const values = [
  {
    title: "Customer First",
    description: "We prioritize our customers' needs and satisfaction above all else.",
    icon: Heart
  },
  {
    title: "Quality Service",
    description: "We maintain the highest standards in vehicle quality and customer service.",
    icon: Award
  },
  {
    title: "Innovation",
    description: "We continuously innovate to provide better rental experiences.",
    icon: Target
  },
  {
    title: "Sustainability",
    description: "We're committed to environmentally responsible car rental practices.",
    icon: Globe
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    description: "Passionate about revolutionizing the car rental industry with flexible solutions."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    description: "Technology expert focused on creating seamless digital experiences."
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    description: "Ensures smooth operations and exceptional customer service delivery."
  },
  {
    name: "David Thompson",
    role: "Head of Fleet Management",
    description: "Manages our premium vehicle fleet and maintenance operations."
  }
];

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to make car rental more flexible and accessible."
  },
  {
    year: "2021",
    title: "First 100 Customers",
    description: "Reached our first milestone of 100 satisfied customers."
  },
  {
    year: "2022",
    title: "Fleet Expansion",
    description: "Expanded our fleet to include luxury vehicles from top brands."
  },
  {
    year: "2023",
    title: "1000+ Customers",
    description: "Celebrated serving over 1000 happy customers across the region."
  },
  {
    year: "2024",
    title: "Digital Platform",
    description: "Launched our comprehensive digital platform for seamless bookings."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-light to-background py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  About <span className="text-blue-primary">CarRental</span>
                </h1>
                <p className="text-lg text-grey-text">
                  We're revolutionizing the car rental industry with flexible, customer-centric solutions. 
                  Our mission is to make premium vehicle access simple, affordable, and convenient for everyone.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/cars">Explore Our Fleet</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Premium cars available for rental" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              We're committed to transforming how people access and experience premium vehicles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-grey-border">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-grey-text leading-relaxed">
                  To provide flexible, affordable, and convenient access to premium vehicles through 
                  innovative subscription-based rental services. We believe everyone deserves the 
                  freedom to drive their dreams without the burden of long-term commitments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-grey-border">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-grey-text leading-relaxed">
                  To become the leading car rental platform that redefines mobility by offering 
                  seamless, technology-driven solutions that adapt to our customers' evolving 
                  transportation needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-grey-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-light flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-blue-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-grey-text">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              The passionate people behind CarRental's success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-light flex items-center justify-center">
                    <Users className="w-10 h-10 text-blue-primary" />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-primary font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-grey-text text-center text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-blue-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Key milestones in our company's growth and development
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-blue-primary text-white flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-grey-text">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              By the Numbers
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Our impact and growth in numbers
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-primary mb-2">1000+</div>
              <div className="text-grey-text">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-primary mb-2">50+</div>
              <div className="text-grey-text">Premium Vehicles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-primary mb-2">4.9/5</div>
              <div className="text-grey-text">Customer Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-primary mb-2">24/7</div>
              <div className="text-grey-text">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-grey-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Join Our Journey?
          </h2>
          <p className="text-lg text-grey-text mb-8">
            Experience the CarRental difference and become part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/cars">Get Started</Link>
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
