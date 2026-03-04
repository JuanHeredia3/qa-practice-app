-- name: CreateColumn :one
INSERT INTO columns (
  id, board_id, name, position
) VALUES (
  $1, $2, $3, $4
)
RETURNING *;

-- name: ListColumnsByBoard :many
SELECT * FROM columns
WHERE board_id = $1
ORDER BY position ASC;

-- name: GetColumn :one
SELECT * FROM columns
WHERE id = $1 LIMIT 1;

-- name: UpdateColumn :one
UPDATE columns
SET
  board_id = COALESCE(sqlc.narg(board_id), board_id),
  name = COALESCE(sqlc.narg(name), name),
  position = COALESCE(sqlc.narg(position), position),
  modified_at = COALESCE(sqlc.narg(modified_at), modified_at)
WHERE
  id = sqlc.arg(id)
RETURNING *;