CREATE TYPE action_enum AS ENUM (
    'create',
    'read',
    'update',
    'delete',
    'manage'
);

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name role_enum NOT NULL,
    description VARCHAR(100) NOT NULL,
    weight INT NOT NULL CHECK (
        weight BETWEEN 1
        AND 10
    ),
    parent_id UUID REFERENCES roles(id)
    ON DELETE
    SET
        NULL
);

CREATE TABLE IF NOT EXISTS operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action action_enum NOT NULL
);

CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operation_id UUID NOT NULL REFERENCES operations(id),
    resource_id UUID NOT NULL REFERENCES resources(id),
    -- owned_by role_enum REFERENCES roles(name),
    CONSTRAINT unique_permission UNIQUE (resource_id, operation_id)
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id),
    permission_id UUID NOT NULL REFERENCES permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

-- Staff-Role assignment with temporal support
CREATE TABLE IF NOT EXISTS staff_roles (
    staff_id UUID NOT NULL REFERENCES staffs(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by UUID NOT NULL REFERENCES staffs(id),
    -- 
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    -- 
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
CREATE POLICY "Permissions INSERT by admins"
ON roles FOR
INSERT
    WITH CHECK (
        (
            SELECT
                1
            FROM tenants
            WHERE
                owner_id = auth.uid()
        )
    );