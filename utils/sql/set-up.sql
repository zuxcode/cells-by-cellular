CREATE OR REPLACE FUNCTION tenant_set_up()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    _tenant_id UUID;
    _service_id UUID;
    _role_id UUID;
    _staff_id UUID;
    _first_name VARCHAR(50);
BEGIN
    -- Get new user's details from the trigger
    _staff_id := NEW.user_id;
    _first_name := NEW.first_name;

    -- Create tenant
    INSERT INTO tenants (owner_id, name)
    VALUES (
        _staff_id, 
        CONCAT(
            _first_name, 
            '''s Organization'
        )
    )
    RETURNING id INTO _tenant_id;

    -- Create service
    INSERT INTO services (tenant_id, service, is_primary)
    VALUES (_tenant_id, 'hotel', true)
    RETURNING id INTO _service_id;

    -- Create staff member
    INSERT INTO staffs (tenant_id, user_id, is_owner)
    VALUES (_tenant_id, _staff_id, true)
    RETURNING id INTO _staff_id;  -- Now _staff_id contains the staff record's ID

    -- Get Super Admin role
    SELECT id INTO _role_id FROM roles WHERE name = 'Super Admin';
    
    -- Assign role to staff
    INSERT INTO staff_roles (staff_id, role_id, assigned_by, tenant_id)
    VALUES (
        _staff_id,
        _role_id,
        _staff_id,  -- Using the new staff's ID as the assigner
        _tenant_id
    );

    RETURN NEW;
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Tenant setup failed: %', SQLERRM;
END;
$$;

-- Trigger setup
CREATE OR REPLACE TRIGGER tenant_set_up_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION tenant_set_up();