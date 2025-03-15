[?25l
    Select a project:                                                                             
                                                                                                  
  >  1. lhzdvvcrabxwumfyrski [name: cells, org: szsuppzstxsthrsewolr, region: eu-west-2]          
    2. tnmuybjxosdtfjoumuav [name: dove, org: szsuppzstxsthrsewolr, region: eu-central-1]         
    3. zagkxmqtlmdwmeoendbt [name: obarmart-main, org: vcovfgonijdhmgxrbntv, region: eu-central-1]
    4. gosenjrmkbnmwpxxishw [name: Cells, org: vcovfgonijdhmgxrbntv, region: eu-west-2]           
    5. ivbtlbqhonegdgdrypmw [name: obarmart, org: vcovfgonijdhmgxrbntv, region: eu-central-1]     
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
                                                                                                  
    ↑/k up • ↓/j down • / filter • q quit • ? more                                                
                                                                                                  [0D[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[2K[1A[0D[2K [0D[2K[?25h[?1002l[?1003l[?1006l-- BASE ROLE BASE ACCESS CONTROL
-- LIMITED PERMISSION SCOPE
-- SHOULD ONLY BE USED TO SET UP
-- NEW TENANT

CREATE TYPE base_action_enum AS ENUM (
    'create',
    'read',
    'update',
    'delete',
    'manage'
);

CREATE TYPE base_role_enum AS ENUM (
    'Super Admin',
    'General Manager',
    'Finance Manager',
    'IT Admin',
    'Department Managers',
    'Staff'
);

CREATE TYPE base_resources_enum AS ENUM (
    'Staff Management',
    'Roles & Permissions',
    'Organization Settings',
    'Financial Management',
    'Inventory Management',
    'Guest Check-in/Check-out',
    'Room & Booking Management',
    'Restaurant Orders',
    'Kitchen & Food Prep',
    'Event & Banquet Management',
    'Procurement & Suppliers',
    'HR & Payroll',
    'Security & Access Control',
    'Marketing & Promotions'
);

CREATE TABLE IF NOT EXISTS base_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role base_role_enum UNIQUE NOT NULL,
    description VARCHAR(100) NOT NULL  
);

ALTER TABLE base_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY OWNER_SELECT_BASE_ROLES
ON base_roles 
FOR SELECT
    USING (
        EXISTS (
            SELECT 1
            FROM tenants
            WHERE owner_id = auth.uid()
        )
    );

CREATE TABLE IF NOT EXISTS base_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name base_resources_enum UNIQUE NOT NULL
);

ALTER TABLE base_resources ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS base_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action base_action_enum NOT NULL,
    resource_id UUID NOT NULL REFERENCES base_resources(id) ON DELETE CASCADE,
    CONSTRAINT unique_base_permissions UNIQUE (resource_id, action)
);

ALTER TABLE base_permissions ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS base_role_permissions (
    role_id UUID NOT NULL REFERENCES base_roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES base_permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);


ALTER TABLE base_role_permissions ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS base_staff_roles (
    staff_id UUID NOT NULL REFERENCES tenant_staffs(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES base_roles(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (staff_id, role_id, tenant_id)
);

ALTER TABLE base_staff_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY OWNER_FULL_BASE_STAFF_ROLES
ON base_staff_roles 
FOR ALL
    USING (
        EXISTS (
            SELECT 1
            FROM tenants
            WHERE owner_id = auth.uid()
        )
    );
