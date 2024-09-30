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
from dbo.users;
