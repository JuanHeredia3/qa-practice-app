CREATE TABLE "habit_entry" (
  "id" uuid PRIMARY KEY,
  "habit_id" uuid NOT NULL,
  "date" date NOT NULL,
  "completed" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "modified_at" timestamptz NOT NULL DEFAULT (now())
);

ALTER TABLE "habit_entry" ADD FOREIGN KEY ("habit_id") REFERENCES "habits" ("id");
ALTER TABLE "boards" ADD CONSTRAINT boards_tracker_id_key UNIQUE (tracker_id);

ALTER TABLE "habits" DROP COLUMN frequency;

ALTER TABLE "habits" ADD COLUMN frequency int[] NOT NULL;

ALTER TABLE "boards" DROP COLUMN if exists "board_date"