import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Calendar, Eye, Lock, Database, Mail, Phone, MapPin } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support. This includes your name, email address, phone number, driver's license information, payment details, and vehicle preferences.`
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to provide, maintain, and improve our services, process bookings, communicate with you, provide customer support, send you important updates, and ensure the security of our platform.`
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our platform, conducting our business, or serving our users.`
  },
  {
    title: "4. Data Security",
    content: `We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.`
  },
  {
    title: "5. Cookies and Tracking",
    content: `We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us remember your preferences, analyze site traffic, and provide personalized content. You can control cookie settings through your browser.`
  },
  {
    title: "6. Third-Party Services",
    content: `Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.`
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.`
  },
  {
    title: "8. Your Rights",
    content: `You have the right to access, update, or delete your personal information. You can also opt out of certain communications, request data portability, and object to certain processing activities. Contact us to exercise these rights.`
  },
  {
    title: "9. Children's Privacy",
    content: `Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it.`
  },
  {
    title: "10. International Transfers",
    content: `Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.`
  },
  {
    title: "11. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date. Your continued use of our services constitutes acceptance of the updated policy.`
  },
  {
    title: "12. Contact Information",
    content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@carrental.com or through our contact page. We are committed to addressing your concerns promptly and transparently.`
  }
];

const dataTypes = [
  {
    title: "Personal Information",
    description: "Name, email, phone number, and contact details",
    icon: Mail
  },
  {
    title: "Identity Information",
    description: "Driver's license and identification documents",
    icon: Shield
  },
  {
    title: "Payment Information",
    description: "Credit card details and billing information",
    icon: Lock
  },
  {
    title: "Usage Data",
    description: "How you interact with our platform and services",
    icon: Eye
  },
  {
    title: "Location Data",
    description: "Vehicle pickup and return locations",
    icon: MapPin
  },
  {
    title: "Communication Data",
    description: "Support tickets, emails, and phone calls",
    icon: Phone
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-light to-background py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Privacy <span className="text-blue-primary">Policy</span>
          </h1>
          <p className="text-lg text-grey-text max-w-2xl mx-auto mb-8">
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your personal information when you use our services.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-grey-text">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last updated: January 1, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Data Types Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Information We Collect
            </h2>
            <p className="text-lg text-grey-text max-w-2xl mx-auto">
              We collect various types of information to provide you with the best possible service
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dataTypes.map((dataType, index) => (
              <Card key={index} className="border-grey-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-light flex items-center justify-center">
                    <dataType.icon className="w-8 h-8 text-blue-primary" />
                  </div>
                  <CardTitle className="text-xl">{dataType.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-grey-text text-center">{dataType.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 px-6 bg-grey-light">
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

      {/* Your Rights Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-xl text-blue-800">Your Privacy Rights</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-700 leading-relaxed">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-blue-700">
                  <li>Right to access your personal information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your personal information</li>
                  <li>Right to restrict processing of your information</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                </ul>
                <p className="text-blue-700 leading-relaxed">
                  To exercise any of these rights, please contact us at privacy@carrental.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-blue-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Questions About Your Privacy?
          </h2>
          <p className="text-lg text-grey-text mb-8">
            We're committed to protecting your privacy. If you have any questions or concerns, 
            please don't hesitate to reach out to us.
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
