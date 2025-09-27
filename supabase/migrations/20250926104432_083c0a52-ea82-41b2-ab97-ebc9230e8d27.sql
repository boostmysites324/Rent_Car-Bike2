-- Create enum types for better data consistency
CREATE TYPE public.vehicle_status AS ENUM ('available', 'booked', 'maintenance', 'offline');
CREATE TYPE public.rate_unit AS ENUM ('daily', 'weekly', 'monthly');
CREATE TYPE public.fuel_type AS ENUM ('petrol', 'diesel', 'electric', 'hybrid');
CREATE TYPE public.transmission_type AS ENUM ('manual', 'automatic');
CREATE TYPE public.body_type AS ENUM ('sedan', 'hatchback', 'suv', 'coupe', 'wagon', 'van', 'convertible');
CREATE TYPE public.listing_visibility AS ENUM ('public', 'private', 'draft');

-- Main vehicles table
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic vehicle info
  vin TEXT NOT NULL UNIQUE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  trim TEXT,
  year INTEGER NOT NULL,
  body_type body_type,
  license_plate TEXT NOT NULL,
  vehicle_sku TEXT NOT NULL UNIQUE,
  
  -- Status and availability
  status vehicle_status NOT NULL DEFAULT 'available',
  listing_visibility listing_visibility NOT NULL DEFAULT 'draft',
  
  -- Basic pricing
  base_rate DECIMAL(10,2) NOT NULL,
  rate_unit rate_unit NOT NULL DEFAULT 'daily',
  security_deposit DECIMAL(10,2) DEFAULT 0,
  
  -- SEO and marketing
  short_description TEXT,
  long_description TEXT,
  seo_title TEXT,
  seo_meta_description TEXT,
  tags TEXT[],
  category TEXT,
  
  -- Admin controls
  is_approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Vehicle pricing details
CREATE TABLE public.vehicle_pricing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  
  minimum_booking_duration INTEGER DEFAULT 1,
  cleaning_fee DECIMAL(10,2) DEFAULT 0,
  mileage_included INTEGER, -- km per day/week/month
  per_km_charge DECIMAL(10,2) DEFAULT 0,
  weekend_multiplier DECIMAL(3,2) DEFAULT 1.0,
  peak_multiplier DECIMAL(3,2) DEFAULT 1.0,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  additional_driver_fee DECIMAL(10,2) DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vehicle media
CREATE TABLE public.vehicle_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image', 'video', '360_view'
  is_primary BOOLEAN DEFAULT false,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vehicle specifications
CREATE TABLE public.vehicle_specifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  
  transmission transmission_type,
  fuel_type fuel_type,
  seating_capacity INTEGER,
  doors INTEGER,
  boot_capacity TEXT,
  engine_size TEXT,
  fuel_efficiency TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vehicle features
CREATE TABLE public.vehicle_features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  
  air_conditioning BOOLEAN DEFAULT false,
  gps_navigation BOOLEAN DEFAULT false,
  bluetooth_usb BOOLEAN DEFAULT false,
  child_seat_available BOOLEAN DEFAULT false,
  roof_rack BOOLEAN DEFAULT false,
  abs_airbags BOOLEAN DEFAULT false,
  pet_friendly BOOLEAN DEFAULT false,
  smoking_allowed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vehicle locations
CREATE TABLE public.vehicle_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  
  primary_address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  pickup_zones TEXT[],
  dropoff_zones TEXT[],
  fleet_hub TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vehicle policies
CREATE TABLE public.vehicle_policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  
  minimum_driver_age INTEGER DEFAULT 21,
  additional_driver_allowed BOOLEAN DEFAULT true,
  max_distance_per_day INTEGER,
  cross_border_allowed BOOLEAN DEFAULT false,
  smoking_policy TEXT,
  pet_policy TEXT,
  fuel_policy TEXT DEFAULT 'full-to-full',
  
  cancellation_hours INTEGER DEFAULT 24,
  cancellation_penalty DECIMAL(10,2) DEFAULT 0,
  no_show_fee DECIMAL(10,2) DEFAULT 0,
  late_return_fee_per_hour DECIMAL(10,2) DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vehicle documents
CREATE TABLE public.vehicle_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  
  document_type TEXT NOT NULL, -- 'registration', 'insurance', 'road_tax', 'emission', 'permit'
  file_path TEXT NOT NULL,
  expiry_date DATE,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Vehicle maintenance
CREATE TABLE public.vehicle_maintenance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  
  current_odometer INTEGER,
  odometer_date DATE,
  last_service_date DATE,
  last_service_notes TEXT,
  next_service_due_km INTEGER,
  next_service_due_date DATE,
  accident_history TEXT,
  condition_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User roles for admin access
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'manager', 'staff')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = $1 
    AND role IN ('super_admin', 'admin', 'manager')
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- RLS Policies for vehicles (public can read approved vehicles, admins can manage all)
CREATE POLICY "Public can view approved vehicles" 
ON public.vehicles FOR SELECT 
USING (is_approved = true AND listing_visibility = 'public');

