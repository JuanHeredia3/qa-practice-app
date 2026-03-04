DROP INDEX IF EXISTS idx_unique_habit_date;
ALTER TABLE "habit_entry" DROP CONSTRAINT IF EXISTS habit_entry_habit_id_fkey;
DROP TABLE IF EXISTS "habit_entry";
ALTER TABLE "boards" DROP CONSTRAINT IF EXISTS boards_tracker_id_key;
ALTER TABLE "habits" ALTER COLUMN frequency DROP NOT NULL;
ALTER TABLE "boards" ADD COLUMN board_date date;