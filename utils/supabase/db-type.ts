export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          is_primary: boolean | null
          local_govt: string
          postal_code: string | null
          state: string
          street_address: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          city: string
          country: string
          created_at?: string
          id?: string
          is_primary?: boolean | null
          local_govt: string
          postal_code?: string | null
          state: string
          street_address?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_primary?: boolean | null
          local_govt?: string
          postal_code?: string | null
          state?: string
          street_address?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      base_permissions: {
        Row: {
          action: Database["public"]["Enums"]["base_action_enum"]
          id: string
          resource_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["base_action_enum"]
          id?: string
          resource_id: string
        }
        Update: {
          action?: Database["public"]["Enums"]["base_action_enum"]
          id?: string
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_permissions_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "base_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      base_resources: {
        Row: {
          id: string
          name: Database["public"]["Enums"]["base_resources_enum"]
        }
        Insert: {
          id?: string
          name: Database["public"]["Enums"]["base_resources_enum"]
        }
        Update: {
          id?: string
          name?: Database["public"]["Enums"]["base_resources_enum"]
        }
        Relationships: []
      }
      base_role_permissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "base_permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "base_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      base_roles: {
        Row: {
          description: string
          id: string
          role: Database["public"]["Enums"]["base_role_enum"]
        }
        Insert: {
          description: string
          id?: string
          role: Database["public"]["Enums"]["base_role_enum"]
        }
        Update: {
          description?: string
          id?: string
          role?: Database["public"]["Enums"]["base_role_enum"]
        }
        Relationships: []
      }
      base_staff_roles: {
        Row: {
          assigned_at: string
          role_id: string
          staff_id: string
          tenant_id: string
        }
        Insert: {
          assigned_at?: string
          role_id: string
          staff_id: string
          tenant_id: string
        }
        Update: {
          assigned_at?: string
          role_id?: string
          staff_id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "base_staff_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "base_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_staff_roles_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staffs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "base_staff_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          email: string
          email_verified: boolean | null
          id: string
          phone: string
          phone_verified: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          email_verified?: boolean | null
          id?: string
          phone: string
          phone_verified?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          email_verified?: boolean | null
          id?: string
          phone?: string
          phone_verified?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      operations: {
        Row: {
          action: Database["public"]["Enums"]["action_enum"]
          id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["action_enum"]
          id?: string
        }
        Update: {
          action?: Database["public"]["Enums"]["action_enum"]
          id?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          id: string
          operation_id: string
          resource_id: string
        }
        Insert: {
          id?: string
          operation_id: string
          resource_id: string
        }
        Update: {
          id?: string
          operation_id?: string
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permissions_operation_id_fkey"
            columns: ["operation_id"]
            isOneToOne: false
            referencedRelation: "operations"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean
          service: Database["public"]["Enums"]["service_enum"]
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean
          service?: Database["public"]["Enums"]["service_enum"]
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean
          service?: Database["public"]["Enums"]["service_enum"]
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      staffs: {
        Row: {
          created_at: string
          id: string
          tenant_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tenant_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tenant_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staffs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staffs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tenant_address: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          postal_code: string | null
          state: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          city: string
          country: string
          created_at?: string
          id?: string
          postal_code?: string | null
          state: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          postal_code?: string | null
          state?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_address_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_biometrics: {
        Row: {
          avatar: string | null
          created_at: string
          id: string
          legal_entity: string
          number_of_employees: number
          reg_number: string
          tax_id: string
          tenant_id: string
          updated_at: string
          website: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id?: string
          legal_entity: string
          number_of_employees?: number
          reg_number: string
          tax_id: string
          tenant_id: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: string
          legal_entity?: string
          number_of_employees?: number
          reg_number?: string
          tax_id?: string
          tenant_id?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_biometrics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_contact: {
        Row: {
          created_at: string
          email: string
          id: string
          phone: string
          tenant_id: string
          type: Database["public"]["Enums"]["phone_enum"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          phone: string
          tenant_id: string
          type?: Database["public"]["Enums"]["phone_enum"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          phone?: string
          tenant_id?: string
          type?: Database["public"]["Enums"]["phone_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_contact_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_social_media: {
        Row: {
          created_at: string
          id: string
          platform: Database["public"]["Enums"]["social_enum"]
          tenant_id: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform: Database["public"]["Enums"]["social_enum"]
          tenant_id: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: Database["public"]["Enums"]["social_enum"]
          tenant_id?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_social_media_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenants_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_biometrics: {
        Row: {
          avatar_url: string | null
          created_at: string
          dob: string
          gender: Database["public"]["Enums"]["gender_enum"] | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          dob: string
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          dob?: string
          gender?: Database["public"]["Enums"]["gender_enum"] | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_biometrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          first_name: string
          last_name: string
          middle_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          first_name: string
          last_name: string
          middle_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          first_name?: string
          last_name?: string
          middle_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_tenant_and_related:
        | {
            Args: {
              p_user_id: string
              p_first_name: string
              p_last_name: string
              p_tenant_name: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_user_id: string
              p_first_name: string
              p_middle_name: string
              p_last_name: string
              p_tenant_name: string
            }
            Returns: undefined
          }
    }
    Enums: {
      action_enum: "create" | "read" | "update" | "delete" | "manage"
      base_action_enum: "create" | "read" | "update" | "delete" | "manage"
      base_resources_enum:
        | "Staff Management"
        | "Roles & Permissions"
        | "Organization Settings"
        | "Financial Management"
        | "Inventory Management"
        | "Guest Check-in/Check-out"
        | "Room & Booking Management"
        | "Restaurant Orders"
        | "Kitchen & Food Prep"
        | "Event & Banquet Management"
        | "Procurement & Suppliers"
        | "HR & Payroll"
        | "Security & Access Control"
        | "Marketing & Promotions"
      base_role_enum:
        | "Super Admin"
        | "General Manager"
        | "Finance Manager"
        | "IT Admin"
        | "Department Managers"
        | "Staff"
      gender_enum: "male" | "female" | "other" | "prefer_not_to_say"
      phone_enum: "phone" | "telephone"
      role_enum:
        | "Super Admin"
        | "General Manager"
        | "Finance Manager"
        | "IT Admin"
        | "Department Managers"
        | "Staff"
      service_enum:
        | "hotel"
        | "restaurant"
        | "spa"
        | "laundry"
        | "event_management"
        | "tour_operator"
        | "transport"
        | "other"
      social_enum:
        | "facebook"
        | "instagram"
        | "twitter"
        | "linkedin"
        | "youtube"
        | "tiktok"
        | "pinterest"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
