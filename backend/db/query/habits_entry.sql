-- name: CreateHabitEntry :one
INSERT INTO habit_entry (
  id, habit_id, date, completed
) VALUES (
  $1, $2, $3, $4
)
RETURNING *;

-- name: ListHabitEntries :many
SELECT * FROM habit_entry;

-- name: GetHabitEntry :one
SELECT * FROM habit_entry
WHERE id = $1 LIMIT 1;

-- name: UpdateHabitEntry :one
UPDATE habit_entry
SET
  habit_id = COALESCE(sqlc.narg(habit_id), habit_id),
  date = COALESCE(sqlc.narg(date), date),
  completed = COALESCE(sqlc.narg(completed), completed),
  modified_at = COALESCE(sqlc.narg(modified_at), modified_at)
WHERE
  id = sqlc.arg(id)
RETURNING *;