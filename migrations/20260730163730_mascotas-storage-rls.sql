-- RLS for the "mascotas" storage bucket: public read (QR scanners without a
-- session need to see the photo), owner-only write/update/delete.
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY mascotas_objects_public_read ON storage.objects
  FOR SELECT TO authenticated, anon
  USING (bucket = 'mascotas');

CREATE POLICY mascotas_objects_owner_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket = 'mascotas' AND uploaded_by = (SELECT auth.jwt() ->> 'sub'));

CREATE POLICY mascotas_objects_owner_update ON storage.objects
  FOR UPDATE TO authenticated
  USING      (bucket = 'mascotas' AND uploaded_by = (SELECT auth.jwt() ->> 'sub'))
  WITH CHECK (bucket = 'mascotas' AND uploaded_by = (SELECT auth.jwt() ->> 'sub'));

CREATE POLICY mascotas_objects_owner_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket = 'mascotas' AND uploaded_by = (SELECT auth.jwt() ->> 'sub'));

GRANT SELECT ON storage.objects TO anon;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON storage.objects TO authenticated;
GRANT USAGE ON SCHEMA storage TO authenticated;
