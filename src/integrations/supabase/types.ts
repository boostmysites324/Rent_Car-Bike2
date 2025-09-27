export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          driver_license_number: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          driver_license_number?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          driver_license_number?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      vehicle_documents: {
        Row: {
          created_at: string
          document_type: string
          expiry_date: string | null
          file_path: string
          id: string
          notes: string | null
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          expiry_date?: string | null
          file_path: string
          id?: string
          notes?: string | null
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          expiry_date?: string | null
          file_path?: string
          id?: string
          notes?: string | null
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_documents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_features: {
        Row: {
          abs_airbags: boolean | null
          air_conditioning: boolean | null
          bluetooth_usb: boolean | null
          child_seat_available: boolean | null
          created_at: string
          gps_navigation: boolean | null
          id: string
          pet_friendly: boolean | null
          roof_rack: boolean | null
          smoking_allowed: boolean | null
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          abs_airbags?: boolean | null
          air_conditioning?: boolean | null
          bluetooth_usb?: boolean | null
          child_seat_available?: boolean | null
          created_at?: string
          gps_navigation?: boolean | null
          id?: string
          pet_friendly?: boolean | null
          roof_rack?: boolean | null
          smoking_allowed?: boolean | null
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          abs_airbags?: boolean | null
          air_conditioning?: boolean | null
          bluetooth_usb?: boolean | null
          child_seat_available?: boolean | null
          created_at?: string
          gps_navigation?: boolean | null
          id?: string
          pet_friendly?: boolean | null
          roof_rack?: boolean | null
          smoking_allowed?: boolean | null
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_features_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_locations: {
        Row: {
          created_at: string
          dropoff_zones: string[] | null
          fleet_hub: string | null
          id: string
          latitude: number | null
          longitude: number | null
          pickup_zones: string[] | null
          primary_address: string
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          dropoff_zones?: string[] | null
          fleet_hub?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          pickup_zones?: string[] | null
          primary_address: string
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          dropoff_zones?: string[] | null
          fleet_hub?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          pickup_zones?: string[] | null
          primary_address?: string
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_locations_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_maintenance: {
        Row: {
          accident_history: string | null
          condition_notes: string | null
          created_at: string
          current_odometer: number | null
          id: string
          last_service_date: string | null
          last_service_notes: string | null
          next_service_due_date: string | null
          next_service_due_km: number | null
          odometer_date: string | null
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          accident_history?: string | null
          condition_notes?: string | null
          created_at?: string
          current_odometer?: number | null
          id?: string
          last_service_date?: string | null
          last_service_notes?: string | null
          next_service_due_date?: string | null
          next_service_due_km?: number | null
          odometer_date?: string | null
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          accident_history?: string | null
          condition_notes?: string | null
          created_at?: string
          current_odometer?: number | null
          id?: string
          last_service_date?: string | null
          last_service_notes?: string | null
          next_service_due_date?: string | null
          next_service_due_km?: number | null
          odometer_date?: string | null
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_maintenance_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_media: {
        Row: {
          alt_text: string | null
          created_at: string
          file_path: string
          file_type: string
          id: string
          is_primary: boolean | null
          sort_order: number | null
          vehicle_id: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_path: string
          file_type: string
          id?: string
          is_primary?: boolean | null
          sort_order?: number | null
          vehicle_id: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_path?: string
          file_type?: string
          id?: string
          is_primary?: boolean | null
          sort_order?: number | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_media_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_policies: {
        Row: {
          additional_driver_allowed: boolean | null
          cancellation_hours: number | null
          cancellation_penalty: number | null
          created_at: string
          cross_border_allowed: boolean | null
          fuel_policy: string | null
          id: string
          late_return_fee_per_hour: number | null
          max_distance_per_day: number | null
          minimum_driver_age: number | null
          no_show_fee: number | null
          pet_policy: string | null
          smoking_policy: string | null
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          additional_driver_allowed?: boolean | null
          cancellation_hours?: number | null
          cancellation_penalty?: number | null
          created_at?: string
          cross_border_allowed?: boolean | null
          fuel_policy?: string | null
          id?: string
          late_return_fee_per_hour?: number | null
          max_distance_per_day?: number | null
          minimum_driver_age?: number | null
          no_show_fee?: number | null
          pet_policy?: string | null
          smoking_policy?: string | null
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          additional_driver_allowed?: boolean | null
          cancellation_hours?: number | null
          cancellation_penalty?: number | null
          created_at?: string
          cross_border_allowed?: boolean | null
          fuel_policy?: string | null
          id?: string
          late_return_fee_per_hour?: number | null
          max_distance_per_day?: number | null
          minimum_driver_age?: number | null
          no_show_fee?: number | null
          pet_policy?: string | null
          smoking_policy?: string | null
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_policies_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_pricing: {
        Row: {
          additional_driver_fee: number | null
          cleaning_fee: number | null
          created_at: string
          delivery_fee: number | null
          id: string
          mileage_included: number | null
          minimum_booking_duration: number | null
          peak_multiplier: number | null
          per_km_charge: number | null
          updated_at: string
          vehicle_id: string
          weekend_multiplier: number | null
        }
        Insert: {
          additional_driver_fee?: number | null
          cleaning_fee?: number | null
          created_at?: string
          delivery_fee?: number | null
          id?: string
          mileage_included?: number | null
          minimum_booking_duration?: number | null
          peak_multiplier?: number | null
          per_km_charge?: number | null
          updated_at?: string
          vehicle_id: string
          weekend_multiplier?: number | null
        }
        Update: {
          additional_driver_fee?: number | null
          cleaning_fee?: number | null
          created_at?: string
          delivery_fee?: number | null
          id?: string
          mileage_included?: number | null
          minimum_booking_duration?: number | null
          peak_multiplier?: number | null
          per_km_charge?: number | null
          updated_at?: string
          vehicle_id?: string
          weekend_multiplier?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_pricing_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_specifications: {
        Row: {
          boot_capacity: string | null
          created_at: string
          doors: number | null
          engine_size: string | null
          fuel_efficiency: string | null
          fuel_type: Database["public"]["Enums"]["fuel_type"] | null
          id: string
          seating_capacity: number | null
          transmission: Database["public"]["Enums"]["transmission_type"] | null
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          boot_capacity?: string | null
          created_at?: string
          doors?: number | null
          engine_size?: string | null
          fuel_efficiency?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"] | null
          id?: string
          seating_capacity?: number | null
          transmission?: Database["public"]["Enums"]["transmission_type"] | null
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          boot_capacity?: string | null
          created_at?: string
          doors?: number | null
          engine_size?: string | null
          fuel_efficiency?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"] | null
          id?: string
          seating_capacity?: number | null
          transmission?: Database["public"]["Enums"]["transmission_type"] | null
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_specifications_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          base_rate: number
          body_type: Database["public"]["Enums"]["body_type"] | null
          category: string | null
          created_at: string
          created_by: string | null
          id: string
          is_approved: boolean | null
          license_plate: string
          listing_visibility: Database["public"]["Enums"]["listing_visibility"]
          long_description: string | null
          make: string
          model: string
          rate_unit: Database["public"]["Enums"]["rate_unit"]
          security_deposit: number | null
          seo_meta_description: string | null
          seo_title: string | null
          short_description: string | null
          status: Database["public"]["Enums"]["vehicle_status"]
          tags: string[] | null
          trim: string | null
          updated_at: string
          updated_by: string | null
          user_id: string | null
          vehicle_sku: string
          vin: string
          year: number
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          base_rate: number
          body_type?: Database["public"]["Enums"]["body_type"] | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_approved?: boolean | null
          license_plate: string
          listing_visibility?: Database["public"]["Enums"]["listing_visibility"]
          long_description?: string | null
          make: string
          model: string
          rate_unit?: Database["public"]["Enums"]["rate_unit"]
          security_deposit?: number | null
          seo_meta_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"]
          tags?: string[] | null
          trim?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string | null
          vehicle_sku: string
          vin: string
          year: number
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          base_rate?: number
          body_type?: Database["public"]["Enums"]["body_type"] | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_approved?: boolean | null
          license_plate?: string
          listing_visibility?: Database["public"]["Enums"]["listing_visibility"]
          long_description?: string | null
          make?: string
          model?: string
          rate_unit?: Database["public"]["Enums"]["rate_unit"]
          security_deposit?: number | null
          seo_meta_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"]
          tags?: string[] | null
          trim?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string | null
          vehicle_sku?: string
          vin?: string
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      body_type:
        | "sedan"
        | "hatchback"
        | "suv"
        | "coupe"
        | "wagon"
        | "van"
        | "convertible"
      fuel_type: "petrol" | "diesel" | "electric" | "hybrid"
      listing_visibility: "public" | "private" | "draft"
      rate_unit: "daily" | "weekly" | "monthly"
      transmission_type: "manual" | "automatic"
      vehicle_status: "available" | "booked" | "maintenance" | "offline"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      body_type: [
        "sedan",
        "hatchback",
        "suv",
        "coupe",
        "wagon",
        "van",
        "convertible",
      ],
      fuel_type: ["petrol", "diesel", "electric", "hybrid"],
      listing_visibility: ["public", "private", "draft"],
      rate_unit: ["daily", "weekly", "monthly"],
      transmission_type: ["manual", "automatic"],
      vehicle_status: ["available", "booked", "maintenance", "offline"],
    },
  },
} as const
