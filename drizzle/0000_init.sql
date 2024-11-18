CREATE TABLE IF NOT EXISTS "employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_name" text NOT NULL,
	"first_name" text NOT NULL,
	"father_name" text NOT NULL,
	"bday" date NOT NULL,
	"position" text NOT NULL,
	"phone_number" text NOT NULL
);
