-- Tabla de mascotas registradas con su código QR
CREATE TABLE mascotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_mascota TEXT NOT NULL,
  especie TEXT NOT NULL DEFAULT 'Perro' CHECK (especie IN ('Perro', 'Gato')),
  nombre_dueno TEXT NOT NULL,
  telefono TEXT NOT NULL,
  foto_url TEXT,
  foto_key TEXT,
  qr_texto TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE mascotas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_insert_own_mascotas" ON mascotas
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_can_read_own_mascotas" ON mascotas
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "users_can_update_own_mascotas" ON mascotas
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_can_delete_own_mascotas" ON mascotas
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON mascotas TO authenticated;

CREATE TRIGGER mascotas_updated_at
  BEFORE UPDATE ON mascotas
  FOR EACH ROW
  EXECUTE FUNCTION system.update_updated_at();
