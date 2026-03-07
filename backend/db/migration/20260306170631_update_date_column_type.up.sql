ALTER TABLE "habit_entry" DROP COLUMN date;
ALTER TABLE "habit_entry" ADD COLUMN date timestamptz NOT NULL;