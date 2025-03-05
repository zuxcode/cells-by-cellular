CREATE TYPE phone_enum AS ENUM ('phone', 'telephone');

-- Create the ENUM type for services
CREATE TYPE service_enum AS ENUM (
    'hotel',
    'restaurant',
    'spa',
    'laundry',
    'event_management',
    'others'
);

-- Create the ENUM type for social media platforms
CREATE TYPE social_enum AS ENUM (
    'facebook',
    'instagram',
    'twitter',
    'linkedin',
    'youtube',
    'tiktok',
    'pinterest'
);

-- Create the tenants table
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id)
    ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create the services table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    primary_service BOOLEAN NOT NULL DEFAULT FALSE,
    service service_enum NOT NULL DEFAULT 'hotel',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    -- Ensure only one primary service per tenant
    UNIQUE (tenant_id)
    WHERE
        (primary_service = TRUE)
);

-- Create the tenant_contact table
CREATE TABLE IF NOT EXISTS tenant_contact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    type phone_enum NOT NULL DEFAULT 'phone',
    phone VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() CONSTRAINT unique_tenant_phone UNIQUE (tenant_id, phone, type)
);

-- Create the tenant_address table
CREATE TABLE IF NOT EXISTS tenant_address (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    country VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_address UNIQUE (tenant_id, country, state, city)
);

-- Create the tenant_biometrics table
CREATE TABLE IF NOT EXISTS tenant_biometrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    legal_entity VARCHAR(255) NOT NULL,
    reg_number VARCHAR(255) NOT NULL,
    tax_id VARCHAR(255) NOT NULL,
    number_of_employees SMALLINT NOT NULL DEFAULT 1 CHECK (
        number_of_employees BETWEEN 1
        AND 30
    ),
    avatar TEXT,
    -- Reference to the avatar file in Supabase Storage
    website VARCHAR(255),
    -- Added website here
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_reg_number UNIQUE (tenant_id, reg_number),
    CONSTRAINT unique_tenant_tax_id UNIQUE (tenant_id, tax_id),
    CONSTRAINT check_valid_avatar_url CHECK (website ~ '^https?:\/\/[^\s$.?#].[^\s]*$')
);

-- Create the tenant_social_media table
CREATE TABLE IF NOT EXISTS tenant_social_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    platform social_enum NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    -- Ensure unique platform per tenant
    CONSTRAINT unique_tenant_platform UNIQUE (tenant_id, platform),
    CONSTRAINT check_valid_url CHECK (url ~ '^https?:\/\/[^\s$.?#].[^\s]*$')
);

CREATE TABLE IF NOT EXISTS staffs(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id)
    ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_staffs UNIQUE (tenant_id, user_id)
);

-- Add indexes for tenant_id columns
CREATE INDEX idx_services_tenant_id
ON services (tenant_id);

CREATE INDEX idx_tenant_contact_tenant_id
ON tenant_contact (tenant_id);

CREATE INDEX idx_tenant_address_tenant_id
ON tenant_address (tenant_id);

CREATE INDEX idx_tenant_biometrics_tenant_id
ON tenant_biometrics (tenant_id);

CREATE INDEX idx_tenant_social_media_tenant_id
ON tenant_social_media (tenant_id);