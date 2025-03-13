CREATE OR REPLACE FUNCTION create_tenant_and_related (
  p_first_name TEXT,
  p_middle_name TEXT,  
  p_last_name TEXT,
  p_tenant_name TEXT
) RETURNS TABLE (staff_id UUID, role_id UUID, tenant_id UUID) AS  $$
DECLARE
  v_user_id UUID := auth.uuid();  -- Single UUID for all user references
  v_tenant_id UUID;
  v_staff_id UUID;
  v_role_id UUID;
BEGIN
  -- Insert user profile
  INSERT INTO users (user_id, first_name, middle_name, last_name)
  VALUES (
    v_user_id, 
    p_first_name, 
    NULLIF(TRIM(p_middle_name), ''), 
    p_last_name
  );

  -- Create tenant organization
  INSERT INTO tenants (name, owner_id)
  VALUES (p_tenant_name, v_user_id)
  RETURNING id INTO v_tenant_id;

  INSERT INTO tenant_services (tenant_id, service, is_primary)
  VALUES (v_tenant_id, 'hotel', TRUE);

  -- Link user to tenant as staff
  INSERT INTO staffs (tenant_id, user_id)
  VALUES (v_tenant_id, v_user_id)
  RETURNING id INTO v_staff_id;

  -- Assign Super Admin role
  SELECT id INTO v_role_id 
  FROM base_roles 
  WHERE role = 'Super Admin'
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Required system role "Super Admin" not found';
  END IF;

  INSERT INTO base_staff_roles (staff_id, role_id, tenant_id)
  VALUES (v_staff_id, v_role_id, v_tenant_id);

  RETURN QUERY SELECT v_staff_id, v_role_id, v_tenant_id;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Tenant creation failed: % (SQLSTATE: %)', 
                    SQLERRM, SQLSTATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;