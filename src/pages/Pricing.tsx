import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Car, Clock, Shield, Star } from "lucide-react";

const pricingPlans = [
  {
    name: "Daily Rental",
    price: "From $49",
    period: "per day",
    description: "Perfect for short trips and weekend getaways",
    features: [
      "24-hour rental period",
      "Unlimited mileage",
      "Full insurance coverage",
      "24/7 roadside assistance",
      "Free cancellation up to 2 hours before",
      "Premium vehicle selection"
    ],
    popular: false
  },
  {
    name: "Weekly Subscription",
    price: "From $299",
    period: "per week",
    description: "Ideal for extended trips and business travel",
    features: [
      "7-day rental period",
      "Unlimited mileage",
      "Full insurance coverage",
      "24/7 roadside assistance",
      "Free cancellation up to 24 hours before",
      "Premium vehicle selection",
      "Priority customer support",
      "Vehicle exchange option"
    ],
    popular: true
  },
  {
    name: "Monthly Subscription",
    price: "From $999",
    period: "per month",
    description: "Best value for long-term vehicle needs",
    features: [
      "30-day rental period",
      "Unlimited mileage",
      "Full insurance coverage",
      "24/7 roadside assistance",
      "Free cancellation up to 48 hours before",
      "Premium vehicle selection",
      "Priority customer support",
      "Vehicle exchange option",
      "Maintenance included",
      "Concierge service"
    ],
    popular: false
  }
];

const features = [
  {
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges",
    icon: Check
  },
  {
    title: "Flexible Plans",
    description: "Choose from daily, weekly, or monthly options",
    icon: Clock
  },
  {
    title: "Premium Fleet",
    description: "Access to luxury vehicles from top brands",
    icon: Car
  },
  {
    title: "Full Coverage",
    description: "Comprehensive insurance and roadside assistance",
    icon: Shield
  }
];

const faqs = [
  {
    question: "What's included in the rental price?",
    answer: "All our rentals include unlimited mileage, full insurance coverage, 24/7 roadside assistance, and access to our premium vehicle fleet. No hidden fees or surprise charges."
  },
  {
    question: "Can I change my rental period?",
    answer: "Yes, you can extend or shorten your rental period. Contact our support team to make changes to your booking."
  },
  {
    question: "What happens if I return the car late?",
    answer: "Late returns are subject to additional charges. We recommend contacting us if you anticipate being late to discuss options."
  },
  {
    question: "Do you offer discounts for long-term rentals?",
    answer: "Yes, we offer special pricing for monthly subscriptions and extended rentals. Contact us for custom pricing."
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-light to-background py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Simple, <span className="text-blue-primary">Transparent</span> Pricing
          </h1>
          <p className="text-lg text-grey-text max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. No hidden fees, no surprises. 
            Just great value and premium service.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Flexible pricing options to suit every need and budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`border-grey-border hover:shadow-lg transition-shadow duration-300 relative ${
                plan.popular ? 'ring-2 ring-blue-primary' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-blue-primary">{plan.price}</span>
                    <span className="text-grey-text ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-grey-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-primary hover:bg-blue-600' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link to="/cars">Get Started</Link>
                  </Button>
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
              What's Included
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Every plan comes with these essential features
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

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pricing FAQ
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Common questions about our pricing and plans
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-grey-border">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-grey-text">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-grey-text mb-8">
            Choose your plan and start your journey with premium car rental today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/cars">Browse Cars</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
