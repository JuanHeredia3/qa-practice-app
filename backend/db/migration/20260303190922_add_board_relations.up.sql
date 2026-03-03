CREATE TABLE "boards" (
  "id" uuid PRIMARY KEY,
  "tracker_id" uuid NOT NULL,
  "board_date" date NOT NULL,
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
  "frequency" varchar NOT NULL,
  "time_spent" varchar,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE UNIQUE INDEX ON "boards" ("tracker_id", "board_date");

CREATE INDEX ON "columns" ("board_id", "position");

CREATE INDEX ON "habits" ("column_id");

ALTER TABLE "boards" ADD FOREIGN KEY ("tracker_id") REFERENCES "trackers" ("id");

ALTER TABLE "columns" ADD FOREIGN KEY ("board_id") REFERENCES "boards" ("id");

ALTER TABLE "habits" ADD FOREIGN KEY ("column_id") REFERENCES "columns" ("id");