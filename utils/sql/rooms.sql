CREATE TYPE room_status_enum AS ENUM ('commissioned', 'not_commissioned');

CREATE TABLE IF NOT EXISTS hotel_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES tenant_services(id)
    ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    guest_max SMALLINT NOT NULL DEFAULT 2 CHECK (
        guest_max BETWEEN 1
        AND 30
    ),
    bed_max SMALLINT NOT NULL DEFAULT 2 CHECK (
        bed_max BETWEEN 1
        AND 30
    ),
    bed_type VARCHAR(50),
    room_type VARCHAR(50),
    size INT NOT NULL CHECK (size > 0),
    status room_status_enum NOT NULL DEFAULT 'commissioned',
    price NUMERIC NOT NULL CHECK (price >= 0),
    description VARCHAR(255),
    features JSONB,
    image_urls TEXT [] DEFAULT ARRAY [] :: TEXT [],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES tenant_staffs(id),
    updated_by UUID REFERENCES tenant_staffs(id),
    -- CONSTRAINT room_unique UNIQUE (name, number, tenant_id)
);

ALTER TABLE
    hotel_rooms ENABLE ROW LEVEL SECURITY;

CREATE TABLE room_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(id)
    ON DELETE CASCADE,
    path TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH ZONE NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES staffs(id),
);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES
    ('room_images', 'room_images', true);

-- Add bucket policy
CREATE POLICY "Room image access"
ON storage.objects FOR ALL
USING (bucket_id = 'room_images');

CREATE INDEX idx_room_images_room
ON room_images(room_id);

-- Add indexes
CREATE INDEX idx_rooms_tenant
ON rooms(tenant_id);

CREATE INDEX idx_rooms_service
ON rooms(service_id);

-- Create a function to create a tenant and related entities
-- CREATE OR REPLACE FUNCTION create_hotel_room (
--   name TEXT,
--   description TEXT,  
--   features JSONB,
--   bed_type TEXT,
--   room_type TEXT,
--   bed_max SMALLINT,
--   guest_max SMALLINT,
--   size SMALLINT,
--   status room_status_enum,
--   price NUMERIC,
--   number INT
--   image_urls TEXT []
-- ) RETURNS VOID AS $$
-- DECLARE
--   tenant_id UUID;
--   staff_id UUID;
--   service_id UUID;
-- BEGIN
--   -- Insert user profile with NULL handling
--   INSERT INTO hotel_rooms (name, description, features, bed_type, room_type, bed_max, guest_max, size, status, price, number, image_urls)
--   VALUES (name, description, features, bed_type, room_type, bed_max, guest_max, size, status, price, number, image_urls);
--   -- Create tenant organization
--   INSERT INTO tenants (name, owner_id)
--   VALUES (p_tenant_name, p_user_id)
--   RETURNING id INTO v_tenant_id;
--   -- Add default service
--   INSERT INTO tenant_services (tenant_id, service, is_primary)
--   VALUES (v_tenant_id, 'hotel', true);
--   -- Create staff profile
--   INSERT INTO staffs (tenant_id, user_id)
--   VALUES (v_tenant_id, p_user_id)
--   RETURNING id INTO v_staff_id;
--   -- Get Super Admin role with proper check
--   SELECT id INTO v_role_id 
--   FROM base_roles 
--   WHERE role = 'Super Admin';
--  IF v_role_id IS NULL THEN
--   RAISE EXCEPTION 'Required Super Admin role not found';
-- END IF;
--   -- Assign staff role
--   INSERT INTO base_staff_roles (staff_id, role_id, tenant_id)
--   VALUES (v_staff_id, v_role_id, v_tenant_id);
-- END;
-- $$ LANGUAGE plpgsql;