
# --- !Ups

create table account (
  id                        bigint not null,
  email                     varchar(255) not null,
  name                      varchar(255),
  password                  varchar(255),
  constraint pk_account primary key (id)
);

create table gallerycats (
  id                        bigint not null,
  title                     varchar(255),
  description               varchar(255),
  thumbnail                 varchar(255),
  parentid                  bigint,
  create_date               timestamp,
  user_id                   bigint,
  status                    int,
  constraint pk_gallerycats primary key (id),
  foreign key (user_id) references account (id) on delete cascade on update restrict
);

create table galleryimage (
  id                        bigint not null,
  title                     varchar(255),
  description               varchar(255),
  location                  varchar(255),
  thumbnail                 varchar(255),
  create_date               timestamp,
  category_id               bigint,
  user_id                   bigint,
  status                    int,
  favorites                 int,
  constraint pk_galleryimage primary key (id),
  foreign key (category_id) references gallerycats (id) on delete cascade on update restrict,
  foreign key (user_id) references account (id) on delete cascade on update restrict
);

create sequence account_seq start with 1000;
create sequence gallerycats_seq start with 1000;
create sequence galleryimage_seq start with 1000;

# --- !Downs

drop table if exists account;
drop sequence if exists account_seq;

drop table if exists gallerycats;
drop sequence if exists gallerycats_seq;

drop table if exists galleryimage;
drop sequence if exists galleryimage_seq;


