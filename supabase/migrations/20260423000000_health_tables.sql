-- Health data tables for Salute di Ferro dashboard
-- Run via: npx supabase db push

-- Health measurements
CREATE TABLE IF NOT EXISTS public.health_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight REAL,
  height REAL,
  body_fat REAL,
  muscle_mass REAL,
  bmi REAL,
  body_water REAL,
  waist REAL,
  hips REAL,
  chest REAL,
  arms REAL,
  thigh REAL,
  calves REAL,
  systolic_bp REAL,
  diastolic_bp REAL,
  resting_hr REAL,
  oxygen_saturation REAL,
  hrv REAL,
  fasting_glucose REAL,
  post_meal_glucose REAL,
  ketones REAL,
  body_temp REAL,
  sleep_hours REAL,
  sleep_quality INTEGER,
  sleep_start TEXT,
  sleep_end TEXT,
  night_awakenings INTEGER,
  steps INTEGER,
  calories_burned INTEGER,
  activity_minutes INTEGER,
  distance_km REAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reminders
CREATE TABLE IF NOT EXISTS public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  type TEXT NOT NULL DEFAULT 'custom',
  status TEXT NOT NULL DEFAULT 'pending',
  notify_doctor BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Doctors directory
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  style TEXT NOT NULL,
  passions TEXT,
  price REAL NOT NULL,
  availability TEXT,
  rating REAL DEFAULT 0,
  reviews_count INTEGER DEFAULT 0
);

-- Access logs for GDPR audit
CREATE TABLE IF NOT EXISTS public.access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Documents / referti metadata
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  category TEXT,
  description TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.health_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS policies: users see only their own data
CREATE POLICY "Users can CRUD their own health_data"
  ON public.health_data FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD their own reminders"
  ON public.reminders FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD their own documents"
  ON public.documents FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can CRUD their own access_logs"
  ON public.access_logs FOR ALL
  USING (auth.uid() = user_id);

-- Doctors are public read
CREATE POLICY "Doctors are public readable"
  ON public.doctors FOR SELECT
  TO authenticated, anon
  USING (true);

-- Seed demo doctors
INSERT INTO public.doctors (id, name, specialization, style, passions, price, availability, rating, reviews_count)
VALUES
  (gen_random_uuid(), 'Andrea Militello', 'Endocrinologia', 'direct', 'powerlifting,bodybuilding', 150, 'Lun-Ven 9-18', 4.8, 42),
  (gen_random_uuid(), 'Gabriele Abate', 'Cardiologia', 'analytical', 'bodybuilding,TRT', 180, 'Mar-Gio 10-16', 4.9, 38),
  (gen_random_uuid(), 'Giovanni Rossini', 'Andrologia', 'empathetic', 'powerlifting', 120, 'Lun-Mer-Ven 9-13', 4.7, 27),
  (gen_random_uuid(), 'Roberto Vignando', 'Medicina dello Sport', 'direct', 'strongman,bodybuilding', 200, 'Mar-Gio 14-20', 5.0, 55)
ON CONFLICT DO NOTHING;
