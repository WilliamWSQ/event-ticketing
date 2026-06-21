-- PULSE concert booking — schema. Idempotent: drops & recreates for clean resets.

DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS concerts CASCADE;
DROP TABLE IF EXISTS tiers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Catalogue ---------------------------------------------------------------
CREATE TABLE concerts (
  id         TEXT PRIMARY KEY,
  sort_order INTEGER NOT NULL DEFAULT 0,
  day        TEXT    NOT NULL,
  genre      TEXT    NOT NULL,
  price_from INTEGER NOT NULL CHECK (price_from >= 0),
  art        TEXT    NOT NULL,
  ru         JSONB   NOT NULL,   -- { artist, tour, venue, city, month, dateLong, time, lineup[] }
  en         JSONB   NOT NULL
);

CREATE TABLE tiers (
  id         TEXT PRIMARY KEY,   -- ga | gap | vip | cabana
  sort_order INTEGER NOT NULL DEFAULT 0,
  price      INTEGER NOT NULL CHECK (price >= 0),
  ru         JSONB   NOT NULL,   -- { name, desc, perks[] }
  en         JSONB   NOT NULL
);

-- Account -----------------------------------------------------------------
CREATE TABLE users (
  id          TEXT PRIMARY KEY,
  initials    TEXT    NOT NULL,
  email       TEXT    NOT NULL,
  name_ru     TEXT    NOT NULL,
  name_en     TEXT    NOT NULL,
  city_ru     TEXT    NOT NULL,
  city_en     TEXT    NOT NULL,
  stat_shows  INTEGER NOT NULL DEFAULT 0,
  stat_cities INTEGER NOT NULL DEFAULT 0,
  stat_hours  INTEGER NOT NULL DEFAULT 0
);

-- Orders / tickets --------------------------------------------------------
CREATE TABLE orders (
  id         TEXT PRIMARY KEY,                -- PLS-XXXX-26
  user_id    TEXT REFERENCES users(id) ON DELETE SET NULL,
  concert_id TEXT NOT NULL REFERENCES concerts(id) ON DELETE CASCADE,
  tier_id    TEXT NOT NULL REFERENCES tiers(id) ON DELETE CASCADE,
  qty        INTEGER NOT NULL CHECK (qty BETWEEN 1 AND 8),
  subtotal   INTEGER NOT NULL,
  fees       INTEGER NOT NULL,
  total      INTEGER NOT NULL,
  pay_method TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_concerts_genre ON concerts (genre);
CREATE INDEX idx_orders_user ON orders (user_id);
