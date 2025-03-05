CREATE TYPE action_enum AS ENUM (
    -- Added for consistency with CRUD
    'create',
    'read',
    'update',
    'delete'
);

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(30) UNIQUE NOT NULL,
    description VARCHAR(100)
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
    operation_id UUID NOT NULL REFERENCES operations(id)
    ON DELETE CASCADE,
    resource_id UUID NOT NULL REFERENCES resources(id)
    ON DELETE CASCADE,
    UNIQUE (operation_id, resource_id)
);

CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id)
    ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id)
    ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_roles (
    staff_id UUID REFERENCES Staffs(id)
    ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id)
    ON DELETE CASCADE,
    PRIMARY KEY (staff_id, role_id)
);

CREATE TABLE role_hierarchy (
    ancestor_role_id UUID REFERENCES roles(id)
    ON DELETE CASCADE,
    descendant_role_id UUID REFERENCES roles(id)
    ON DELETE CASCADE,
    depth INT CHECK (depth >= 0),
    PRIMARY KEY (ancestor_role_id, descendant_role_id)
);

CREATE TABLE role_conflicts (
    role_id_1 UUID REFERENCES roles(id)
    ON DELETE CASCADE,
    role_id_2 UUID REFERENCES roles(id)
    ON DELETE CASCADE,
    PRIMARY KEY (role_id_1, role_id_2),
    CHECK (role_id_1 < role_id_2)
);

CREATE INDEX idx_role_permissions
ON role_permissions(role_id);

CREATE INDEX idx_user_roles
ON user_roles(user_id);

CREATE INDEX idx_permissions_operation_resource
ON permissions(operation_id, resource_id);

CREATE INDEX idx_role_hierarchy_descendant
ON role_hierarchy(descendant_role_id);

CREATE
OR REPLACE FUNCTION check_role_hierarchy_cycle() RETURNS TRIGGER AS $$ BEGIN IF EXISTS (
    SELECT
        1
    FROM role_hierarchy
    WHERE
        descendant_role_id = NEW.ancestor_role_id
        AND ancestor_role_id = NEW.descendant_role_id
)
    THEN RAISE EXCEPTION 'Cycle detected in role hierarchy';

END IF;

RETURN NEW;

END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_role_hierarchy_cycle BEFORE
INSERT
    OR
UPDATE
    ON role_hierarchy FOR EACH ROW EXECUTE FUNCTION check_role_hierarchy_cycle();

CREATE
OR REPLACE FUNCTION check_role_conflict() RETURNS TRIGGER AS $$ BEGIN IF EXISTS (
    SELECT
        1
    FROM role_conflicts
    WHERE
        (
            role_id_1 = NEW.role_id
            AND role_id_2 IN (
                SELECT
                    role_id
                FROM user_roles
                WHERE
                    user_id = NEW.user_id
            )
        )
        OR (
            role_id_2 = NEW.role_id
            AND role_id_1 IN (
                SELECT
                    role_id
                FROM user_roles
                WHERE
                    user_id = NEW.user_id
            )
        )
)
    THEN RAISE EXCEPTION 'Role conflict detected';

END IF;

RETURN NEW;

END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_roles_conflict BEFORE
INSERT
    OR
UPDATE
    ON user_roles FOR EACH ROW EXECUTE FUNCTION check_role_conflict();