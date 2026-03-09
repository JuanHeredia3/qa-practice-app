ALTER TABLE "habits" DROP COLUMN time_spent;
ALTER TABLE "habits" ADD COLUMN time_spent_minutes INT NOT NULL;