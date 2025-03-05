
-- Create the ENUM type for gender
CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');

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

-- Create the user_biometrics table
CREATE TABLE IF NOT EXISTS user_biometrics (
    user_id UUID PRIMARY KEY REFERENCES users(user_id)
    ON DELETE CASCADE,
    gender gender_enum,
    dob DATE NOT NULL,
    avatar_url TEXT,
    -- Reference to the avatar file in Supabase Storage
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
    user_id UUID PRIMARY KEY REFERENCES users(user_id)
    ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create the addresses table
CREATE TABLE IF NOT EXISTS addresses (
    user_id UUID PRIMARY KEY REFERENCES users(user_id)
    ON DELETE CASCADE,
    country VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    local_govt VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);