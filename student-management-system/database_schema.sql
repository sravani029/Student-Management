-- H2 Database Schema for Student Management System
-- Note: This is for reference only. H2 will auto-create tables with JPA ddl-auto=create-drop

-- Create Students Table (H2 Compatible)
CREATE TABLE IF NOT EXISTS students (
    id BIGINT IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    course VARCHAR(100) NOT NULL,
    gpa DECIMAL(3, 2) NOT NULL,
    address CLOB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_student_id ON students(student_id);
CREATE INDEX IF NOT EXISTS idx_email ON students(email);

-- Insert Sample Data
INSERT INTO students (name, student_id, email, phone, course, gpa, address) VALUES
('Rahul Kumar', 'STU001', 'rahul@example.com', '9876543210', 'B.Tech - CSE', 3.8, '123 Main St, Delhi'),
('Priya Singh', 'STU002', 'priya@example.com', '9876543211', 'B.Tech - ECE', 3.9, '456 Park Ave, Mumbai'),
('Amit Patel', 'STU003', 'amit@example.com', '9876543212', 'B.Tech - Mechanical', 3.6, '789 High St, Bangalore'),
('Neha Gupta', 'STU004', 'neha@example.com', '9876543213', 'B.Tech - CSE', 3.7, '321 Road, Hyderabad'),
('Vikram Sharma', 'STU005', 'vikram@example.com', '9876543214', 'B.Tech - Civil', 3.5, '654 Lane, Pune');
('Amit Patel', 'STU003', 'amit@example.com', '9876543212', 'B.Tech - Mechanical', 3.6, '789 High St, Bangalore'),
('Neha Gupta', 'STU004', 'neha@example.com', '9876543213', 'B.Tech - CSE', 3.7, '321 Road, Hyderabad'),
('Vikram Sharma', 'STU005', 'vikram@example.com', '9876543214', 'B.Tech - Civil', 3.5, '654 Lane, Pune');
