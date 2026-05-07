ALTER TABLE "book_adaptation" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "book_adaptation" CASCADE;--> statement-breakpoint
ALTER TABLE "book_author" ALTER COLUMN "middlename" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_book_status" ALTER COLUMN "status" SET DATA TYPE "public"."user_book_status_enum" USING "status"::"public"."user_book_status_enum";