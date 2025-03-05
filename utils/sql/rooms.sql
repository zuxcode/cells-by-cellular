CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id)
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
    bed_type bed_type_enum NOT NULL DEFAULT 'single',
    room_type room_type_enum NOT NULL DEFAULT 'single',
    size INT NOT NULL CHECK (size > 0),
    status room_status_enum NOT NULL DEFAULT 'commissioned',
    price NUMERIC NOT NULL CHECK (price >= 0),
    description VARCHAR(255),
    features JSONB,
    image_urls TEXT [] DEFAULT ARRAY [] :: TEXT [],
    created_at TIMESTAMP WITH ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH ZONE NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES staffs(id),
    updated_by UUID REFERENCES staffs(id),
    UNIQUE(tenant_id, number)
);

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
VALUES ('room_images', 'room_images', true);

-- Add bucket policy
CREATE POLICY "Room image access" ON storage.objects 
FOR ALL USING (bucket_id = 'room_images');

CREATE INDEX idx_room_images_room
ON room_images(room_id);

-- Add indexes
CREATE INDEX idx_rooms_tenant
ON rooms(tenant_id);

CREATE INDEX idx_rooms_service
ON rooms(service_id);

CREATE
OR REPLACE FUNCTION validate_hotel_service() RETURNS TRIGGER AS $ $ BEGIN IF NOT EXISTS (
    SELECT
        1
    FROM services
    WHERE
        id = NEW.service_id
        AND service = 'hotel'
        AND tenant_id = NEW.tenant_id -- Ensure service belongs to same tenant
)
    THEN RAISE EXCEPTION 'Service must be a hotel service owned by the tenant';

END IF;

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_hotel_service BEFORE
INSERT
    OR
UPDATE
    ON rooms FOR EACH ROW EXECUTE FUNCTION validate_hotel_service();