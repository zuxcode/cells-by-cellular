insert into base_resources (name)
values
    ('Staff Management'),
    ('Roles & Permissions'),
    ('Organization Settings'),
    ('Financial Management'),
    ('Inventory Management'),
    ('Guest Check-in/Check-out'),
    ('Room & Booking Management'),
    ('Restaurant Orders'),
    ('Kitchen & Food Prep'),
    ('Event & Banquet Management'),
    ('Procurement & Suppliers'),
    ('HR & Payroll'),
    ('Security & Access Control'),
    ('Marketing & Promotions')
    ON CONFLICT (name) DO NOTHING;

insert into base_roles (role, description)
values
    ('Super Admin', 'Full system access'),
    ('General Manager', 'Organization-wide oversight'),
    ('Finance Manager', 'Financial operations'),
    ('IT Admin', 'Technical management'),
    (
        'Department Managers',
        'Department-specific control'
    ),
    ('Staff', 'Frontline operations')
    ON CONFLICT (role) DO NOTHING;

INSERT INTO base_permissions (resource_id, action)
SELECT
    r.id,
    e.enumlabel :: base_action_enum
FROM base_resources r
CROSS JOIN (
        SELECT
            enumlabel
        FROM pg_enum
        JOIN pg_type
            ON pg_type.oid = enumtypid
        WHERE
            pg_type.typname = 'base_action_enum'
    ) e
    ON CONFLICT (resource_id, action) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
WHERE
    r.role = 'Super Admin'
    AND p.action = 'manage'
    ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
JOIN base_resources rb
    ON p.resource_id = rb.id
WHERE
    r.role = 'General Manager'
    AND p.action = 'read'
    AND rb.name NOT IN (
        'Roles & Permissions',
        'Event & Banquet Management',
        'Staff Management'
    )
    ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
JOIN base_resources rb
    ON p.resource_id = rb.id
WHERE
    r.role = 'General Manager'
    AND p.action IN ('read', 'update')
    AND rb.name = 'Staff Management'
    ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
JOIN base_resources rb
    ON p.resource_id = rb.id
WHERE
    r.role = 'General Manager'
    AND p.action = 'manage'
    AND rb.name = 'Event & Banquet Management'
    ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
JOIN base_resources rb
    ON p.resource_id = rb.id
WHERE
    r.role = 'Finance Manager'
    AND p.action = 'manage'
    AND rb.name IN ('Financial Management', 'HR & Payroll')
    ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
JOIN base_resources rb
    ON p.resource_id = rb.id
WHERE
    r.role = 'Finance Manager'
    AND p.action = 'read'
    AND rb.name IN (
        'Inventory Management',
        'Procurement & Suppliers'
    )
    ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
JOIN base_resources rb
    ON p.resource_id = rb.id
WHERE
    r.role = 'IT Admin'
    AND p.action = 'manage'
    AND rb.name IN (
        'Staff Management',
        'Roles & Permissions',
        'Security & Access Control',
        'Organization Settings'
    )
    ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
JOIN base_resources rb
    ON p.resource_id = rb.id
WHERE
    r.role = 'Staff'
    AND p.action = 'manage'
    AND rb.name IN (
        'Guest Check-in/Check-out',
        'Room & Booking Management',
        'Restaurant Orders',
        'Kitchen & Food Prep',
        'Event & Banquet Management'
    )
    ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO base_role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM base_roles r
CROSS JOIN base_permissions p
JOIN base_resources rb
    ON p.resource_id = rb.id
WHERE
    r.role = 'Department Managers'
    AND p.action = 'manage'
    AND rb.name IN (
        'Staff Management',
        'Inventory Management',
        'Guest Check-in/Check-out',
        'Room & Booking Management',
        'Restaurant Orders',
        'Kitchen & Food Prep',
        'Event & Banquet Management',
        'Procurement & Suppliers',
        'HR & Payroll',
        'Marketing & Promotions'
    )
    ON CONFLICT (role_id, permission_id) DO NOTHING;