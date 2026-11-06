ALTER TABLE public.membership_applications ADD COLUMN IF NOT EXISTS admin_notes text;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false, ADD COLUMN IF NOT EXISTS is_archived boolean NOT NULL DEFAULT false;
ALTER TABLE public.short_courses ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS unit_price numeric, ADD COLUMN IF NOT EXISTS book_title text;
UPDATE public.orders o SET unit_price = b.price, book_title = b.title FROM public.books b WHERE o.book_id = b.id AND o.unit_price IS NULL;
COMMENT ON COLUMN public.orders.unit_price IS 'Purchase price captured on insert; historical backfill uses the price available at migration time.';
GRANT SELECT, UPDATE ON public.contact_messages, public.membership_applications, public.donations TO authenticated;
GRANT SELECT ON public.newsletter_subscribers TO authenticated;
GRANT INSERT ON public.donations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.short_courses, public.course_access, public.course_lessons TO authenticated;
GRANT SELECT ON public.short_courses TO anon;
GRANT ALL ON public.contact_messages, public.membership_applications, public.donations, public.newsletter_subscribers, public.short_courses, public.course_access, public.course_lessons TO service_role;
CREATE POLICY "Admins read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read memberships" ON public.membership_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update memberships" ON public.membership_applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read donations" ON public.donations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update donations" ON public.donations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Signed in donors submit" ON public.donations FOR INSERT TO authenticated WITH CHECK (status = 'pending');
CREATE POLICY "Admins read newsletter" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE OR REPLACE FUNCTION public.capture_order_snapshot() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  SELECT price, title INTO NEW.unit_price, NEW.book_title FROM public.books WHERE id = NEW.book_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Book not found'; END IF;
  IF NEW.quantity < 1 THEN RAISE EXCEPTION 'Quantity must be positive'; END IF;
  NEW.status := 'pending';
  RETURN NEW;
END; $$;
CREATE TRIGGER order_purchase_snapshot BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.capture_order_snapshot();
CREATE OR REPLACE FUNCTION public.protect_ordered_book() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.orders WHERE book_id = OLD.id) THEN RAISE EXCEPTION 'Book has existing orders; set stock to zero instead'; END IF;
  RETURN OLD;
END; $$;
CREATE TRIGGER protect_ordered_book BEFORE DELETE ON public.books FOR EACH ROW EXECUTE FUNCTION public.protect_ordered_book();