CREATE TABLE users (
    FullName NVARCHAR(100) NOT NULL,        -- User's first name
    UserName NVARCHAR(100) PRIMARY KEY NOT NULL,         -- User's last name
	Email NVARCHAR(255) NOT NULL UNIQUE,     -- Unique email address
    PasswordHash NVARCHAR(255) NOT NULL,     -- Encrypted/hashed password
    Role NVARCHAR(50) NOT NULL DEFAULT 'employee',  -- Role of the user (e.g., employee, admin)
    RegisteredAt DATETIME DEFAULT GETDATE(), -- The timestamp when the user registered
);

select 
	* 
from dbo.user_courses where user_id = 1;

delete from users where UserId = 1 | 2

update user_courses set progress=100 where course_id=8325;
update users set Role='admin' where UserName='admin';

CREATE TABLE user_courses (
    user_course_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    status VARCHAR(50) NOT NULL, -- [assigned, undertaken]
    progress DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    enrolled_at DATETIME DEFAULT GETDATE(),
    completed_at DATETIME NULL,
    FOREIGN KEY (user_id) REFERENCES users(UserID),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

insert into user_courses (user_id, course_id, status, progress) values (1,19603, 'assigned', 0);

insert into users (FullName, UserName,Email,PasswordHash,Role , RegisteredAt) 
values ('ADMIN KUMAARU','admin', 'admin@jman.com', );


-- deleting duplicates
with duplicates as (
	SELECT
        user_course_id,
        ROW_NUMBER() OVER (PARTITION BY user_id, course_id ORDER BY user_course_id) AS row_num
    FROM user_courses
)
DELETE FROM user_courses
WHERE user_course_id IN (
    SELECT user_course_id
    FROM duplicates
    WHERE row_num > 1
);

-- Delete courses assigned to admin
delete from user_courses where user_id = 2;


-- table creation
DROP TABLE IF EXISTS raw.user_courses;
DROP TABLE IF EXISTS raw.users;
DROP TABLE IF EXISTS raw.courses;
DROP TABLE IF EXISTS prep.user_courses;
DROP TABLE IF EXISTS prep.users;
DROP TABLE IF EXISTS prep.courses;
DROP TABLE IF EXISTS raw.user_courses;
DROP TABLE IF EXISTS raw.users;
DROP TABLE IF EXISTS raw.courses;
CREATE TABLE raw.courses (
    course_id           INT            PRIMARY KEY IDENTITY(1,1),
    course_title        NVARCHAR(100),
    num_subscribers     INT,
    num_reviews         SMALLINT,
    num_lectures        SMALLINT,
    level               NVARCHAR(50),
    content_duration    FLOAT,
    published_timestamp NVARCHAR(50),
    subject             NVARCHAR(50)
)

CREATE TABLE raw.users (
    UserID       INT            PRIMARY KEY IDENTITY(1,1),
    UserName     NVARCHAR(100),
    FullName     NVARCHAR(100),
    Email        NVARCHAR(255) UNIQUE,
    PasswordHash NVARCHAR(255),
    Role         NVARCHAR(50)   DEFAULT 'employee',
    RegisteredAt DATETIME       DEFAULT GETDATE()
)

CREATE TABLE raw.user_courses (
    user_course_id INT       PRIMARY KEY IDENTITY(1,1),
    user_id        INT,
    course_id      INT,
    status         VARCHAR(50),
    progress       DECIMAL(5, 2) DEFAULT 0.00,
    enrolled_at    DATETIME      DEFAULT GETDATE(),
    completed_at   DATETIME,
    score          DECIMAL(5, 2),
    CONSTRAINT FK_user_courses_users FOREIGN KEY (user_id) REFERENCES raw.users(UserID),
    CONSTRAINT FK_user_courses_courses FOREIGN KEY (course_id) REFERENCES raw.courses(course_id)
)

-- Metrics

-- 1. Top 5 users with the highest average score:
SELECT TOP(5) u.UserID, u.UserName, AVG(uc.score) AS avg_score
FROM users u
JOIN user_courses uc ON u.UserID = uc.user_id
WHERE uc.score IS NOT NULL
GROUP BY u.UserID, u.UserName
ORDER BY avg_score DESC;

-- 2. Most assigned courses to users (count of courses with 'assigned' status):
SELECT TOP(10) c.course_title, COUNT(uc.user_course_id) AS total_assigned
FROM courses c
JOIN user_courses uc ON c.course_id = uc.course_id
WHERE uc.status = 'assigned'
GROUP BY c.course_title
ORDER BY total_assigned DESC;

-- 3. Most undertaken courses by users (count of courses with 'undertaken' status):
SELECT TOP(10) c.course_title, COUNT(uc.user_course_id) AS total_undertaken
FROM courses c
JOIN user_courses uc ON c.course_id = uc.course_id
WHERE uc.status = 'undertaken'
GROUP BY c.course_title
ORDER BY total_undertaken DESC;

-- 4. Top 5 users with the most number of courses completed (progress = 100):
SELECT TOP(10) u.UserID, u.UserName, COUNT(uc.user_course_id) AS courses_completed
FROM users u
JOIN user_courses uc ON u.UserID = uc.user_id
WHERE uc.progress = 100
GROUP BY u.UserID, u.UserName
ORDER BY courses_completed DESC;

-- 5. Number of users under each different subject:
SELECT c.subject, COUNT(DISTINCT uc.user_id) AS total_users
FROM courses c
JOIN user_courses uc ON c.course_id = uc.course_id
GROUP BY c.subject;

-- 6. Number of users under each different difficulty (course level):
SELECT c.level, COUNT(DISTINCT uc.user_id) AS total_users
FROM courses c
JOIN user_courses uc ON c.course_id = uc.course_id
GROUP BY c.level;


