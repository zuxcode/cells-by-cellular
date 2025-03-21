CREATE TYPE action_enum AS ENUM (
    'create',
    'read',
    'update',
    'delete',
    'manage'
);

CREATE TYPE role_enum AS ENUM (
    'Super Admin',
    'General Manager',
    'Finance Manager',
    'IT Admin',
    'Department Managers',
    'Staff'
);

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name role_enum NOT NULL,
    description VARCHAR(100) NOT NULL,
    CONSTRAINT unique_role UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action action_enum NOT NULL,
    CONSTRAINT unique_action UNIQUE (action)
);

CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    CONSTRAINT unique_name UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operation_id UUID NOT NULL REFERENCES operations(id),
    resource_id UUID NOT NULL REFERENCES resources(id),
    owned_by role_enum REFERENCES roles(name),
    CONSTRAINT unique_permission UNIQUE (resource_id, operation_id, owned_by)
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id),
    permission_id UUID NOT NULL REFERENCES permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

-- Staff-Role assignment with temporal support
CREATE TABLE IF NOT EXISTS staff_roles (
    staff_id UUID NOT NULL REFERENCES staffs(id)
    ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id)
    ON DELETE CASCADE,
    assigned_by UUID REFERENCES staffs(id)
    ON DELETE
    SET
        NULL,
        tenant_id UUID NOT NULL REFERENCES tenants(id)
        ON DELETE CASCADE,
        assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        valid_until TIMESTAMPTZ,
        PRIMARY KEY (staff_id, role_id, tenant_id)
);

-- Indexes for performance
CREATE INDEX idx_role_weight
ON roles(weight);

CREATE INDEX idx_permission_resource
ON permissions(resource_id);

CREATE INDEX idx_staff_role_temporal
ON staff_roles(staff_id, valid_until);

-- RLS Policies
ALTER TABLE
    roles ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    permissions ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    role_permissions ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    staff_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies 
CREATE POLICY "Permissions ALL to Super Admin"
ON roles FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM tenants
            WHERE
                owner_id = auth.uid()
        )
    );