-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2026-03-04T16:46:29.303Z

CREATE TABLE "users" (
  "username" varchar PRIMARY KEY,
  "hashed_password" varchar NOT NULL,
  "full_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "is_email_verified" bool NOT NULL DEFAULT false,
  "password_changed_at" timestamptz NOT NULL DEFAULT (0001-01-01 00:00:00Z),
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY,
  "username" varchar NOT NULL,
  "refresh_token" varchar NOT NULL,
  "user_agent" varchar NOT NULL,
  "client_ip" varchar NOT NULL,
  "is_blocked" bool NOT NULL DEFAULT false,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "trackers" (
  "id" uuid PRIMARY KEY,
  "username" varchar NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "boards" (
  "id" uuid PRIMARY KEY,
  "tracker_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "columns" (
  "id" uuid PRIMARY KEY,
  "board_id" uuid NOT NULL,
  "name" varchar(100) NOT NULL,
  "position" int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "habits" (
  "id" uuid PRIMARY KEY,
  "column_id" uuid NOT NULL,
  "name" varchar NOT NULL,
  "status" varchar NOT NULL,
  "frequency" int[] NOT NULL,
  "time_spent" varchar,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "habit_entry" (
  "id" uuid PRIMARY KEY,
  "habit_id" uuid NOT NULL,
  "date" date NOT NULL,
  "completed" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE UNIQUE INDEX ON "boards" ("tracker_id");

CREATE INDEX ON "columns" ("board_id", "position");

CREATE INDEX ON "habits" ("column_id");

ALTER TABLE "sessions" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "trackers" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "boards" ADD FOREIGN KEY ("tracker_id") REFERENCES "trackers" ("id");

ALTER TABLE "columns" ADD FOREIGN KEY ("board_id") REFERENCES "boards" ("id");

ALTER TABLE "habits" ADD FOREIGN KEY ("column_id") REFERENCES "columns" ("id");

ALTER TABLE "habit_entry" ADD FOREIGN KEY ("habit_id") REFERENCES "habits" ("id");
