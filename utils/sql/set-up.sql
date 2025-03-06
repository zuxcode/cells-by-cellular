-- Main trigger function that coordinates the setup
CREATE OR REPLACE FUNCTION tenant_set_up()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    _tenant_id UUID;
    _service_id UUID;
BEGIN
    -- Create tenant
    INSERT INTO tenants (owner_id, name)
    VALUES (NEW.id, CONCAT(SPLIT_PART(NEW.raw_user_meta_data->>'full_name', ' ', 1), '''s Organization'))
    RETURNING id INTO _tenant_id;

    -- Create service
    INSERT INTO services (tenant_id, service, is_primary)
    VALUES (_tenant_id, 'hotel', true)
    RETURNING id INTO _service_id;

    -- Create staff member
    INSERT INTO staffs (tenant_id, user_id, is_owner)
    VALUES (_tenant_id, NEW.id, true);

    -- CREATE ROLE
    SELECT 1 AS role_id FROM roles WHERE name = 'Super Admin';
    INSERT INTO staff_roles (staff_id, role_id, assigned_by, tenant_id) 
    VALUES(NEW.id, role_id, user_id, _tenant_id)

    RETURN NEW;
EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'Tenant setup failed: %', SQLERRM;
END;
$$;

-- Trigger setup
CREATE TRIGGER tenant_set_up_trigger
AFTER INSERT ON auth.users  -- Assuming you're using Supabase's auth.users table
FOR EACH ROW
EXECUTE FUNCTION tenant_set_up();