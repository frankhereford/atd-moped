ALTER TABLE moped_proj_funding RENAME COLUMN date_added TO created_at;
ALTER TABLE moped_proj_funding RENAME COLUMN added_by TO created_by_user_id;

ALTER TABLE moped_proj_funding ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE moped_proj_funding ADD COLUMN updated_by_user_id INTEGER;
