import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { z } from 'zod';

const profileSchema = z.object({
  first_name: z.string().trim().min(1, { message: "First name is required" }).max(50, { message: "First name must be less than 50 characters" }),
  last_name: z.string().trim().min(1, { message: "Last name is required" }).max(50, { message: "Last name must be less than 50 characters" }),
  phone: z.string().trim().optional().refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
    message: "Please enter a valid phone number"
  }),
  address: z.string().trim().max(200, { message: "Address must be less than 200 characters" }).optional(),
  date_of_birth: z.string().optional().refine((val) => {
    if (!val) return true;
    const date = new Date(val);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 18 && age <= 100;
  }, { message: "You must be between 18 and 100 years old" }),
  driver_license_number: z.string().trim().max(50, { message: "License number must be less than 50 characters" }).optional()
});

export default function Profile() {
  const { user, profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    date_of_birth: '',
    driver_license_number: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        date_of_birth: profile.date_of_birth || '',
        driver_license_number: profile.driver_license_number || ''
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form data
      const validatedData = profileSchema.parse(formData);
      
      setLoading(true);
      const { error } = await updateProfile(validatedData);
      
      if (error) {
        console.error('Profile update error:', error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-grey-light">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-grey-text">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => handleChange('first_name', e.target.value)}
                        disabled={loading}
                        className={errors.first_name ? "border-destructive" : ""}
                      />
                      {errors.first_name && (
                        <p className="text-sm text-destructive">{errors.first_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => handleChange('last_name', e.target.value)}
                        disabled={loading}
                        className={errors.last_name ? "border-destructive" : ""}
                      />
                      {errors.last_name && (
                        <p className="text-sm text-destructive">{errors.last_name}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      disabled={loading}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St, City, State, ZIP"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      disabled={loading}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive">{errors.address}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => handleChange('date_of_birth', e.target.value)}
                      disabled={loading}
                      className={errors.date_of_birth ? "border-destructive" : ""}
                    />
                    {errors.date_of_birth && (
                      <p className="text-sm text-destructive">{errors.date_of_birth}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driver_license_number">Driver's License Number</Label>
                    <Input
                      id="driver_license_number"
                      placeholder="Enter your license number"
                      value={formData.driver_license_number}
                      onChange={(e) => handleChange('driver_license_number', e.target.value)}
                      disabled={loading}
                      className={errors.driver_license_number ? "border-destructive" : ""}
                    />
                    {errors.driver_license_number && (
                      <p className="text-sm text-destructive">{errors.driver_license_number}</p>
                    )}
                    <p className="text-xs text-grey-text">
                      Required for car rentals
                    </p>
                  </div>

                  <Separator />

                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Account Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-grey-text" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-grey-text">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-grey-text" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-grey-text">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-grey-text" />
                  <div>
                    <p className="text-sm font-medium">Profile Status</p>
                    <p className={`text-sm ${
                      profile?.first_name && profile?.last_name ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {profile?.first_name && profile?.last_name ? 'Complete' : 'Incomplete'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-grey-text">Total Bookings</span>
                  <span className="font-medium">0</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-grey-text">Favorite Cars</span>
                  <span className="font-medium">0</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-grey-text">Loyalty Points</span>
                  <span className="font-medium">0</span>
                </div>
                
                <p className="text-xs text-grey-text mt-4">
                  Complete your first booking to start earning rewards!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}