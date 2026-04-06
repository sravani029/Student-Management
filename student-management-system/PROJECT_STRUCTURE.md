# Student Management System - Complete Documentation

## 📁 Project Structure

```
student-management-system/
│
├── 📂 backend/                          # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/studentms/
│   │       │   ├── StudentManagementSystemApplication.java (Main App)
│   │       │   ├── 📂 controller/
│   │       │   │   └── StudentController.java (REST APIs)
│   │       │   ├── 📂 service/
│   │       │   │   └── StudentService.java (Business Logic)
│   │       │   ├── 📂 repository/
│   │       │   │   └── StudentRepository.java (Database Access)
│   │       │   └── 📂 entity/
│   │       │       └── Student.java (Data Model)
│   │       └── resources/
│   │           └── application.properties (Configuration)
│   └── pom.xml (Maven Dependencies)
│
├── 📂 frontend/                         # Web Frontend
│   ├── index.html (Main HTML)
│   ├── styles.css (Styling)
│   └── script.js (JavaScript Logic)
│
├── 📄 database_schema.sql               # MySQL Database Schema
├── 📄 README.md                         # Full Documentation
├── 📄 QUICKSTART.md                     # Quick Start Guide
├── 📄 CONFIGURATION.md                  # Configuration Guide
└── 📄 PROJECT_STRUCTURE.md              # This File

```

## 🚀 Getting Started (5 Steps)

### Step 1: Setup Database
```bash
# Run the SQL script to create database and tables
mysql -u root -p < database_schema.sql
```

### Step 2: Configure Backend
```bash
cd backend
# Edit src/main/resources/application.properties if needed
# Change database credentials if different from defaults
```

### Step 3: Build Backend
```bash
cd backend
mvn clean install
```

### Step 4: Run Backend
```bash
mvn spring-boot:run
# Server starts on http://localhost:8080
```

### Step 5: Run Frontend
```bash
cd frontend
python -m http.server 8000
# Open http://localhost:8000 in browser
```

## 📋 Features Overview

### Add Student
- Fill out the form with student details
- Click "Save Student"
- Student appears in the list

### View All Students
- See all students with pagination
- 10 students per page by default
- Navigate using Previous/Next buttons

### Search Students
- Search by name
- Search by student ID
- Search by email
- Real-time filtering

### Edit Student
- Click "Edit" button on any student
- Update information in modal
- Click "Update Student" to save

### Delete Student
- Click "Delete" button
- Confirm deletion
- Student removed from database

### Pagination
- First/Previous/Next/Last navigation
- Page numbers display
- Configurable page size

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Spring Boot | 2.7.14 |
| Language | Java | 11+ |
| Database | MySQL | 8.0+ |
| Frontend | HTML5/CSS3/JavaScript | ES6+ |
| Build Tool | Maven | 3.6+ |
| API | REST | JSON |

## 📊 Database Schema

