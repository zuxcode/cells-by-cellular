INSERT INTO resources (name)
VALUES
    ('User Management'),
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