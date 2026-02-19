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