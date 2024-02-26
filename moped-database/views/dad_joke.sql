-- Most recent migration: moped-database/migrations/1708736794007_demo-view-bot/up.sql

CREATE VIEW dad_joke AS SELECT
    'Why did the scarecrow win an award?'::text AS setup,
    'Because he was outstanding in his field!!'::text AS punchline;
