-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2026-02-18T19:56:15.575Z

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
  "modified_at" timestamptz NOT NULL DEFAULT (now()),
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "habits" (
  "id" uuid PRIMARY KEY,
  "tracker_id" uuid NOT NULL,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL,
  "status" varchar NOT NULL,
  "modified_at" timestamptz NOT NULL DEFAULT (now()),
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

ALTER TABLE "sessions" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "trackers" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "habits" ADD FOREIGN KEY ("tracker_id") REFERENCES "trackers" ("id");
