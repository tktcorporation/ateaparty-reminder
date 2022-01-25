alter table "public"."event" rename column "datetime" to "date";
ALTER TABLE "public"."event" ALTER COLUMN "date" TYPE date;
