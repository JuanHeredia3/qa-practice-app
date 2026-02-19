-- name: CreateTracker :one
INSERT INTO trackers (
  id, username, name
) VALUES (
  $1, $2, $3
)
RETURNING *;

-- name: ListTrackers :many
SELECT * FROM trackers;

-- name: GetTracker :one
SELECT * FROM trackers
WHERE id = $1 LIMIT 1;

-- name: UpdateTracker :one
UPDATE trackers
SET
  username = COALESCE(sqlc.narg(username), username),
  name = COALESCE(sqlc.narg(name), name),
  modified_at = COALESCE(sqlc.narg(modified_at), modified_at)
WHERE
  id = sqlc.arg(id)
RETURNING *;