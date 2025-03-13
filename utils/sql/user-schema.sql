-- Enable the moddatetime extension for auto-updating timestamps
CREATE EXTENSION IF NOT EXISTS moddatetime;

-- Create the ENUM type for gender
CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id)
    ON DELETE CASCADE DEFAULT auth.uuid(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Auto-update trigger for users
CREATE TRIGGER users_updated BEFORE
UPDATE
    ON users FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- Create the user_biometrics table
CREATE TABLE IF NOT EXISTS user_biometrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id)
    ON DELETE CASCADE,
    gender gender_enum,
    dob DATE NOT NULL CHECK (dob <= CURRENT_DATE),
    avatar_url TEXT CHECK (avatar_url ~ '^https?://.*'),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Auto-update trigger for biometrics
CREATE TRIGGER biometrics_updated BEFORE
UPDATE
    ON user_biometrics FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- Create the normalized user contacts table (1:N relationship)
CREATE TABLE IF NOT EXISTS user_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id)
    ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Auto-update trigger for user contacts
CREATE TRIGGER user_contacts_updated BEFORE
UPDATE
    ON user_contacts FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- Create the user_addresses table (1:N relationship)
CREATE TABLE IF NOT EXISTS user_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id)
    ON DELETE CASCADE,
    country VARCHAR(150) NOT NULL,
    state VARCHAR(150) NOT NULL,
    city VARCHAR(150) NOT NULL,
    local_govt VARCHAR(150) NOT NULL,
    street_address TEXT,
    postal_code VARCHAR(50),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Auto-update trigger for user_addresses
CREATE TRIGGER user_addresses_updated BEFORE
UPDATE
    ON user_addresses FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- Create indexes for frequently queried fields
CREATE INDEX idx_users
ON users(user_id);

CREATE INDEX idx_user_contacts_user
ON user_contacts(user_id);

CREATE INDEX idx_user_addresses_user
ON user_addresses(user_id);

CREATE INDEX idx_biometrics_user
ON user_biometrics(user_id);

-- Enable RLS on all tables
ALTER TABLE
    users ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    user_biometrics ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    user_contacts ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    user_addresses ENABLE ROW LEVEL SECURITY;

-- Users Table Policies
CREATE POLICY "Public user profiles are viewable"
ON users FOR
SELECT
    USING (true);

CREATE POLICY "Anyone can create a profile"
ON users FOR
INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update own profile"
ON users FOR
UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete own profile"
ON users FOR DELETE
USING (user_id = auth.uid());

-- User Biometrics Table Policies
CREATE POLICY "Biometrics are public"
ON user_biometrics FOR
SELECT
    USING (true);

CREATE POLICY "Users can insert their own biometrics"
ON user_biometrics FOR
INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own biometrics"
ON user_biometrics FOR
UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete own biometrics"
ON user_biometrics FOR DELETE
USING (user_id = auth.uid());

-- user_contacts Table Policies
CREATE POLICY "user_contacts are public"
ON user_contacts FOR
SELECT
    USING (true);

CREATE POLICY "users can insert their own user_contacts"
ON user_contacts FOR
INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own user_contacts"
ON user_contacts FOR
UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete own user_contacts"
ON user_contacts FOR DELETE
USING (user_id = auth.uid());

-- user_addresses Table Policies
CREATE POLICY "user_addresses are public"
ON user_addresses FOR
SELECT
    USING (true);

CREATE POLICY "users can add their own user_addresses"
ON user_addresses FOR
INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own user_addresses"
ON user_addresses FOR
UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete own user_addresses"
ON user_addresses FOR DELETE
USING (user_id = auth.uid());