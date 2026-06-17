-- Migration: Add UPDATE policy for contacts table so admin/staff can update status
-- Run this in Supabase SQL Editor

CREATE POLICY "admin staff update contacts" ON public.contacts
  FOR UPDATE USING (public.get_user_role() IN ('admin', 'staff'))
  WITH CHECK (public.get_user_role() IN ('admin', 'staff'));
