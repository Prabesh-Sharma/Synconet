
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE citizen(
    _id uuid DEFAULT uuid_generate_v4(),
    _number VARCHAR(20) NOT NULL,
    _email VARCHAR(150) NOT NULL UNIQUE,
    _password VARCHAR(100) NOT NULL, 
    PRIMARY KEY(_id)
);