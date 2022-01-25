CREATE TABLE "public"."event_sub_staff" ("id" bigserial NOT NULL, "event_id" bigint NOT NULL, "staff_id" bigint NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("id"), UNIQUE ("event_id", "staff_id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_event_sub_staff_updated_at"
BEFORE UPDATE ON "public"."event_sub_staff"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_event_sub_staff_updated_at" ON "public"."event_sub_staff" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