CREATE POLICY "Admins can manage all vehicles" 
ON public.vehicles FOR ALL 
USING (public.is_admin());

-- RLS Policies for related tables (follow vehicle access)
CREATE POLICY "Public can view pricing for approved vehicles" 
ON public.vehicle_pricing FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.vehicles 
  WHERE vehicles.id = vehicle_pricing.vehicle_id 
  AND vehicles.is_approved = true 
  AND vehicles.listing_visibility = 'public'
));

CREATE POLICY "Admins can manage all pricing" 
ON public.vehicle_pricing FOR ALL 
USING (public.is_admin());

-- Similar policies for other tables
CREATE POLICY "Public can view media for approved vehicles" 
ON public.vehicle_media FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.vehicles 
  WHERE vehicles.id = vehicle_media.vehicle_id 
  AND vehicles.is_approved = true 
  AND vehicles.listing_visibility = 'public'
));

CREATE POLICY "Admins can manage all media" 
ON public.vehicle_media FOR ALL 
USING (public.is_admin());

CREATE POLICY "Public can view specs for approved vehicles" 
ON public.vehicle_specifications FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.vehicles 
  WHERE vehicles.id = vehicle_specifications.vehicle_id 
  AND vehicles.is_approved = true 
  AND vehicles.listing_visibility = 'public'
));

CREATE POLICY "Admins can manage all specs" 
ON public.vehicle_specifications FOR ALL 
USING (public.is_admin());

CREATE POLICY "Public can view features for approved vehicles" 
ON public.vehicle_features FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.vehicles 
  WHERE vehicles.id = vehicle_features.vehicle_id 
  AND vehicles.is_approved = true 
  AND vehicles.listing_visibility = 'public'
));

CREATE POLICY "Admins can manage all features" 
ON public.vehicle_features FOR ALL 
USING (public.is_admin());

CREATE POLICY "Public can view locations for approved vehicles" 
ON public.vehicle_locations FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.vehicles 
  WHERE vehicles.id = vehicle_locations.vehicle_id 
  AND vehicles.is_approved = true 
  AND vehicles.listing_visibility = 'public'
));

CREATE POLICY "Admins can manage all locations" 
ON public.vehicle_locations FOR ALL 
USING (public.is_admin());

CREATE POLICY "Public can view policies for approved vehicles" 
ON public.vehicle_policies FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.vehicles 
  WHERE vehicles.id = vehicle_policies.vehicle_id 
  AND vehicles.is_approved = true 
  AND vehicles.listing_visibility = 'public'
));

CREATE POLICY "Admins can manage all policies" 
ON public.vehicle_policies FOR ALL 
USING (public.is_admin());

-- Admin-only tables
CREATE POLICY "Only admins can view documents" 
ON public.vehicle_documents FOR ALL 
USING (public.is_admin());

CREATE POLICY "Only admins can view maintenance" 
ON public.vehicle_maintenance FOR ALL 
USING (public.is_admin());

CREATE POLICY "Only admins can manage user roles" 
ON public.user_roles FOR ALL 
USING (public.is_admin());

-- Create storage bucket for vehicle media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vehicle-media', 'vehicle-media', true);

-- Storage policies for vehicle media
CREATE POLICY "Public can view vehicle media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'vehicle-media');

CREATE POLICY "Admins can upload vehicle media" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'vehicle-media' AND public.is_admin());

CREATE POLICY "Admins can update vehicle media" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'vehicle-media' AND public.is_admin());

CREATE POLICY "Admins can delete vehicle media" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'vehicle-media' AND public.is_admin());

-- Storage bucket for documents (private)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('vehicle-documents', 'vehicle-documents', false);

-- Storage policies for vehicle documents (admin only)
CREATE POLICY "Only admins can access vehicle documents" 
ON storage.objects FOR ALL 
USING (bucket_id = 'vehicle-documents' AND public.is_admin());

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_vehicles_updated_at 
BEFORE UPDATE ON public.vehicles 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicle_pricing_updated_at 
BEFORE UPDATE ON public.vehicle_pricing 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicle_specifications_updated_at 
BEFORE UPDATE ON public.vehicle_specifications 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicle_features_updated_at 
BEFORE UPDATE ON public.vehicle_features 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicle_locations_updated_at 
BEFORE UPDATE ON public.vehicle_locations 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicle_policies_updated_at 
BEFORE UPDATE ON public.vehicle_policies 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicle_documents_updated_at 
BEFORE UPDATE ON public.vehicle_documents 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicle_maintenance_updated_at 
BEFORE UPDATE ON public.vehicle_maintenance 
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();