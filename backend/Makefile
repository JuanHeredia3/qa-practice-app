DB_URL=postgresql://root:secret@localhost:5433/qa_practice_app?sslmode=disable

server:
	go run main.go

postgres:
	docker run --name postgres12 --network bank-network -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:12-alpine

createdb:
	docker exec -it postgres12 createdb --username=root --owner=root qa_practice_app

dropdb:
	docker exec -it postgres12 dropdb qa_practice_app

migrateup:
	migrate -path db/migration -database "$(DB_URL)" -verbose up

migrateup1:
	migrate -path db/migration -database "$(DB_URL)" -verbose up 1

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down

migratedown1:
	migrate -path db/migration -database "$(DB_URL)" -verbose down 1

new_migration:
	migrate create -ext sql -dir db/migration $(name)

sqlc:
	sqlc generate

db_docs:
	dbdocs build docs/db.dbml

db_schema:
	dbml2sql --postgres -o docs/schema.sql docs/db.dbml

.PHONY: server postgres createdb dropdb migrateup migratedown migrateup1 migratedown1 sqlc db_docs db_schema