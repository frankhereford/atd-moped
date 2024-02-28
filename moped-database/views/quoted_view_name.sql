-- Most recent migration: moped-database/migrations/1709140182008_trigger-workflow/up.sql

CREATE OR REPLACE VIEW quoted_view_name AS SELECT 'austin'::text AS city;
