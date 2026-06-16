export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "admin" | "editor" | "staff" | "student";

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          full_name: string;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      students: {
        Row: {
          id: string;
          student_code: string;
          full_name: string;
          phone: string | null;
          dob: string | null;
          id_card: string | null;
          course_class: string;
          enrollment_date: string;
          status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          student_code: string;
          full_name: string;
          phone?: string | null;
          dob?: string | null;
          id_card?: string | null;
          course_class?: string;
          enrollment_date?: string;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_code?: string;
          full_name?: string;
          phone?: string | null;
          dob?: string | null;
          id_card?: string | null;
          course_class?: string;
          enrollment_date?: string;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      exam_schedules: {
        Row: {
          id: string;
          student_id: string;
          exam_type: string;
          scheduled_at: string;
          location: string | null;
          result: string | null;
          score: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          exam_type: string;
          scheduled_at: string;
          location?: string | null;
          result?: string | null;
          score?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          exam_type?: string;
          scheduled_at?: string;
          location?: string | null;
          result?: string | null;
          score?: number | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          name: string;
          class_code: string;
          description: string | null;
          features: string[] | null;
          original_price: number | null;
          sale_price: number;
          image_url: string | null;
          badge: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          class_code: string;
          description?: string | null;
          features?: string[] | null;
          original_price?: number | null;
          sale_price: number;
          image_url?: string | null;
          badge?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          class_code?: string;
          description?: string | null;
          features?: string[] | null;
          original_price?: number | null;
          sale_price?: number;
          image_url?: string | null;
          badge?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
        };
      };
      news_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          display_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          display_order?: number;
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          images: string[] | null;
          category_id: string | null;
          author_id: string | null;
          is_published: boolean;
          published_at: string | null;
          view_count: number;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          images?: string[] | null;
          category_id?: string | null;
          author_id?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          view_count?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image?: string | null;
          images?: string[] | null;
          category_id?: string | null;
          author_id?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          view_count?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          subject: string | null;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone: string;
          email?: string | null;
          subject?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string;
          email?: string | null;
          subject?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_user_role: {
        Args: Record<string, never>;
        Returns: UserRole;
      };
    };
    Enums: {
      user_role: UserRole;
    };
  };
}

// Convenient type aliases
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type UserProfile = Tables<"user_profiles">;
export type Student = Tables<"students">;
export type ExamSchedule = Tables<"exam_schedules">;
export type Course = Tables<"courses">;
export type NewsCategory = Tables<"news_categories">;
export type News = Tables<"news">;
export type Contact = Tables<"contacts">;

// News with joined category
export type NewsWithCategory = News & {
  news_categories: Pick<NewsCategory, "id" | "name" | "slug"> | null;
};
