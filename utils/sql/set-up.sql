-- Create a function to create a tenant and related entities
CREATE OR REPLACE FUNCTION create_tenant_and_related (
  p_user_id UUID,
  p_first_name TEXT,
  p_middle_name TEXT,  
  p_last_name TEXT,
  p_tenant_name TEXT
) RETURNS VOID AS $$
DECLARE
  v_tenant_id UUID;
  v_staff_id UUID;
  v_role_id UUID;
BEGIN
  -- Insert user profile with NULL handling
  INSERT INTO users (first_name, middle_name, last_name, user_id)
  VALUES (p_first_name, NULLIF(TRIM(p_middle_name), ''), p_last_name, p_user_id);

  -- Create tenant organization
  INSERT INTO tenants (name, owner_id)
  VALUES (p_tenant_name, p_user_id)
  RETURNING id INTO v_tenant_id;

  -- Add default service
  INSERT INTO services (tenant_id, service, is_primary)
  VALUES (v_tenant_id, 'hotel', true);

  -- Create staff profile
  INSERT INTO staffs (tenant_id, user_id)
  VALUES (v_tenant_id, p_user_id)
  RETURNING id INTO v_staff_id;

  -- Get Super Admin role with proper check
  SELECT id INTO v_role_id 
  FROM base_roles 
  WHERE role = 'Super Admin';
  
 IF v_role_id IS NULL THEN
  RAISE EXCEPTION 'Required Super Admin role not found';
END IF;

  -- Assign staff role
  INSERT INTO base_staff_roles (staff_id, role_id, tenant_id)
  VALUES (v_staff_id, v_role_id, v_tenant_id);
END;
$$ LANGUAGE plpgsql;