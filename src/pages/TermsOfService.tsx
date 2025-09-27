import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Calendar, Shield, AlertTriangle } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using CarRental's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
  },
  {
    title: "2. Service Description",
    content: `CarRental provides car rental and subscription services through our digital platform. We offer flexible daily, weekly, and monthly rental options for premium vehicles. Our service includes vehicle delivery, insurance coverage, and 24/7 roadside assistance.`
  },
  {
    title: "3. User Eligibility",
    content: `To use our services, you must be at least 21 years old, possess a valid driver's license, and have a valid credit card. You must also meet our insurance requirements and provide accurate personal information.`
  },
  {
    title: "4. Booking and Reservations",
    content: `All bookings are subject to availability and confirmation. We reserve the right to refuse service to anyone. Bookings can be made through our website or mobile application. Confirmation will be sent via email.`
  },
  {
    title: "5. Payment Terms",
    content: `Payment is required at the time of booking. We accept major credit cards and digital payment methods. All prices are in USD and include applicable taxes. Additional charges may apply for late returns, damages, or violations.`
  },
  {
    title: "6. Cancellation Policy",
    content: `Cancellations made more than 24 hours before the rental start time are fully refundable. Cancellations made within 24 hours are subject to a 50% cancellation fee. No-shows will be charged the full rental amount.`
  },
  {
    title: "7. Vehicle Use and Restrictions",
    content: `Vehicles must be used in accordance with local laws and regulations. Smoking, pets, and off-road use are prohibited. The vehicle must be returned in the same condition as received, normal wear and tear excepted.`
  },
  {
    title: "8. Insurance and Liability",
    content: `All rentals include basic insurance coverage. Additional coverage options are available. Users are responsible for any damages not covered by insurance. We are not liable for personal belongings left in vehicles.`
  },
  {
    title: "9. Privacy Policy",
    content: `Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices. We collect and use personal information in accordance with applicable privacy laws.`
  },
  {
    title: "10. Limitation of Liability",
    content: `CarRental shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`
  },
  {
    title: "11. Termination",
    content: `We may terminate or suspend your account and access to our service immediately, without prior notice, for any reason, including breach of these Terms of Service.`
  },
  {
    title: "12. Changes to Terms",
    content: `We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our service. Continued use of the service constitutes acceptance of the modified terms.`
  }
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-light to-background py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Terms of <span className="text-blue-primary">Service</span>
          </h1>
          <p className="text-lg text-grey-text max-w-2xl mx-auto mb-8">
            Please read these terms carefully before using our car rental services. 
            By using our service, you agree to be bound by these terms.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-grey-text">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last updated: January 1, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Version 1.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-grey-border">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-primary">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-grey-text leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 px-6 bg-grey-light">
        <div className="max-w-4xl mx-auto">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                <CardTitle className="text-xl text-orange-800">Important Notice</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 leading-relaxed">
                These terms constitute a legally binding agreement between you and CarRental. 
                If you do not agree with any part of these terms, you must not use our services. 
                We recommend that you print a copy of these terms for your records.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-lg text-grey-text mb-8">
            If you have any questions about these Terms of Service, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/help-center">Help Center</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
