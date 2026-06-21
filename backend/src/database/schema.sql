CREATE DATABASE IF NOT EXISTS animal_training
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE animal_training;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE pets (
    pet_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    pet_name VARCHAR(50) NOT NULL,
    animal_species ENUM('dog', 'cat') NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    animal_species ENUM('dog', 'cat') NOT NULL,
    importance ENUM('normal', 'important', 'very_important') NOT NULL
);

CREATE TABLE lessons (
    lesson_id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    youtube_video_url VARCHAR(500) NOT NULL,
    requires_course_access BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE course_lesson (
    course_id INT NOT NULL,
    lesson_id INT NOT NULL,
    order_number INT NOT NULL CHECK (order_number > 0),
    UNIQUE (course_id, order_number),
    PRIMARY KEY (course_id, lesson_id),
    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE,
    FOREIGN KEY (lesson_id)
        REFERENCES lessons(lesson_id)
        ON DELETE CASCADE
);

CREATE TABLE course_tag (
    course_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (course_id, tag_id),
    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE,
    FOREIGN KEY (tag_id)
        REFERENCES tags(tag_id)
        ON DELETE CASCADE
);

CREATE TABLE pet_course_progress (
    course_id INT NOT NULL,
    pet_id INT NOT NULL,
    grade INT NOT NULL DEFAULT 0 CHECK (grade BETWEEN 0 AND 10),
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (course_id, pet_id),
    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE,
    FOREIGN KEY (pet_id)
        REFERENCES pets(pet_id)
        ON DELETE CASCADE
);

CREATE TABLE pet_lesson_progress (
    lesson_id INT NOT NULL,
    pet_id INT NOT NULL,
    grade INT NOT NULL DEFAULT 0 CHECK (grade BETWEEN 0 AND 10),
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (lesson_id, pet_id),
    FOREIGN KEY (lesson_id)
        REFERENCES lessons(lesson_id)
        ON DELETE CASCADE,
    FOREIGN KEY (pet_id)
        REFERENCES pets(pet_id)
        ON DELETE CASCADE
);
