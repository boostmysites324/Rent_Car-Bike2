import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const vehicleSchema = z.object({
  // Basic Info
  vin: z.string().min(17, "VIN must be 17 characters").max(17),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  trim: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  body_type: z.enum(['sedan', 'hatchback', 'suv', 'coupe', 'wagon', 'van', 'convertible']).optional(),
  license_plate: z.string().min(1, "License plate is required"),
  vehicle_sku: z.string().min(1, "Vehicle SKU is required"),
  
  // Status
  status: z.enum(['available', 'booked', 'maintenance', 'offline']),
  listing_visibility: z.enum(['public', 'private', 'draft']),
  
  // Pricing
  base_rate: z.number().min(0, "Base rate must be positive"),
  rate_unit: z.enum(['daily', 'weekly', 'monthly']),
  security_deposit: z.number().min(0).optional(),
  
  // SEO
  short_description: z.string().max(160).optional(),
  long_description: z.string().optional(),
  seo_title: z.string().optional(),
  seo_meta_description: z.string().max(160).optional(),
  category: z.string().optional(),
  
  // Specifications
  transmission: z.enum(['manual', 'automatic']).optional(),
  fuel_type: z.enum(['petrol', 'diesel', 'electric', 'hybrid']).optional(),
  seating_capacity: z.number().min(1).max(12).optional(),
  doors: z.number().min(2).max(6).optional(),
  boot_capacity: z.string().optional(),
  engine_size: z.string().optional(),
  fuel_efficiency: z.string().optional(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  vehicle?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function VehicleForm({ vehicle, onSuccess, onCancel }: VehicleFormProps) {
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState({
    air_conditioning: false,
    gps_navigation: false,
    bluetooth_usb: false,
    child_seat_available: false,
    roof_rack: false,
    abs_airbags: false,
    pet_friendly: false,
    smoking_allowed: false,
  });
  const { toast } = useToast();

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vin: "",
      make: "",
      model: "",
      trim: "",
      year: new Date().getFullYear(),
      license_plate: "",
      vehicle_sku: "",
      status: "available",
      listing_visibility: "draft",
      base_rate: 0,
      rate_unit: "daily",
      security_deposit: 0,
      short_description: "",
      long_description: "",
      category: "",
      seating_capacity: 5,
      doors: 4,
    },
  });

  useEffect(() => {
    if (vehicle) {
      // Populate form with existing vehicle data
      form.reset({
        vin: vehicle.vin || "",
        make: vehicle.make || "",
        model: vehicle.model || "",
        trim: vehicle.trim || "",
        year: vehicle.year || new Date().getFullYear(),
        body_type: vehicle.body_type,
        license_plate: vehicle.license_plate || "",
        vehicle_sku: vehicle.vehicle_sku || "",
        status: vehicle.status || "available",
        listing_visibility: vehicle.listing_visibility || "draft",
        base_rate: vehicle.base_rate || 0,
        rate_unit: vehicle.rate_unit || "daily",
        security_deposit: vehicle.security_deposit || 0,
        short_description: vehicle.short_description || "",
        long_description: vehicle.long_description || "",
        seo_title: vehicle.seo_title || "",
        seo_meta_description: vehicle.seo_meta_description || "",
        category: vehicle.category || "",
      });
      
      // Load related data
      loadVehicleFeatures(vehicle.id);
      loadVehicleSpecs(vehicle.id);
    }
  }, [vehicle, form]);

  const loadVehicleFeatures = async (vehicleId: string) => {
    try {
      const { data } = await supabase
        .from('vehicle_features')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .single();
      
      if (data) {
        setFeatures({
          air_conditioning: data.air_conditioning || false,
          gps_navigation: data.gps_navigation || false,
          bluetooth_usb: data.bluetooth_usb || false,
          child_seat_available: data.child_seat_available || false,
          roof_rack: data.roof_rack || false,
          abs_airbags: data.abs_airbags || false,
          pet_friendly: data.pet_friendly || false,
          smoking_allowed: data.smoking_allowed || false,
        });
      }
    } catch (error) {
      console.error('Error loading features:', error);
    }
  };

  const loadVehicleSpecs = async (vehicleId: string) => {
    try {
      const { data } = await supabase
        .from('vehicle_specifications')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .single();
      
      if (data) {
        form.setValue('transmission', data.transmission);
        form.setValue('fuel_type', data.fuel_type);
        form.setValue('seating_capacity', data.seating_capacity);
        form.setValue('doors', data.doors);
        form.setValue('boot_capacity', data.boot_capacity);
        form.setValue('engine_size', data.engine_size);
        form.setValue('fuel_efficiency', data.fuel_efficiency);
      }
    } catch (error) {
      console.error('Error loading specs:', error);
    }
  };

  const onSubmit = async (data: VehicleFormData) => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let vehicleId = vehicle?.id;

      if (vehicle) {
        // Update existing vehicle - only include fields that exist in the vehicles table
        const vehicleData = {
          vin: data.vin,
          make: data.make,
          model: data.model,
          trim: data.trim,
          year: data.year,
          body_type: data.body_type,
          license_plate: data.license_plate,
          vehicle_sku: data.vehicle_sku,
          status: data.status,
          listing_visibility: data.listing_visibility,
          base_rate: data.base_rate,
          rate_unit: data.rate_unit,
          security_deposit: data.security_deposit,
          short_description: data.short_description,
          long_description: data.long_description,
          seo_title: data.seo_title,
          seo_meta_description: data.seo_meta_description,
          category: data.category,
          updated_by: user.id,
        };

        const { error } = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', vehicle.id);
        
        if (error) throw error;
      } else {
        // Create new vehicle - only include fields that exist in the vehicles table
        const vehicleData = {
          vin: data.vin,
          make: data.make,
          model: data.model,
          trim: data.trim,
          year: data.year,
          body_type: data.body_type,
          license_plate: data.license_plate,
          vehicle_sku: data.vehicle_sku,
          status: data.status,
          listing_visibility: data.listing_visibility,
          base_rate: data.base_rate,
          rate_unit: data.rate_unit,
          security_deposit: data.security_deposit,
          short_description: data.short_description,
          long_description: data.long_description,
          seo_title: data.seo_title,
          seo_meta_description: data.seo_meta_description,
          category: data.category,
          user_id: user.id,
          created_by: user.id,
          updated_by: user.id,
        };

        const { data: newVehicle, error } = await supabase
          .from('vehicles')
          .insert(vehicleData)
          .select()
          .single();
        
        if (error) throw error;
        vehicleId = newVehicle.id;
      }

      // Save specifications
      const specsData = {
        vehicle_id: vehicleId,
        transmission: data.transmission,
        fuel_type: data.fuel_type,
        seating_capacity: data.seating_capacity,
        doors: data.doors,
        boot_capacity: data.boot_capacity,
        engine_size: data.engine_size,
        fuel_efficiency: data.fuel_efficiency,
      };

      if (vehicle) {
        await supabase
          .from('vehicle_specifications')
          .upsert(specsData, { onConflict: 'vehicle_id' });
      } else {
        await supabase
          .from('vehicle_specifications')
          .insert(specsData);
      }

      // Save features
      const featuresData = {
        vehicle_id: vehicleId,
        ...features,
      };

      if (vehicle) {
        await supabase
          .from('vehicle_features')
          .upsert(featuresData, { onConflict: 'vehicle_id' });
      } else {
        await supabase
          .from('vehicle_features')
          .insert(featuresData);
      }

      toast({
        title: vehicle ? "Vehicle updated" : "Vehicle created",
        description: `Vehicle has been ${vehicle ? 'updated' : 'created'} successfully`,
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error saving vehicle",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="vin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VIN *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1HGCM82633A004352" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vehicle_sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle SKU *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="VH-001" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Toyota" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Corolla" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="trim"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trim</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="SE" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="body_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select body type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="hatchback">Hatchback</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="coupe">Coupe</SelectItem>
                            <SelectItem value="wagon">Wagon</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="convertible">Convertible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="license_plate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Plate *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ABC123" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="booked">Booked</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="listing_visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visibility</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="base_rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Rate *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01"
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rate_unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Unit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="security_deposit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Security Deposit</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transmission" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="automatic">Automatic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="fuel_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="seating_capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seating Capacity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            max="12"
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="doors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Doors</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="2" 
                            max="6"
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="boot_capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Boot Capacity</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="400 litres" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="engine_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Engine Size</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1.8L" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="fuel_efficiency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuel Efficiency</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="15 km/l" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(features).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) =>
                          setFeatures(prev => ({ ...prev, [key]: checked === true }))
                        }
                      />
                      <Label htmlFor={key} className="text-sm font-normal">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : vehicle ? "Update Vehicle" : "Create Vehicle"}
          </Button>
        </div>
      </form>
    </Form>
  );
}