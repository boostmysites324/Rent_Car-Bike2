import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, MessageSquare, Phone, Mail, BookOpen, HelpCircle, FileText, Car, CreditCard, Shield } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    title: "Getting Started",
    description: "Learn how to book and use our service",
    icon: BookOpen,
    articles: [
      "How to create an account",
      "How to book a car",
      "Required documents",
      "Payment methods"
    ]
  },
  {
    title: "Booking & Reservations",
    description: "Everything about making and managing bookings",
    icon: Car,
    articles: [
      "How to modify a booking",
      "Cancellation policy",
      "Extending your rental",
      "Vehicle availability"
    ]
  },
  {
    title: "Payment & Billing",
    description: "Payment methods and billing questions",
    icon: CreditCard,
    articles: [
      "Accepted payment methods",
      "Understanding charges",
      "Refund policy",
      "Billing disputes"
    ]
  },
  {
    title: "Safety & Insurance",
    description: "Safety information and insurance coverage",
    icon: Shield,
    articles: [
      "Insurance coverage",
      "Safety guidelines",
      "Roadside assistance",
      "Accident procedures"
    ]
  }
];

const popularArticles = [
  {
    title: "How do I book a car?",
    description: "Step-by-step guide to booking your perfect vehicle",
    category: "Getting Started"
  },
  {
    title: "What documents do I need?",
    description: "Required documents for car rental",
    category: "Getting Started"
  },
  {
    title: "Can I cancel my booking?",
    description: "Understanding our cancellation policy",
    category: "Booking & Reservations"
  },
  {
    title: "What's included in the rental price?",
    description: "Breakdown of rental costs and inclusions",
    category: "Payment & Billing"
  },
  {
    title: "How does insurance work?",
    description: "Understanding your insurance coverage",
    category: "Safety & Insurance"
  },
  {
    title: "What if I have an accident?",
    description: "Steps to take in case of an accident",
    category: "Safety & Insurance"
  }
];

const contactMethods = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageSquare,
    action: "Start Chat",
    available: "Available 24/7"
  },
  {
    title: "Phone Support",
    description: "Speak directly with our support team",
    icon: Phone,
    action: "Call Now",
    available: "Mon-Fri 9AM-6PM"
  },
  {
    title: "Email Support",
    description: "Send us your questions and we'll respond quickly",
    icon: Mail,
    action: "Send Email",
    available: "Response within 24 hours"
  }
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-light to-background py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            How can we <span className="text-blue-primary">help you?</span>
          </h1>
          <p className="text-lg text-grey-text max-w-2xl mx-auto mb-8">
            Find answers to common questions, browse our knowledge base, 
            or get in touch with our support team.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-text w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg"
              />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Help Now
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Choose your preferred way to get support
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-light flex items-center justify-center">
                    <method.icon className="w-8 h-8 text-blue-primary" />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-grey-text mb-4">{method.available}</p>
                  <Button className="w-full" variant="outline">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 px-6 bg-grey-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Articles
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Most frequently asked questions and helpful guides
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-primary mt-1 flex-shrink-0" />
                    <div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription className="mt-2">{article.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <span className="text-xs text-blue-primary font-semibold">{article.category}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Find help organized by topic
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-light flex items-center justify-center">
                    <category.icon className="w-8 h-8 text-blue-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex} className="text-sm text-grey-text hover:text-blue-primary cursor-pointer">
                        {article}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 px-6 bg-blue-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Still Need Help?
          </h2>
          <p className="text-lg text-grey-text mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/cars">Browse Cars</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
