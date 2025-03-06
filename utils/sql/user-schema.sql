-- Enable the moddatetime extension for auto-updating timestamps
CREATE EXTENSION IF NOT EXISTS moddatetime;

-- Create the ENUM type for gender
CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id)
    ON DELETE CASCADE,
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

-- Create the normalized contacts table (1:N relationship)
CREATE TABLE IF NOT EXISTS contacts (
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

-- Auto-update trigger for contacts
CREATE TRIGGER contacts_updated BEFORE
UPDATE
    ON contacts FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- Create the addresses table (1:N relationship)
CREATE TABLE IF NOT EXISTS addresses (
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

-- Auto-update trigger for addresses
CREATE TRIGGER addresses_updated BEFORE
UPDATE
    ON addresses FOR EACH ROW EXECUTE PROCEDURE moddatetime(updated_at);

-- Create indexes for frequently queried fields
CREATE INDEX idx_contacts_user
ON contacts(user_id);

CREATE INDEX idx_addresses_user
ON addresses(user_id);

CREATE INDEX idx_biometrics_user
ON user_biometrics(user_id);


-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_biometrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Users Table Policies
CREATE POLICY "Public user profiles are viewable" ON users 
FOR SELECT USING (true);

CREATE POLICY "Anyone can create a profile" ON users 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own profile" ON users 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own profile" ON users 
FOR DELETE USING (user_id = auth.uid());

-- User Biometrics Table Policies
CREATE POLICY "Biometrics are public" ON user_biometrics 
FOR SELECT USING (true);

CREATE POLICY "Anyone can add biometrics" ON user_biometrics 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own biometrics" ON user_biometrics 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own biometrics" ON user_biometrics 
FOR DELETE USING (user_id = auth.uid());

-- Contacts Table Policies
CREATE POLICY "Contacts are public" ON contacts 
FOR SELECT USING (true);

CREATE POLICY "Anyone can add contacts" ON contacts 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own contacts" ON contacts 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own contacts" ON contacts 
FOR DELETE USING (user_id = auth.uid());

-- Addresses Table Policies
CREATE POLICY "Addresses are public" ON addresses 
FOR SELECT USING (true);

CREATE POLICY "Anyone can add addresses" ON addresses 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own addresses" ON addresses 
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own addresses" ON addresses 
FOR DELETE USING (user_id = auth.uid());