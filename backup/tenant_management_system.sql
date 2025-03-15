[?25l
    Select a project:                                                                             
                                                                                                  
  >  1. lhzdvvcrabxwumfyrski [name: cells, org: szsuppzstxsthrsewolr, region: eu-west-2]          
    2. tnmuybjxosdtfjoumuav [name: dove, org: szsuppzstxsthrsewolr, region: eu-central-1]         
    3. zagkxmqtlmdwmeoendbt [name: obarmart-main, org: vcovfgonijdhmgxrbntv, region: eu-central-1]
    4. gosenjrmkbnmwpxxishw [name: Cells, org: vcovfgonijdhmgxrbntv, region: eu-west-2]           
    5. ivbtlbqhonegdgdrypmw [name: obarmart, org: vcovfgonijdhmgxrbntv, region: eu-central-1]     
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
    ↑/k up • ↓/j down • / filter • q quit • ? more                                                
                                                                                                  [0D[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[0D[2K [0D[2K[?25h[?1002l[?1003l[?1006l-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the ENUM type for services
CREATE TYPE service_enum AS ENUM (
    'hotel',
    'restaurant',
    'spa',
    'laundry',
    'event_management',
    'tour_operator',
    'transport',
    'other'
);

CREATE TYPE phone_enum AS ENUM ('phone', 'telephone');

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

-- Create tenants table with security
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID DEFAULT auth.uid() 
        REFERENCES auth.users(id) ON DELETE CASCADE,
    is_public BOOLEAN DEFAULT TRUE,
    name VARCHAR(255) NOT NULL CHECK (length(name) >= 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update trigger
CREATE OR REPLACE TRIGGER tenants_updated BEFORE
UPDATE
    ON tenants FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- RLS Policies for Tenants
ALTER 
TABLE tenants 
ENABLE ROW LEVEL SECURITY;

CREATE POLICY PUBLICLY_ACCESS_TENANT_PERMISSION
ON tenants
FOR SELECT
TO public -- Applies to all users (including unauthenticated)
USING (is_public = TRUE);

CREATE POLICY OWNER_ACCESS_TENANT_PERMISSION
ON tenants
FOR ALL
TO authenticated -- Applies to logged-in users
USING (owner_id = auth.uid());

-- tenant_services table
CREATE TABLE IF NOT EXISTS tenant_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    service service_enum NOT NULL DEFAULT 'hotel',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX unique_tenant_primary_service ON tenant_services (tenant_id) 
WHERE is_primary = true;

-- Auto-update trigger
CREATE OR REPLACE TRIGGER tenants_updated BEFORE
UPDATE
    ON tenant_services FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- tenant_services RLS Policies
ALTER TABLE
    tenant_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY PUBLICLY_ACCESS_TENANT_SERVICE
ON tenant_services 
FOR SELECT
    USING (
        EXISTS(
            SELECT 1 FROM tenants
            WHERE is_public = TRUE
        )
    );

CREATE POLICY OWNER_ACCESS_TENANT_SERVICE_PERMISSION
ON tenant_services 
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM tenants 
        WHERE owner_id = auth.uid()
    )
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
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_phone UNIQUE (tenant_id, phone, type)
);

-- Contact RLS Policies
ALTER TABLE tenant_contact ENABLE ROW LEVEL SECURITY;

CREATE POLICY PUBLICLY_ACCESS_TENANT_CONTACT
ON tenant_contact 
FOR SELECT
    USING (
        EXISTS(
            SELECT 1 FROM tenants
            WHERE is_public = TRUE
        )
    );


CREATE POLICY OWNER_ACCESS_TENANT_CONTACT_PERMISSION
ON tenant_contact 
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM tenants 
        WHERE owner_id = auth.uid()
    )
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


-- Address RLS Policies
ALTER TABLE tenant_address ENABLE ROW LEVEL SECURITY;

CREATE POLICY PUBLICLY_ACCESS_TENANT_ADDRESS
ON tenant_address 
FOR SELECT
    USING (
        EXISTS(
            SELECT 1 FROM tenants
            WHERE is_public = TRUE
        )
    );

CREATE POLICY OWNER_ACCESS_TENANT_ADDRESS_PERMISSION
ON tenant_address 
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM tenants 
        WHERE owner_id = auth.uid()
    )
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

ALTER TABLE tenant_biometrics ENABLE ROW LEVEL SECURITY;


CREATE POLICY OWNER_ACCESS_TENANT_BIOMETRICS_PERMISSION
ON tenant_biometrics 
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM tenants 
        WHERE owner_id = auth.uid()
    )
);

CREATE POLICY PUBLICLY_ACCESS_TENANT_BIOMETRICS
ON tenant_biometrics 
FOR SELECT
    USING (
        EXISTS(
            SELECT 1 FROM tenants
            WHERE is_public = TRUE
        )
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

ALTER TABLE tenant_social_media ENABLE ROW LEVEL SECURITY;


CREATE POLICY OWNER_ACCESS_TENANT_SOCIAL_MEDIA_PERMISSION
ON tenant_social_media 
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM tenants 
        WHERE owner_id = auth.uid()
    )
);

CREATE POLICY PUBLICLY_ACCESS_TENANT_SOCIAL_MEDIA
ON tenant_social_media 
FOR SELECT
    USING (
        EXISTS(
            SELECT 1 FROM tenants
            WHERE is_public = TRUE
        )
    );


-- TENANT STAFF IS A PRIVATE TABLE
-- CAN ONLY BE ACCESS BY TANENT OWNER 
-- STAFF WITH USER MANAGEMENT PERMISION
CREATE TABLE IF NOT EXISTS tenant_staffs(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id)
    ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_tenant_staffs UNIQUE (tenant_id, user_id)
);

ALTER TABLE tenant_staffs ENABLE ROW LEVEL SECURITY;


CREATE POLICY OWNER_ACCESS_TENANT_STAFF_PERMISSION
ON tenant_staffs 
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM tenants 
        WHERE owner_id = auth.uid()
    )
);

-- Add indexes for tenant_id columns
CREATE INDEX idx_tenant_services_tenant_id
ON tenant_services (tenant_id);

CREATE INDEX idx_tenant_contact_tenant_id
ON tenant_contact (tenant_id);

CREATE INDEX idx_tenant_address_tenant_id
ON tenant_address (tenant_id);

CREATE INDEX idx_tenant_biometrics_tenant_id
ON tenant_biometrics (tenant_id);

CREATE INDEX idx_tenant_social_media_tenant_id
ON tenant_social_media (tenant_id);
