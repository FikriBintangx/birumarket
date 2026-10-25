create table orders (
  id text primary key,
  items jsonb not null default '[]',
  total integer not null default 0,
  buyer_name text,
  buyer_contact text,
  status text not null default 'awaiting_payment',
  telegram_message_id bigint,
  created_at timestamptz default now(),
  verified_at timestamptz
);
