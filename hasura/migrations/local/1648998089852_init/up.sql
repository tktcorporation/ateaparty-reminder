SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.event (
    id bigint NOT NULL,
    datetime timestamp without time zone NOT NULL,
    host bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.event_host_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.event_host_seq OWNED BY public.event.host;
CREATE SEQUENCE public.event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;
CREATE TABLE public.event_sub_staff (
    id bigint NOT NULL,
    event_id bigint NOT NULL,
    staff_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.event_sub_staff_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.event_sub_staff_id_seq OWNED BY public.event_sub_staff.id;
CREATE TABLE public.staff (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.staff_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.staff_id_seq OWNED BY public.staff.id;
CREATE TABLE public."user" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    discord_id character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);
ALTER TABLE ONLY public.event_sub_staff ALTER COLUMN id SET DEFAULT nextval('public.event_sub_staff_id_seq'::regclass);
ALTER TABLE ONLY public.staff ALTER COLUMN id SET DEFAULT nextval('public.staff_id_seq'::regclass);
ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.event_sub_staff
    ADD CONSTRAINT event_sub_staff_event_id_staff_id_key UNIQUE (event_id, staff_id);
ALTER TABLE ONLY public.event_sub_staff
    ADD CONSTRAINT event_sub_staff_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_user_id_key UNIQUE (user_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_discord_id_key UNIQUE (discord_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_event_sub_staff_updated_at BEFORE UPDATE ON public.event_sub_staff FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_event_sub_staff_updated_at ON public.event_sub_staff IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_event_updated_at BEFORE UPDATE ON public.event FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_event_updated_at ON public.event IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_staff_updated_at BEFORE UPDATE ON public.staff FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_staff_updated_at ON public.staff IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_user_updated_at BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_user_updated_at ON public."user" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_host_fkey FOREIGN KEY (host) REFERENCES public.staff(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.event_sub_staff
    ADD CONSTRAINT event_sub_staff_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.event(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.event_sub_staff
    ADD CONSTRAINT event_sub_staff_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES public.staff(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
