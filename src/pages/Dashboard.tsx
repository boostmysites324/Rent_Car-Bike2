import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { Car, User, Calendar, Settings } from 'lucide-react';

export default function Dashboard() {
  const { user, profile } = useAuth();

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <div className="min-h-screen bg-grey-light">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {getDisplayName()}!
          </h1>
          <p className="text-grey-text">
            Ready to find your next car rental?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link to="/cars">
              <CardContent className="p-6 text-center">
                <Car className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Browse Cars</h3>
                <p className="text-sm text-grey-text">Find the perfect car for your trip</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link to="/profile">
              <CardContent className="p-6 text-center">
                <User className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">My Profile</h3>
                <p className="text-sm text-grey-text">Update your personal information</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer opacity-60">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">My Bookings</h3>
              <p className="text-sm text-grey-text">View your rental history</p>
              <p className="text-xs text-grey-text mt-1">(Coming Soon)</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer opacity-60">
            <CardContent className="p-6 text-center">
              <Settings className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Settings</h3>
              <p className="text-sm text-grey-text">Manage your preferences</p>
              <p className="text-xs text-grey-text mt-1">(Coming Soon)</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Complete your profile to unlock all features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-grey-light rounded-md">
                <div>
                  <p className="font-medium">Complete Your Profile</p>
                  <p className="text-sm text-grey-text">Add personal information and driver's license details</p>
                </div>
                <Button size="sm" asChild>
                  <Link to="/profile">Complete</Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-grey-light rounded-md">
                <div>
                  <p className="font-medium">Browse Available Cars</p>
                  <p className="text-sm text-grey-text">Discover cars available for rent in your area</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/cars">Browse</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
              <CardDescription>
                Account information and quick stats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-grey-text">Email</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-grey-text">Member Since</span>
                <span className="font-medium">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-grey-text">Profile Status</span>
                <span className={`font-medium ${
                  profile?.first_name && profile?.last_name ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {profile?.first_name && profile?.last_name ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}