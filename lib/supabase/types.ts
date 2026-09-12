// Hand-written until `supabase gen types typescript` is run against a real
// project. Keep this in sync with supabase/migrations/0001_init.sql. Shape
// matches the Supabase CLI's generated-types format.

export type Database = {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          unsubscribed_at?: string | null;
        };
        Relationships: [];
      };
      purchases: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          product_id: string;
          stripe_checkout_session_id: string | null;
          amount_gbp: number;
          status: "pending" | "paid" | "refunded";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          product_id: string;
          stripe_checkout_session_id?: string | null;
          amount_gbp: number;
          status?: "pending" | "paid" | "refunded";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          product_id?: string;
          stripe_checkout_session_id?: string | null;
          amount_gbp?: number;
          status?: "pending" | "paid" | "refunded";
          created_at?: string;
        };
        Relationships: [];
      };
      downloadable_assets: {
        Row: {
          id: string;
          product_id: string;
          storage_path: string;
          label: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          storage_path: string;
          label: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          storage_path?: string;
          label?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
