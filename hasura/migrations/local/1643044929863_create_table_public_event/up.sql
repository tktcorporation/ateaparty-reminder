CREATE TABLE "public"."event" ("id" bigserial NOT NULL, "date" date NOT NULL, "host" bigserial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("host") REFERENCES "public"."staff"("id") ON UPDATE cascade ON DELETE restrict, UNIQUE ("id"));
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
CREATE TRIGGER "set_public_event_updated_at"
BEFORE UPDATE ON "public"."event"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_event_updated_at" ON "public"."event" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
