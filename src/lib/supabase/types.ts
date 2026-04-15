/**
 * Database types generated from the Supabase schema in `supabase/migrations`.
 *
 * In a real project, regenerate with:
 *   npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
 */
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
