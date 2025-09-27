import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VehicleForm } from "./VehicleForm";
import { Plus, Search, Edit, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  status: string;
  listing_visibility: string;
  is_approved: boolean;
  base_rate: number;
  rate_unit: string;
  created_at: string;
}

interface VehicleManagementProps {
  onStatsUpdate: () => void;
}

export function VehicleManagement({ onStatsUpdate }: VehicleManagementProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading vehicles",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Vehicle deleted",
        description: "The vehicle has been deleted successfully"
      });

      loadVehicles();
      onStatsUpdate();
    } catch (error: any) {
      toast({
        title: "Error deleting vehicle",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'offline' : 'available';
    
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      loadVehicles();
      onStatsUpdate();
      
      toast({
        title: "Status updated",
        description: `Vehicle status changed to ${newStatus}`
      });
    } catch (error: any) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleApprovalToggle = async (id: string, currentApproval: boolean) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ 
          is_approved: !currentApproval,
          approved_at: !currentApproval ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;
      
      loadVehicles();
      onStatsUpdate();
      
      toast({
        title: "Approval updated",
        description: `Vehicle ${!currentApproval ? 'approved' : 'unapproved'}`
      });
    } catch (error: any) {
      toast({
        title: "Error updating approval",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      available: "default",
      booked: "secondary",
      maintenance: "outline",
      offline: "destructive"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getVisibilityBadge = (visibility: string) => {
    const variants: { [key: string]: "default" | "secondary" | "outline" } = {
      public: "default",
      private: "secondary",
      draft: "outline"
    };
    return <Badge variant={variants[visibility] || "outline"}>{visibility}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Vehicle Management</CardTitle>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingVehicle(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                </DialogTitle>
              </DialogHeader>
              <VehicleForm
                vehicle={editingVehicle}
                onSuccess={() => {
                  setIsFormOpen(false);
                  setEditingVehicle(null);
                  loadVehicles();
                  onStatsUpdate();
                }}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingVehicle(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles by make, model, or VIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>VIN</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No vehicles found
                  </TableCell>
                </TableRow>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Added {new Date(vehicle.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{vehicle.vin}</TableCell>
                    <TableCell>
                      ${vehicle.base_rate}/{vehicle.rate_unit}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusToggle(vehicle.id, vehicle.status)}
                      >
                        {getStatusBadge(vehicle.status)}
                      </Button>
                    </TableCell>
                    <TableCell>{getVisibilityBadge(vehicle.listing_visibility)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApprovalToggle(vehicle.id, vehicle.is_approved)}
                      >
                        <Badge variant={vehicle.is_approved ? "default" : "outline"}>
                          {vehicle.is_approved ? "Approved" : "Pending"}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingVehicle(vehicle);
                            setIsFormOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(vehicle.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}