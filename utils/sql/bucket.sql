-- Enable storage extension
cREATE extension iF NOT EXISTS "wrappers" WITH schema "extensions";
cREATE extension iF NOT EXISTS "storage" WITH schema "storage";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Storage metadata table (auto-created by Supabase)
-- No need to create manually

-- Tenant storage config
-- Tenant storage configuration
CREATE TABLE IF NOT EXISTS tenant_storage (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id),
  bucket_name TEXT NOT NULL,
  root_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



