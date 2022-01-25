alter table "public"."event" alter column "host" set default nextval('event_host_seq'::regclass);
