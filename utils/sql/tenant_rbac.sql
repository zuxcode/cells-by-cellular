CREATE TABLE IF NOT EXISTS tenant_base_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(100) NOT NULL,
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    staff_id UUID REFERENCES staffs(id)
    ON DELETE
    SET
        NULL
);

ALTER TABLE
    tenant_base_roles ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID REFERENCES tenant_base_roles(id),
);

ALTER TABLE
    roles ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS tenant_base_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    tenant_id UUID NOT NULL REFERENCES tenants(id)
    ON DELETE CASCADE,
    staff_id UUID REFERENCES staffs(id)
    ON DELETE
    SET
        NULL
);