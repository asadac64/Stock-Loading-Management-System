-- Table: public.stock_task

-- DROP TABLE IF EXISTS public.stock_task;

CREATE TABLE IF NOT EXISTS public.stock_task
(
    id integer NOT NULL DEFAULT nextval('stock_task_id_seq'::regclass),
    task_number character varying(50) COLLATE pg_catalog."default",
    created_by character varying(100) COLLATE pg_catalog."default",
    assigned_to character varying(100) COLLATE pg_catalog."default",
    product text COLLATE pg_catalog."default",
    started_at timestamp with time zone,
    finished_at timestamp with time zone,
    task_type character varying(20) COLLATE pg_catalog."default",
    status_task character varying(20) COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    dimensions text COLLATE pg_catalog."default",
    weight text COLLATE pg_catalog."default",
    special_handling text COLLATE pg_catalog."default",
    CONSTRAINT stock_task_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.stock_task
    OWNER to postgres;