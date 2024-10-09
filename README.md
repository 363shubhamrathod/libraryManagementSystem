# LibraryManagementSystem

## Database Schema

* Book Table
  
  ```sql
   CREATE TABLE `books` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,         -- Unique identifier for each book
    `title` VARCHAR(255) NOT NULL,                   -- Title of the book, must be provided
    `author` VARCHAR(255) NOT NULL,                  -- Author of the book, must be provided
    `isActive` TEXT NOT NULL DEFAULT 'yes',          -- Indicates if the book is active, default is 'yes'
    `isAvalable` TEXT NOT NULL DEFAULT 'yes',        -- Indicates if the book is available, default is 'yes'
    `userId` INTEGER NOT NULL DEFAULT 0,             -- ID of the user associated with the book, default is 0
    `deletedBy` INTEGER,                             -- ID of the user who deleted the book (nullable)
    `createdAt` DATETIME NOT NULL,                   -- Timestamp for when the book was created
    `updatedAt` DATETIME NOT NULL,                   -- Timestamp for when the book was last updated
    `librainId` INTEGER REFERENCES `librains` (`id`) ON DELETE CASCADE ON UPDATE CASCADE -- Foreign key to the `librains` table
    );
  ```

* User Table
  
  ```sql
   CREATE TABLE `users` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,         -- Unique identifier for each user
    `username` VARCHAR(255) NOT NULL UNIQUE,         -- Username for the user, must be unique and not null
    `password` VARCHAR(255) NOT NULL,                 -- Password for the user, must be provided
    `isActive` TEXT NOT NULL DEFAULT 'yes',          -- Indicates if the user is active, default is 'yes'
    `deletedBy` INTEGER DEFAULT 0,                   -- ID of the user who deleted this user (nullable, defaults to 0)
    `createdAt` DATETIME NOT NULL,                   -- Timestamp for when the user was created
    `updatedAt` DATETIME NOT NULL                     -- Timestamp for when the user was last updated
  );
  ```
* librain Table
  
  ```sql
   CREATE TABLE `librains` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,         -- Unique identifier for each librarian
    `username` VARCHAR(255) NOT NULL UNIQUE,         -- Username for the librarian, must be unique and not null
    `password` VARCHAR(255) NOT NULL,                 -- Password for the librarian, must be provided
    `createdAt` DATETIME NOT NULL,                   -- Timestamp for when the librarian account was created
    `updatedAt` DATETIME NOT NULL                     -- Timestamp for when the librarian account was last updated
  );
  ```
* history Table
  
  ```sql
   CREATE TABLE `histories` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,         -- Unique identifier for each history record
    `isAvalable` TEXT NOT NULL DEFAULT 'borrowed',  -- Status indicating if the book is available, default is 'borrowed'
    `timestamp` DATETIME NOT NULL,                   -- Timestamp of the action (e.g., when the book was borrowed or returned)
    `userId` INTEGER NOT NULL,                       -- ID of the user associated with the action
    `bookId` INTEGER NOT NULL,                       -- ID of the book associated with the action
    `createdAt` DATETIME NOT NULL,                   -- Timestamp for when the history record was created
    `updatedAt` DATETIME NOT NULL                    -- Timestamp for when the history record was last updated
  );
  ```















## .env file in the backend
PORT=3000
JWT_SECRET=

## .env file in frontend
PORT=8000
BACKEND="http://localhost:3000"

