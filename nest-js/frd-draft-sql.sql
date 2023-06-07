CREATE TABLE "user" (
	"id" serial NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"phone_number" varchar NOT NULL UNIQUE,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "meal_input_record" (
	"id" serial NOT NULL,
	"date_of_meal" DATE NOT NULL,
	"meal_time" varchar NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "meal_input_record_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "meal_food_item" (
	"id" serial NOT NULL,
	"meal_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"calories" DECIMAL NOT NULL,
	"serving_size_g" DECIMAL NOT NULL,
	"fat_total_g" DECIMAL NOT NULL,
	"fat_saturated_g" DECIMAL NOT NULL,
	"protein_g" DECIMAL NOT NULL,
	"sodium_mg" DECIMAL NOT NULL,
	"potassium_mg" DECIMAL NOT NULL,
	"cholesterol_mg" DECIMAL NOT NULL,
	"carbohydrates_total_g" DECIMAL NOT NULL,
	"fiber_g" DECIMAL NOT NULL,
	"sugar_g" DECIMAL NOT NULL,
	CONSTRAINT "meal_food_item_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_relationship" (
	"id" serial NOT NULL,
	"advisor" integer NOT NULL,
	"client" integer NOT NULL,
	"client_invite" BOOLEAN NOT NULL,
	"accepted" BOOLEAN NOT NULL,
	"rejected_reason" varchar,
	CONSTRAINT "user_relationship_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "role_registration" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"profession" varchar NOT NULL,
	CONSTRAINT "role_registration_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "calendar_event" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"event_type" varchar NOT NULL,
	"information" varchar,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"alert" BOOLEAN NOT NULL,
	CONSTRAINT "calendar_event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "text_message" (
	"id" serial NOT NULL,
	"relationship_id" integer NOT NULL,
	"from" integer NOT NULL,
	"sent_at" DATETIME NOT NULL,
	"read_at" DATETIME NOT NULL,
	"message" varchar NOT NULL,
	CONSTRAINT "text_message_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "exercise_history" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"event_name" varchar NOT NULL,
	"event_datetime" DATETIME NOT NULL,
	"burnt_calories" DECIMAL NOT NULL,
	CONSTRAINT "exercise_history_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "table" (
	"id" serial NOT NULL,
	"scrapped_website_id" integer NOT NULL,
	"title" varchar NOT NULL,
	CONSTRAINT "table_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "row_info" (
	"id" serial NOT NULL,
	"table_id" integer NOT NULL,
	"row_index" integer NOT NULL,
	"header" varchar NOT NULL,
	"sub_info" varchar NOT NULL,
	CONSTRAINT "row_info_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "scrapped_website" (
	"id" serial NOT NULL,
	"href" varchar NOT NULL UNIQUE,
	"image_src" varchar NOT NULL UNIQUE,
	"title" varchar NOT NULL,
	CONSTRAINT "scrapped_website_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "meal_input_record" ADD CONSTRAINT "meal_input_record_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "meal_food_item" ADD CONSTRAINT "meal_food_item_fk0" FOREIGN KEY ("meal_id") REFERENCES "meal_input_record"("id");

ALTER TABLE "user_relationship" ADD CONSTRAINT "user_relationship_fk0" FOREIGN KEY ("advisor") REFERENCES "user"("id");
ALTER TABLE "user_relationship" ADD CONSTRAINT "user_relationship_fk1" FOREIGN KEY ("client") REFERENCES "user"("id");

ALTER TABLE "role_registration" ADD CONSTRAINT "role_registration_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "calendar_event" ADD CONSTRAINT "calendar_event_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "text_message" ADD CONSTRAINT "text_message_fk0" FOREIGN KEY ("relationship_id") REFERENCES "user_relationship"("id");

ALTER TABLE "exercise_history" ADD CONSTRAINT "exercise_history_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "table" ADD CONSTRAINT "table_fk0" FOREIGN KEY ("scrapped_website_id") REFERENCES "scrapped_website"("id");

ALTER TABLE "row_info" ADD CONSTRAINT "row_info_fk0" FOREIGN KEY ("table_id") REFERENCES "table"("id");













