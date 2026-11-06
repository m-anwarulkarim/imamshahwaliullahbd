ALTER TABLE public.short_courses ADD COLUMN IF NOT EXISTS monthly_fee numeric;
UPDATE public.short_courses SET monthly_fee = 500 WHERE monthly_fee IS NULL;
UPDATE public.short_courses SET fee = 1000 WHERE fee IS NULL;