### students Table
```sql
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    course VARCHAR(100) NOT NULL,
    gpa DECIMAL(3, 2) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_student_id (student_id),
    INDEX idx_email (email)
);
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students (paginated) |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |
| GET | `/api/students/search` | Search students |
| GET | `/api/students/search/byName` | Search by name |
| GET | `/api/students/search/byStudentId` | Search by student ID |

## 📝 Student Data Model

```json
{
  "id": 1,
  "name": "Rahul Kumar",
  "studentId": "STU001",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "course": "B.Tech - CSE",
  "gpa": 3.8,
  "address": "123 Main St, Delhi",
  "createdAt": "2024-01-15 10:30:00",
  "updatedAt": "2024-01-15 10:30:00"
}
```

## 🎯 Key Components

### Backend Components

**StudentController.java**
- Handles HTTP requests/responses
- Maps to REST endpoints
- Input validation
- Error handling

**StudentService.java**
- Business logic
- Database operations
- Data processing
- Search functionality

**StudentRepository.java**
- Database queries
- JPA repository
- Custom query methods
- Index optimizations

**Student.java**
- Entity class
- Database mapping
- Getters/Setters
- Validation annotations

### Frontend Components

**index.html**
- Structure and layout
- Form elements
- Tables and modals
- Navigation

**styles.css**
- Responsive design
- Beautiful styling
- Animations
- Mobile optimization

**script.js**
- API calls (fetch)
- DOM manipulation
- Event handling
- Form validation

## 💾 Database Operations

### Create Database
```sql
CREATE DATABASE student_management_system;
USE student_management_system;
```

### Create Table
```sql
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    -- ... fields ...
    INDEX idx_name (name),
    INDEX idx_student_id (student_id)
);
```

### Insert Data
```sql
INSERT INTO students VALUES (...);
```

### Query Data
```sql
SELECT * FROM students WHERE name LIKE '%John%';
SELECT * FROM students WHERE gpa > 3.5;
SELECT * FROM students LIMIT 10 OFFSET 0;
```

## 🔍 Search Functionality

### Frontend Search (script.js)
```javascript
async function searchStudents() {
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
    // Display results
}
```

### Backend Search (StudentService.java)
```java
public Page<Student> searchStudents(String searchTerm, Pageable pageable) {
    return studentRepository.search(searchTerm, pageable);
}
```

### Database Query (StudentRepository.java)
```java
@Query("SELECT s FROM Student s WHERE " +
       "LOWER(s.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
       "LOWER(s.studentId) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
       "LOWER(s.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
Page<Student> search(@Param("searchTerm") String searchTerm, Pageable pageable);
```

## 📱 Responsive Design

The application is responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

CSS Breakpoints:
```css
@media (max-width: 768px) { /* Tablet & Mobile */ }
@media (max-width: 480px) { /* Small Mobile */ }
```

## ⚙️ Configuration Files

### application.properties
```properties
# Server
server.port=8080
server.servlet.context-path=/sms

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/student_management_system
spring.datasource.username=root
spring.datasource.password=root

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

### pom.xml
Contains Maven dependencies:
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- mysql-connector-java
- lombok
- spring-boot-devtools

## 🧪 Testing

### Test Search
```bash
curl "http://localhost:8080/sms/api/students/search?query=Rahul"
```

### Test Pagination
```bash
curl "http://localhost:8080/sms/api/students?page=0&size=10"
```

### Test Create
```bash
curl -X POST http://localhost:8080/sms/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","studentId":"STU999",...}'
```

## 🐛 Debugging

### Backend Debugging
1. Check logs in console
2. Enable SQL logging: `spring.jpa.show-sql=true`
3. Use breakpoints in IDE
4. Check database with MySQL client

### Frontend Debugging
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Use console.log() for debugging

## 📚 File Descriptions

| File | Purpose |
|------|---------|
| StudentController.java | REST API endpoints |
| StudentService.java | Business logic |
| StudentRepository.java | Database queries |
| Student.java | Data model |
| StudentManagementSystemApplication.java | Application entry point |
| application.properties | Configuration |
| pom.xml | Dependencies |
| index.html | Web interface |
| styles.css | Styling |
| script.js | Frontend logic |
| database_schema.sql | Database setup |

## 🚀 Performance Optimization

### Database Indexes
```sql
CREATE INDEX idx_name ON students(name);
CREATE INDEX idx_student_id ON students(student_id);
CREATE INDEX idx_email ON students(email);
```

### Pagination
- Limits query results
- Reduces memory usage
- Faster page load

### Lazy Loading
- Loads data on demand
- Better performance
- Reduced initial load time

## 🔐 Security Considerations

⚠️ For Production:
1. Enable HTTPS
2. Use environment variables for secrets
3. Implement authentication
4. Validate all inputs
5. Use prepared statements (JPA does this)
6. Restrict CORS origins
7. Rate limiting
8. SQL injection prevention (JPA handles this)

## 📞 Support & Documentation

- **README.md**: Full documentation
- **QUICKSTART.md**: Quick setup guide
- **CONFIGURATION.md**: Configuration options
- **Spring Boot Docs**: https://docs.spring.io/spring-boot/
- **MySQL Docs**: https://dev.mysql.com/doc/

## 🎓 Learning Resources

- Spring Boot: https://spring.io/projects/spring-boot
- JPA/Hibernate: https://hibernate.org/orm/
- REST APIs: https://restfulapi.net/
- MySQL: https://www.mysql.com/
- Web Development: https://developer.mozilla.org/

---

**Last Updated**: 2024-01-15
**Version**: 1.0.0
