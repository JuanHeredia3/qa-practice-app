package main

import (
	"context"

	_ "github.com/JuanHeredia3/simple-bank/doc/statik"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/qa-practice-project/api"
	db "github.com/qa-practice-project/db/sqlc"
	"github.com/qa-practice-project/util"
	"github.com/rs/zerolog/log"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal().Msg("cannot load config:")
	}

	connPool, err := pgxpool.New(context.Background(), config.DBSource)
	if err != nil {
		log.Fatal().Msgf("cannot connect to db: %s", err)
	}

	runDBMigration(config.DBSource, config.MigrationURL)

	store := db.NewStore(connPool)

	runGinServer(config, store)
}

func runGinServer(config util.Config, store db.Store) {
	server, err := api.NewServer(config, store)
	if err != nil {
		log.Fatal().Msgf("cannot create server: %s", err)
	}

	err = server.Start(config.HTTPServerAddress)
	if err != nil {
		log.Fatal().Msgf("cannot start server: %s", err)
	}
}

func runDBMigration(dbSource string, migrationURL string) {
	m, err := migrate.New(migrationURL, dbSource)
	if err != nil {
		log.Fatal().Msgf("cannot create migrate instance: %s", err)
	}

	if err = m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatal().Msgf("failed to run migrate up: %s", err)
	}

	log.Print("db migrated successfully")
}
