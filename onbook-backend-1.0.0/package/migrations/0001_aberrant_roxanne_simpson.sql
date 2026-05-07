CREATE TABLE "book_adaptation" (
	"id" uuid DEFAULT uuid_generate_v7() NOT NULL,
	"book_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"release_year" integer NOT NULL,
	"preview" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_adaptation_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "book_author" (
	"id" uuid DEFAULT uuid_generate_v7() NOT NULL,
	"firstname" text NOT NULL,
	"lastname" text NOT NULL,
	"middlename" text NOT NULL,
	"date_of_birth" timestamp with time zone NOT NULL,
	"biography" text NOT NULL,
	"avatar" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_author_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "book_book_author" (
	"book_id" uuid NOT NULL,
	"book_author_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_book_author_pk" PRIMARY KEY("book_id","book_author_id")
);
--> statement-breakpoint
CREATE TABLE "book_book_genre" (
	"book_id" uuid NOT NULL,
	"book_genre_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_book_genre_pk" PRIMARY KEY("book_id","book_genre_id")
);
--> statement-breakpoint
CREATE TABLE "book_feedback" (
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"comment" text NOT NULL,
	"score" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_feedback_pk" PRIMARY KEY("user_id","book_id")
);
--> statement-breakpoint
CREATE TABLE "book_genre" (
	"id" uuid DEFAULT uuid_generate_v7() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_genre_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "book" (
	"id" uuid DEFAULT uuid_generate_v7() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"attrs" jsonb NOT NULL,
	"preview" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "book_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid DEFAULT uuid_generate_v7() NOT NULL,
	"login" text NOT NULL,
	"password" text NOT NULL,
	"avatar" text,
	"is_admin" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY("id"),
	CONSTRAINT "user_login_unique" UNIQUE("login")
);
--> statement-breakpoint
ALTER TABLE "book_adaptation" ADD CONSTRAINT "book_adaptation_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_book_author" ADD CONSTRAINT "book_book_author_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_book_author" ADD CONSTRAINT "book_book_author_book_author_id_fk" FOREIGN KEY ("book_author_id") REFERENCES "public"."book_author"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_book_genre" ADD CONSTRAINT "book_book_genre_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_book_genre" ADD CONSTRAINT "book_book_genre_book_genre_id_fk" FOREIGN KEY ("book_genre_id") REFERENCES "public"."book_genre"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_feedback" ADD CONSTRAINT "book_feedback_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_feedback" ADD CONSTRAINT "book_feedback_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE no action ON UPDATE no action;