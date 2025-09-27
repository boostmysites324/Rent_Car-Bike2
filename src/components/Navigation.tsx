import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Menu, X, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };
  
  return (
    <nav className="bg-white border-b border-grey-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-primary">
            <div className="w-8 h-8 bg-blue-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-primary to-blue-600 bg-clip-text text-transparent">
              CarRental
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-primary ${
                isActive('/') ? 'text-blue-primary' : 'text-grey-text'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className={`text-sm font-medium transition-colors hover:text-blue-primary ${
                isActive('/cars') ? 'text-blue-primary' : 'text-grey-text'
              }`}
            >
              Browse Cars
            </Link>
            <Link 
              to="/how-it-works" 
              className={`text-sm font-medium transition-colors hover:text-blue-primary ${
                isActive('/how-it-works') ? 'text-blue-primary' : 'text-grey-text'
              }`}
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-blue-primary ${
                isActive('/about') ? 'text-blue-primary' : 'text-grey-text'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-blue-primary ${
                isActive('/contact') ? 'text-blue-primary' : 'text-grey-text'
              }`}
            >
              Contact
            </Link>
          </div>
          
          {/* CTA Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {getDisplayName()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-destructive">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-grey-text hover:text-blue-primary"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-grey-border bg-white">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className={`block text-sm font-medium transition-colors hover:text-blue-primary ${
                  isActive('/') ? 'text-blue-primary' : 'text-grey-text'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/cars" 
                className={`block text-sm font-medium transition-colors hover:text-blue-primary ${
                  isActive('/cars') ? 'text-blue-primary' : 'text-grey-text'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Cars
              </Link>
              <Link 
                to="/how-it-works" 
                className={`block text-sm font-medium transition-colors hover:text-blue-primary ${
                  isActive('/how-it-works') ? 'text-blue-primary' : 'text-grey-text'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/about" 
                className={`block text-sm font-medium transition-colors hover:text-blue-primary ${
                  isActive('/about') ? 'text-blue-primary' : 'text-grey-text'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`block text-sm font-medium transition-colors hover:text-blue-primary ${
                  isActive('/contact') ? 'text-blue-primary' : 'text-grey-text'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t border-grey-border space-y-2">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block text-sm font-medium text-grey-text hover:text-blue-primary py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block text-sm font-medium text-grey-text hover:text-blue-primary py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link to="/auth/signin">Sign In</Link>
                    </Button>
                    <Button size="sm" className="w-full" asChild>
                      <Link to="/auth/signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};