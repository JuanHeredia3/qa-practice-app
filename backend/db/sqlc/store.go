package db

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

type Store interface {
	Querier
}

type SQLStore struct {
	connPol *pgxpool.Pool
	*Queries
}

func NewStore(connPol *pgxpool.Pool) Store {
	return &SQLStore{
		connPol: connPol,
		Queries: New(connPol),
	}
}
