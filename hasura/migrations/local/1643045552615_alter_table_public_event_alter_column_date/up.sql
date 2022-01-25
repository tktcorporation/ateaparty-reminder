ALTER TABLE "public"."event" ALTER COLUMN "date" TYPE timestamp;
alter table "public"."event" rename column "date" to "datetime";
