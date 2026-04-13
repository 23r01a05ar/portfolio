-- ============================================================
-- VALLABHA PORTFOLIO — SUPABASE SETUP
-- Run this entire file in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- 1. TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- PUBLIC: anyone can read
CREATE POLICY "Public can read stories"
  ON stories FOR SELECT USING (true);

CREATE POLICY "Public can read gallery"
  ON gallery FOR SELECT USING (true);

CREATE POLICY "Public can read certificates"
  ON certificates FOR SELECT USING (true);

-- ADMIN ONLY: authenticated user can insert/update/delete
CREATE POLICY "Admin can insert stories"
  ON stories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can update stories"
  ON stories FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete stories"
  ON stories FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can insert gallery"
  ON gallery FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete gallery"
  ON gallery FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can insert certificates"
  ON certificates FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can update certificates"
  ON certificates FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete certificates"
  ON certificates FOR DELETE USING (auth.uid() IS NOT NULL);

-- 3. STORAGE BUCKETS
-- ============================================================
-- NOTE: Run these one at a time if they fail together.
-- Or create them manually in Dashboard → Storage → New Bucket

INSERT INTO storage.buckets (id, name, public)
VALUES ('stories', 'stories', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies (public read, auth write)
CREATE POLICY "Public read stories storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'stories');

CREATE POLICY "Admin upload stories storage"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'stories' AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Admin delete stories storage"
  ON storage.objects FOR DELETE USING (
    bucket_id = 'stories' AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Public read gallery storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Admin upload gallery storage"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'gallery' AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Admin delete gallery storage"
  ON storage.objects FOR DELETE USING (
    bucket_id = 'gallery' AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Public read certificates storage"
  ON storage.objects FOR SELECT USING (bucket_id = 'certificates');

CREATE POLICY "Admin upload certificates storage"
  ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'certificates' AND auth.uid() IS NOT NULL
  );

-- 4. TRIGGER: auto-update updated_at for stories
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_stories_updated_at
  BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
