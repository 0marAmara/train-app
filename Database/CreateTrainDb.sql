create database traindb;
use traindb;
/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     5/22/2023 5:47:01 PM                         */
/*==============================================================*/


drop table if exists BOOKS;

drop table if exists DEPENDENT;

drop table if exists FARES;

drop table if exists PASSES_THROUGH;

drop table if exists STATIONS;

drop table if exists TRAINS;

drop table if exists TRIPS;

drop table if exists USERS;

drop table if exists WORKERS;

/*==============================================================*/
/* Table: BOOKS                                                 */
/*==============================================================*/
create table BOOKS
(
   USER_ID              int not null,
   TRIP_ID              int not null,
   primary key (USER_ID, TRIP_ID)
);

/*==============================================================*/
/* Table: DEPENDENT                                             */
/*==============================================================*/
create table DEPENDENT
(
   DEPENDANT_NAME       varchar(20) not null,
   WORKER_ID            int,
   GENDER               varchar(20) not null,
   BIRTH_DATE           date not null,
   primary key (DEPENDANT_NAME)
);

/*==============================================================*/
/* Table: FARES                                                 */
/*==============================================================*/
create table FARES
(
   FARE_ID              int not null auto_increment,
   TRIP_ID              int,
   AMOUNT               int not null,
   primary key (FARE_ID)
);

/*==============================================================*/
/* Table: PASSES_THROUGH                                        */
/*==============================================================*/
create table PASSES_THROUGH
(
   END_STATION_ID       int not null,
   START_STATION_ID     int not null,
   TRIP_ID              int not null,
   primary key (END_STATION_ID, START_STATION_ID, TRIP_ID)
);

/*==============================================================*/
/* Table: STATIONS                                              */
/*==============================================================*/
create table STATIONS
(
   STATION_ID           int not null  auto_increment,
   STATION_NAME         varchar(50) not null,
   ADDRESS              varchar(50) not null,
   primary key (STATION_ID)
);

/*==============================================================*/
/* Table: TRAINS                                                */
/*==============================================================*/
create table TRAINS
(
   TRAIN_ID             int not null  auto_increment,
   TRAIN_NAME           varchar(50) not null,
   CAPACITY             int not null,
   primary key (TRAIN_ID)
);

/*==============================================================*/
/* Table: TRIPS                                                 */
/*==============================================================*/
create table TRIPS
(
   TRIP_ID              int not null  auto_increment,
   TRAIN_ID             int,
   FARE_ID              int,
   SEATS                int not null,
   TIME                 time not null,
   STATUS               varchar(15) not null,
   primary key (TRIP_ID)
);

/*==============================================================*/
/* Table: USERS                                                 */
/*==============================================================*/
create table USERS
(
   USER_ID              int not null  auto_increment,
   USER_NAME            varchar(50) not null,
   EMAIL                varchar(50) not null,
   ADDRESS              varchar(50),
   PHONE_NUMBER         varchar(50),
   ROLE                 varchar(13) not null,
   PASSWORD             varchar(32) not null,
   primary key (USER_ID)
);

/*==============================================================*/
/* Table: WORKERS                                               */
/*==============================================================*/
create table WORKERS
(
   WORKER_ID            int not null  auto_increment,
   TRIP_ID              int,
   WORKER_NAME          varchar(50) not null,
   SALARY               int not null,
   PHONE_NUMBER         varchar(50) not null,
   primary key (WORKER_ID)
);

alter table BOOKS add constraint FK_BOOKED_TRIP foreign key (USER_ID)
      references USERS (USER_ID) on delete restrict on update restrict;

alter table BOOKS add constraint FK_PASSENGER foreign key (TRIP_ID)
      references TRIPS (TRIP_ID) on delete restrict on update restrict;

alter table DEPENDENT add constraint FK_HAS foreign key (WORKER_ID)
      references WORKERS (WORKER_ID) on delete restrict on update restrict;

alter table FARES add constraint FK_ASSOCIATED_WITH2 foreign key (TRIP_ID)
      references TRIPS (TRIP_ID) on delete restrict on update restrict;

alter table PASSES_THROUGH add constraint FK_PASSES_THROUGH foreign key (START_STATION_ID)
      references STATIONS (STATION_ID) on delete restrict on update restrict;

