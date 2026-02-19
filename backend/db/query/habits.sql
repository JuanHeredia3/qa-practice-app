-- name: CreateHabit :one
INSERT INTO habits (
  id, tracker_id, name, description, status, modified_at
) VALUES (
  $1, $2, $3, $4, $5, $6
)
RETURNING *;

-- name: ListHabits :many
SELECT * FROM habits;

-- name: GetHabit :one
SELECT * FROM habits
WHERE id = $1 LIMIT 1;

-- name: UpdateHabit :one
UPDATE habits
SET
  tracker_id = COALESCE(sqlc.narg(tracker_id), tracker_id),
  name = COALESCE(sqlc.narg(name), name),
  description = COALESCE(sqlc.narg(description), description),
  status = COALESCE(sqlc.narg(status), status),
  modified_at = COALESCE(sqlc.narg(modified_at), modified_at)
WHERE
  id = sqlc.arg(id)
RETURNING *;