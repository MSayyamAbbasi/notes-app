-- Notes Management Application - MySQL Schema
-- Run: mysql -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS notes_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE notes_db;

CREATE TABLE IF NOT EXISTS notes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'General',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_notes_category (category),
  INDEX idx_notes_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (optional)
INSERT INTO notes (title, content, category) VALUES
  ('Welcome to NotesPro', 'This is your first note. Use the dashboard to create, edit, and organize your ideas.', 'General'),
  ('Project Roadmap Q2', 'Finalize API integration, deploy staging environment, and conduct user testing sessions.', 'Work'),
  ('Meeting Notes', 'Discussed sprint goals, assigned tasks, and set deadline for Friday demo.', 'Work'),
  ('Reading List', 'Atomic Habits, Deep Work, Designing Data-Intensive Applications', 'Personal');