alter table PASSES_THROUGH add constraint FK_PASSES_THROUGH2 foreign key (TRIP_ID)
      references TRIPS (TRIP_ID) on delete restrict on update restrict;

alter table TRIPS add constraint FK_ASSOCIATED_WITH foreign key (FARE_ID)
      references FARES (FARE_ID) on delete restrict on update restrict;

alter table TRIPS add constraint FK_USED_IN foreign key (TRAIN_ID)
      references TRAINS (TRAIN_ID) on delete restrict on update restrict;

alter table WORKERS add constraint FK_WORKS_ON foreign key (TRIP_ID)
      references TRIPS (TRIP_ID) on delete restrict on update restrict;

use traindb;

INSERT INTO USERS (USER_NAME, EMAIL, ADDRESS, PHONE_NUMBER, ROLE, PASSWORD)
VALUES ('Adminstrator', 'admin@example.com', '123 Main St', '123-456-7890', 'Administrator', 'password');

INSERT INTO USERS (USER_NAME, EMAIL, ADDRESS, PHONE_NUMBER, ROLE, PASSWORD)
VALUES ('Fatma', 'fatma@example.com', '456 Elm St', '987-654-3210', 'User', 'user123');

INSERT INTO USERS (USER_NAME, EMAIL, ADDRESS, PHONE_NUMBER, ROLE, PASSWORD)
VALUES ('Ahmed', 'ahmed@example.com', '789 Oak St', '555-555-5555', 'User', 'user456');

INSERT INTO USERS (USER_NAME, EMAIL, ADDRESS, PHONE_NUMBER, ROLE, PASSWORD)
VALUES ('Ali', 'ali@example.com', '789 Oak St', '555-555-5555', 'User', 'user');


INSERT INTO TRAINS (TRAIN_NAME, CAPACITY)
VALUES
  ('Express Train', 200),
  ('Local Train', 150),
  ('Commuter Train', 100);


-- Insert statements for STATIONS table
INSERT INTO STATIONS (STATION_NAME, ADDRESS) VALUES
  ('Cairo Central Station', 'Downtown, Cairo'),
  ('Alexandria Station', 'Gleem, Alexandria'),
  ('Giza Station', 'Giza Square, Giza'),
  ('Luxor Station', 'Luxor City, Luxor'),
  ('Aswan Station', 'Aswan City, Aswan');

INSERT INTO FARES (AMOUNT) VALUES
(20),(45),(90),(110);


INSERT INTO TRIPS (TRAIN_ID, FARE_ID, SEATS, TIME, STATUS) VALUES
(1, 1, 50, '10:00:00', 'Scheduled'),
(2, 2, 70, '14:30:00', 'Scheduled'),
(3, 3, 40, '09:15:00', 'Scheduled'),
(1, 4, 60, '12:45:00', 'Scheduled');


INSERT INTO WORKERS (TRIP_ID, WORKER_NAME, SALARY, PHONE_NUMBER)
VALUES
  (1, 'Mohamed Ali', 3000, '01012345678'),
  (2, 'Ahmed Hassan', 2500, '01123456789'),
  (3, 'Fatma Mahmoud', 2800, '01234567890'),
  (4, 'Hana Saad', 2700, '01098765432');


INSERT INTO DEPENDENT (DEPENDANT_NAME, WORKER_ID, GENDER, BIRTH_DATE)
VALUES
  ('Youssef Ali', 1, 'Male', '1995-03-15'),
  ('Sara Hassan', 2, 'Female', '1998-07-22'),
  ('Aya Mahmoud', 3, 'Female', '2000-01-10'),
  ('Omar Saad', 4, 'Male', '1992-11-28');


INSERT INTO PASSES_THROUGH (END_STATION_ID, START_STATION_ID, TRIP_ID)
VALUES
  (1, 2, 1),
  (2, 3, 2),
  (5, 4, 3),
  (5, 1, 4);

INSERT INTO BOOKS (USER_ID, TRIP_ID)
VALUES
  (4, 1),
  (4, 3);

ALTER TABLE books
DROP FOREIGN KEY FK_BOOKED_TRIP;

ALTER TABLE books
ADD CONSTRAINT FK_BOOKED_TRIP
FOREIGN KEY (USER_ID)
REFERENCES users (USER_ID)
ON DELETE CASCADE
ON UPDATE RESTRICT;

