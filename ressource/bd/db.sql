-- database
CREATE DATABASE uman
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE uman IS 'Корпоративний сайт ТЦ «Епіцентр К», м. Умань';

-- departments
CREATE TABLE department
(
    department_id int PRIMARY KEY,
    department_name varchar(256) NOT NULL

);
COMMENT ON TABLE department IS 'Коди та назви департаментів';


-- employees
CREATE TABLE employee
(
    employee_id int PRIMARY KEY,
    department_id int NOT NULL,
    first_name varchar (20) NOT NULL,
    last_name varchar (30) NOT NULL,
    patronymic_name varchar(30) NOT NULL,
    position varchar,
    isChief boolean,
    tel_number_dect varchar,
    tel_number_landline varchar,
    email varchar ARRAY
);
COMMENT ON TABLE employee IS 'Службовці';



-- Смена типа данных
-- Необязательное предложение USING определяет, как новое значение столбца будет получено из старого; если оно отсутствует,
-- выполняется приведение типа по умолчанию, как обычное присваивание значения старого типа новому.
-- Предложение USING становится обязательным, если неявное приведение или присваивание с приведением старого типа к новому не определено.
ALTER TABLE employee
    ALTER COLUMN tel_number_dect SET DATA TYPE varchar USING tel_number_dect::varchar;

ALTER TABLE employee
    ALTER COLUMN tel_number_landline SET DATA TYPE varchar USING tel_number_landline::varchar;


-- добавление колонки
ALTER TABLE department
    ADD COLUMN IF NOT EXISTS isSeller boolean;
Alter table department alter column isSeller set not null;

ALTER TABLE employee
    ADD COLUMN IF NOT EXISTS email varchar ARRAY[];

ALTER TABLE employee
    ALTER COLUMN email SET DATA TYPE varchar ARRAY USING email::varchar[];

ALTER TABLE employee
    ADD COLUMN IF NOT EXISTS position varchar;

-- переименования таблицы
ALTER TABLE department RENAME COLUMN isseller TO is_seller;

-- очистка/удаление таблицы
TRUNCATE employee RESTART IDENTITY;
DROP TABLE IF EXISTS employee;
