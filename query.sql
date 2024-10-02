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
from dbo.user_courses;

delete from user_courses where 1=1

update user_courses set progress=100 where course_id=8325;

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
