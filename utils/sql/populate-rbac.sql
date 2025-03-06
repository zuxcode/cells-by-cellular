INSERT INTO resources (name)
VALUES
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
    ('Marketing & Promotions');

INSERT INTO roles (name, description)
VALUES
    ('Super Admin', 'Full system access'),
    (
        'General Manager',
        'Organization-wide oversight'
    ),
    ('Finance Manager', 'Financial operations'),
    ('IT Admin', 'Technical management'),
    (
        'Department Managers',
        'Department-specific control'
    ),
    ('Staff', 'Frontline operations');

INSERT INTO operations (action)
VALUES
    ('create'),
    ('read'),
    ('update'),
    ('delete');

-- INSERT PERMISSIONS FOR SUPER ADMIN
INSERT INTO permissions (operation_id, resource_id, owned_by)
VALUES
    (
        SELECT
            operations.id,
            resources.id
        FROM operations,
            resources
        WHERE
            action IN ('create', 'read', 'update', 'delete')
            AND name IN (
                'Staff Management',
                'Roles & Permissions',
                'Organization Settings',
                'Financial Management',
                'Inventory Management',
                'Room & Booking Management',
                'Restaurant Orders',
                'Event & Banquet Management',
                'Procurement & Suppliers',
                'HR & Payroll',
                'Security & Access Control',
                'Marketing & Promotions'
            ),
            'Super Admin'
    );

INSERT INTO role_permissions (role_id, permission_id)
VALUES
    (
        SELECT
            roles.id,
            permissions.id
        FROM roles,
            permissions
        WHERE
            name = 'Super Admin'
            AND owned_by = 'Super Admin'
    );

INSERT INTO staff_roles (staff_id, role_id)
VALUES
    (
        SELECT
            staffs.id,
            roles.id
        FROM staffs,
            roles
        WHERE
            roles.name = 'Super Admin'
    ),