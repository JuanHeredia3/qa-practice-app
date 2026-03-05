-- name: CreateHabit :one
INSERT INTO habits (
  id, column_id, name, status, frequency, time_spent
) VALUES (
  $1, $2, $3, $4, $5, $6
)
RETURNING *;

-- name: ListHabits :many
SELECT * FROM habits;

-- name: ListHabitsByTracker :many
SELECT h.*
FROM habits h
JOIN columns c ON c.id = h.column_id
JOIN boards b ON b.id = c.board_id
WHERE b.tracker_id = $1
ORDER BY c.position, h.created_at;

-- name: ListHabitsByColumn :many
SELECT * FROM habits
WHERE column_id = $1;

-- name: GetHabit :one
SELECT * FROM habits
WHERE id = $1 LIMIT 1;

-- name: UpdateHabit :one
UPDATE habits
SET
  column_id = COALESCE(sqlc.narg(column_id), column_id),
  name = COALESCE(sqlc.narg(name), name),
  status = COALESCE(sqlc.narg(status), status),
  frequency = COALESCE(sqlc.narg(frequency), frequency),
  time_spent = COALESCE(sqlc.narg(time_spent), time_spent),
  modified_at = COALESCE(sqlc.narg(modified_at), modified_at)
WHERE
  id = sqlc.arg(id)
RETURNING *;