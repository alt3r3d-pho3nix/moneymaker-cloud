-- D1 schema update
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  age_group TEXT, -- 'kids', 'teen', 'adult'
  credits INTEGER DEFAULT 0,
  created_at INTEGER
);
