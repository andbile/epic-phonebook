-- database
CREATE DATABASE uman
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
COMMENT ON DATABASE uman IS 'Корпоративний сайт ТЦ «Епіцентр К», м. Умань';


-- departments
CREATE TABLE department
(
    department_code VARCHAR(32) PRIMARY KEY NOT NULL,
    department_name VARCHAR(256) UNIQUE NOT NULL,
    is_seller       BOOLEAN NOT NULL
);
COMMENT ON TABLE department IS 'Коди та назви відділів';




-- departments_contacts
CREATE TABLE departments_contacts
(
    department_code     VARCHAR(32) PRIMARY KEY REFERENCES department(department_code) UNIQUE NOT NULL,
    tel_number_dect     VARCHAR(32) DEFAULT NULL,
    tel_number_landline VARCHAR(32) DEFAULT NULL,
    tel_number_mobile   VARCHAR(32) DEFAULT NULL,
    email               VARCHAR(32) DEFAULT NULL
);
COMMENT ON TABLE department_contacts IS 'Загальні телефони на електронні адреси відділів';



-- PRIMARY KEY

ALTER TABLE department_contacts
    DROP CONSTRAINT department_code_fkey;


ALTER TABLE employee
    ADD CONSTRAINT departments_code_employee_fkey FOREIGN KEY(department_code) REFERENCES department(department_code);




ALTER TABLE department_contacts
    RENAME COLUMN fk_department_code TO department_code;


ALTER TABLE department_contacts
    ADD CONSTRAINT department_code_contacts_pkey PRIMARY KEY (department_code);





-- employees
CREATE TABLE employee
(
    employee_id         SERIAL PRIMARY KEY,
    department_code     VARCHAR(32) NOT NULL,
    first_name          VARCHAR(32) NOT NULL,
    last_name           VARCHAR(64) NOT NULL,
    patronymic_name     VARCHAR(64) NOT NULL,
    position            VARCHAR,
    tel_number_dect     VARCHAR(32) DEFAULT NULL,
    tel_number_landline VARCHAR(32) DEFAULT NULL,
    tel_number_mobile   VARCHAR ARRAY DEFAULT NULL,
    email               VARCHAR ARRAY DEFAULT NULL
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

ALTER TABLE employee
    ALTER COLUMN department_id SET DATA TYPE varchar USING department_id::varchar;

ALTER TABLE employee
    ALTER COLUMN department_id SET DATA TYPE varchar USING department_id::varchar;

ALTER TABLE employee
    alter column tel_number_landline drop default,
    alter column tel_number_landline type VARCHAR[] using array[tel_number_landline],
    alter column tel_number_landline set default null;

SELECT tel_number_landline FROM employee;

UPDATE employee
SET tel_number_landline = NULL
WHERE tel_number_landline[1] IS NULL;


-- добавление колонки c внешним ключом
-- Сделать нуль
ALTER TABLE department_contacts
ADD COLUMN fk_department_code VARCHAR(32);


ALTER TABLE department_contacts
ADD CONSTRAINT fk_department_code FOREIGN KEY(fk_department_code) REFERENCES department(department_code);




-- PRIMARY KEY
ALTER TABLE department
    DROP CONSTRAINT department_pkey;


ALTER TABLE department
    ADD CONSTRAINT department_code_pkey PRIMARY KEY (department_code);


-- добовление автоинкримента к уже существующей таблице, надо было использовать псеводотип serial
CREATE SEQUENCE employee_id_seq START 8;
ALTER TABLE employee ALTER employee_id SET DEFAULT NEXTVAL('employee_id_seq');





-- добавление колонки
ALTER TABLE department
    ADD COLUMN IF NOT EXISTS isSeller boolean;
Alter table department alter column isSeller set not null;

ALTER TABLE employee
    ADD COLUMN IF NOT EXISTS email varchar ARRAY[];

ALTER TABLE department
    DROP COLUMN department_id;

ALTER TABLE employee
    ALTER COLUMN email SET DATA TYPE varchar ARRAY USING email::varchar[];

ALTER TABLE employee
    ADD COLUMN IF NOT EXISTS position varchar;

-- переименования таблицы
ALTER TABLE department RENAME COLUMN isseller TO is_seller;

-- очистка/удаление таблицы
TRUNCATE employee RESTART IDENTITY;
DROP TABLE IF EXISTS employee;


