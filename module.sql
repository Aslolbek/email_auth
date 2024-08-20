CREATE DATABASE email;

\c email;


CREATE TABLE users(
    id SERIAL PRIMARY KEY not null, 
    username varchar,
    email varchar,
    password varchar,
    crate_at timestamp with time zone Default CURRENT_TIMESTAMP
);
