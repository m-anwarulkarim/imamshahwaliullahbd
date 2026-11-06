CREATE TABLE public.short_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title_en text NOT NULL, title_bn text NOT NULL, title_ar text NOT NULL,
  subtitle_en text, subtitle_bn text, subtitle_ar text,
  fee numeric,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.short_courses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.short_courses TO authenticated;
GRANT ALL ON public.short_courses TO service_role;
ALTER TABLE public.short_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published courses" ON public.short_courses FOR SELECT TO anon, authenticated USING (is_published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage courses" ON public.short_courses FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.course_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id uuid NOT NULL REFERENCES public.short_courses(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text NOT NULL,
  payment_method text NOT NULL,
  transaction_id text NOT NULL,
  amount numeric,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_access TO authenticated;
GRANT ALL ON public.course_access TO service_role;
ALTER TABLE public.course_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own access" ON public.course_access FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Users request access" ON public.course_access FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Users resubmit rejected" ON public.course_access FOR UPDATE TO authenticated USING (auth.uid() = user_id AND status = 'rejected') WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Admins update access" ON public.course_access FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete access" ON public.course_access FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.has_course_access(_course_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.course_access WHERE user_id = auth.uid() AND course_id = _course_id AND status = 'approved')
$$;

CREATE TABLE public.course_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.short_courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  kind text NOT NULL DEFAULT 'video',
  url text NOT NULL,
  scheduled_at timestamptz,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_lessons TO authenticated;
GRANT ALL ON public.course_lessons TO service_role;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved students read lessons" ON public.course_lessons FOR SELECT TO authenticated USING (public.has_course_access(course_id) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage lessons" ON public.course_lessons FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));