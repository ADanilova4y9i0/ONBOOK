CREATE TYPE "public"."user_book_status_enum" AS ENUM('to_read', 'reading', 'completed', 'dropped', 'on_hold');--> statement-breakpoint
CREATE TABLE "user_book_status" (
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"status" "user_book_status_enum" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_book_status_pk" PRIMARY KEY("user_id","book_id")
);
