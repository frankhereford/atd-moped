-- Most recent migration: moped-database/migrations/1708979674782_demo-view-bot/up.sql

CREATE VIEW dad_joke AS SELECT
    'Did you hear about the mathematician who is afraid of negative numbers?'::text AS setup,
    'He will stop at nothing to avoid them.'::text AS punchline;
