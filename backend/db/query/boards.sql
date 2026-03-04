-- name: CreateBoard :one
INSERT INTO boards (
  id, tracker_id
) VALUES (
  $1, $2
)
RETURNING *;

-- name: GetBoard :one
SELECT * FROM boards
WHERE id = $1 LIMIT 1;

-- name: GetBoardByTrackerId :one
SELECT * FROM boards
WHERE tracker_id = $1 LIMIT 1;