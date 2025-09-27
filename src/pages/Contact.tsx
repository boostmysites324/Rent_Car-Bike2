import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
    description: "Call us for immediate assistance"
  },
  {
    icon: Mail,
    title: "Email",
    details: "hello@carrental.com",
    description: "Send us an email anytime"
  },
  {
    icon: MapPin,
    title: "Address",
    details: "123 Car Rental St, City, State 12345",
    description: "Visit our main office"
  },
  {
    icon: Clock,
    title: "Hours",
    details: "Mon - Fri: 9AM - 6PM",
    description: "Weekend support available"
  }
];

const faqs = [
  {
    question: "How do I book a car?",
    answer: "Simply browse our fleet, select your preferred vehicle, choose your rental period, and complete the booking process online. It takes just a few minutes!"
  },
  {
    question: "What documents do I need?",
    answer: "You'll need a valid driver's license, proof of insurance, and a credit card for payment. We'll guide you through the document upload process."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking up to 24 hours before your rental start time. Cancellation fees may apply depending on the timing."
  },
  {
    question: "Do you offer roadside assistance?",
    answer: "Yes, all our vehicles come with 24/7 roadside assistance. Just call our support number and we'll help you immediately."
  },
  {
    question: "What if I return the car late?",
    answer: "Late returns are subject to additional charges. We recommend contacting us if you anticipate being late to discuss options."
  },
  {
    question: "Are your cars insured?",
    answer: "Yes, all our vehicles are fully insured. However, you may want to check if your personal insurance covers rental vehicles."
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-light to-background py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get in <span className="text-blue-primary">Touch</span>
          </h1>
          <p className="text-lg text-grey-text max-w-2xl mx-auto mb-8">
            Have questions? We're here to help! Reach out to us through any of the channels below, 
            and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contact Information
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Multiple ways to reach us for your convenience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-light flex items-center justify-center">
                    <info.icon className="w-8 h-8 text-blue-primary" />
                  </div>
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-semibold text-foreground mb-2">{info.details}</p>
                  <CardDescription>{info.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 bg-grey-light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Send us a Message
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>
          
          <Card className="border-grey-border">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                  />
                </div>
                
                <div className="text-center">
                  <Button type="submit" size="lg" className="text-lg px-8 py-6">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-grey-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-primary" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-grey-text">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-6 bg-blue-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visit Our Office
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              Come see us in person at our main office location
            </p>
          </div>
          
          <Card className="border-grey-border">
            <CardContent className="p-0">
              <div className="w-full h-96 bg-gradient-to-br from-blue-primary to-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">CarRental Main Office</h3>
                  <p className="text-lg">123 Car Rental Street</p>
                  <p className="text-lg">City, State 12345</p>
                  <p className="text-sm mt-4 opacity-80">Interactive map would be integrated here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
