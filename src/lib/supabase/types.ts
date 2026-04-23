export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PlanTier = "free" | "pro" | "enterprise";
export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "unpaid"
  | "paused";

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          stripe_customer_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      plans: {
        Row: {
          id: string;
          tier: PlanTier;
          name: string;
          description: string | null;
          price_monthly_cents: number;
          stripe_product_id: string | null;
          stripe_price_id: string | null;
          features: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          tier: PlanTier;
          name: string;
          description?: string | null;
          price_monthly_cents: number;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          features?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          tier?: PlanTier;
          name?: string;
          description?: string | null;
          price_monthly_cents?: number;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          features?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string | null;
          stripe_subscription_id: string | null;
          stripe_price_id: string | null;
          status: SubscriptionStatus;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          status?: SubscriptionStatus;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_id?: string | null;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          status?: SubscriptionStatus;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      health_data: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          weight: number | null;
          height: number | null;
          body_fat: number | null;
          muscle_mass: number | null;
          bmi: number | null;
          body_water: number | null;
          waist: number | null;
          hips: number | null;
          chest: number | null;
          arms: number | null;
          thigh: number | null;
          calves: number | null;
          systolic_bp: number | null;
          diastolic_bp: number | null;
          resting_hr: number | null;
          oxygen_saturation: number | null;
          hrv: number | null;
          fasting_glucose: number | null;
          post_meal_glucose: number | null;
          ketones: number | null;
          body_temp: number | null;
          sleep_hours: number | null;
          sleep_quality: number | null;
          sleep_start: string | null;
          sleep_end: string | null;
          night_awakenings: number | null;
          steps: number | null;
          calories_burned: number | null;
          activity_minutes: number | null;
          distance_km: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date?: string;
          weight?: number | null;
          height?: number | null;
          body_fat?: number | null;
          muscle_mass?: number | null;
          bmi?: number | null;
          body_water?: number | null;
          waist?: number | null;
          hips?: number | null;
          chest?: number | null;
          arms?: number | null;
          thigh?: number | null;
          calves?: number | null;
          systolic_bp?: number | null;
          diastolic_bp?: number | null;
          resting_hr?: number | null;
          oxygen_saturation?: number | null;
          hrv?: number | null;
          fasting_glucose?: number | null;
          post_meal_glucose?: number | null;
          ketones?: number | null;
          body_temp?: number | null;
          sleep_hours?: number | null;
          sleep_quality?: number | null;
          sleep_start?: string | null;
          sleep_end?: string | null;
          night_awakenings?: number | null;
          steps?: number | null;
          calories_burned?: number | null;
          activity_minutes?: number | null;
          distance_km?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          weight?: number | null;
          height?: number | null;
          body_fat?: number | null;
          muscle_mass?: number | null;
          bmi?: number | null;
          body_water?: number | null;
          waist?: number | null;
          hips?: number | null;
          chest?: number | null;
          arms?: number | null;
          thigh?: number | null;
          calves?: number | null;
          systolic_bp?: number | null;
          diastolic_bp?: number | null;
          resting_hr?: number | null;
          oxygen_saturation?: number | null;
          hrv?: number | null;
          fasting_glucose?: number | null;
          post_meal_glucose?: number | null;
          ketones?: number | null;
          body_temp?: number | null;
          sleep_hours?: number | null;
          sleep_quality?: number | null;
          sleep_start?: string | null;
          sleep_end?: string | null;
          night_awakenings?: number | null;
          steps?: number | null;
          calories_burned?: number | null;
          activity_minutes?: number | null;
          distance_km?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      reminders: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          due_date: string;
          type: string;
          status: string;
          notify_doctor: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          due_date: string;
          type?: string;
          status?: string;
          notify_doctor?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          due_date?: string;
          type?: string;
          status?: string;
          notify_doctor?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      doctors: {
        Row: {
          id: string;
          name: string;
          specialization: string;
          style: string;
          passions: string | null;
          price: number;
          availability: string | null;
          rating: number;
          reviews_count: number;
        };
        Insert: {
          id?: string;
          name: string;
          specialization: string;
          style: string;
          passions?: string | null;
          price: number;
          availability?: string | null;
          rating?: number;
          reviews_count?: number;
        };
        Update: {
          id?: string;
          name?: string;
          specialization?: string;
          style?: string;
          passions?: string | null;
          price?: number;
          availability?: string | null;
          rating?: number;
          reviews_count?: number;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size: number;
          storage_path: string;
          category: string | null;
          description: string | null;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size: number;
          storage_path: string;
          category?: string | null;
          description?: string | null;
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          filename?: string;
          original_name?: string;
          mime_type?: string;
          size?: number;
          storage_path?: string;
          category?: string | null;
          description?: string | null;
          uploaded_at?: string;
        };
        Relationships: [];
      };
      access_logs: {
        Row: {
          id: string;
          user_id: string | null;
          doctor_id: string | null;
          action: string;
          resource: string;
          timestamp: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          doctor_id?: string | null;
          action: string;
          resource: string;
          timestamp?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          doctor_id?: string | null;
          action?: string;
          resource?: string;
          timestamp?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      plan_tier: PlanTier;
      subscription_status: SubscriptionStatus;
    };
    CompositeTypes: Record<never, never>;
  };
};
