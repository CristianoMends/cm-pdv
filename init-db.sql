DO $$
BEGIN
   IF NOT EXISTS (
      SELECT 1
      FROM pg_database
      WHERE datname = 'cm_pdv_db'
   ) THEN
      CREATE DATABASE cm_pdv_db;
   END IF;
END
$$;
