/*
# Create projects, contact_submissions tables for IT Nation website

1. New Tables
- `projects` — portfolio projects with bilingual content, category, images, scope of work
  - id (uuid, PK)
  - title_en (text)
  - title_ar (text)
  - slug (text, unique)
  - category (text) — cctv, networking, cybersecurity, fire-alarm, access-control, intercom, pa-systems, fiber-optics, it-support
  - client_type_en (text) — e.g. "Commercial Tower", "Retail Chain"
  - client_type_ar (text)
  - location_en (text)
  - location_ar (text)
  - year (int)
  - description_en (text)
  - description_ar (text)
  - scope_en (text[]) — array of scope-of-work bullet points
  - scope_ar (text[])
  - images (text[]) — array of image URLs
  - featured (boolean, default false)
  - published (boolean, default true)
  - created_at (timestamptz)

- `contact_submissions` — form submissions for quotations, site surveys, maintenance contracts
  - id (uuid, PK)
  - form_type (text) — quotation, site-survey, maintenance
  - name (text)
  - email (text)
  - phone (text)
  - company (text)
  - service (text)
  - message (text)
  - created_at (timestamptz)

2. Security
- Projects: public read (anon, authenticated), no public write — admin-only via dashboard
- Contact submissions: public insert (anyone can submit), no public read (admin-only)
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  client_type_en text,
  client_type_ar text,
  location_en text,
  location_ar text,
  year int,
  description_en text NOT NULL,
  description_ar text NOT NULL,
  scope_en text[] DEFAULT '{}',
  scope_ar text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_projects" ON projects;
CREATE POLICY "public_read_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_projects" ON projects;
CREATE POLICY "auth_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_projects" ON projects;
CREATE POLICY "auth_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_projects" ON projects;
CREATE POLICY "auth_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_submissions" ON contact_submissions;
CREATE POLICY "public_insert_submissions" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_submissions" ON contact_submissions;
CREATE POLICY "auth_read_submissions" ON contact_submissions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_delete_submissions" ON contact_submissions;
CREATE POLICY "auth_delete_submissions" ON contact_submissions FOR DELETE
  TO authenticated USING (true);
