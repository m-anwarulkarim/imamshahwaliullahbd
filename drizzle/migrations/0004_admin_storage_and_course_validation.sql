CREATE POLICY "Admins upload institute files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('content-images', 'magazines') AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read institute files" ON storage.objects FOR SELECT TO authenticated USING (bucket_id IN ('content-images', 'magazines') AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public reads institute images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'content-images');
CREATE OR REPLACE FUNCTION public.validate_course_values() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.fee < 0 OR NEW.monthly_fee < 0 THEN RAISE EXCEPTION 'Course fees cannot be negative'; END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER validate_course_values BEFORE INSERT OR UPDATE ON public.short_courses FOR EACH ROW EXECUTE FUNCTION public.validate_course_values();
CREATE OR REPLACE FUNCTION public.validate_course_lesson() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.kind NOT IN ('video', 'live', 'sheet') OR NEW.url !~ '^https?://' THEN RAISE EXCEPTION 'Invalid lesson type or URL'; END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER validate_course_lesson BEFORE INSERT OR UPDATE ON public.course_lessons FOR EACH ROW EXECUTE FUNCTION public.validate_course_lesson();