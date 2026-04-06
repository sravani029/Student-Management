# Student Management System

A complete full-stack Student Management System built with Spring Boot, H2 Database, and HTML/CSS/JavaScript.

## Project Structure

```
student-management-system/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/studentms/
│   │       │       ├── controller/
│   │       │       │   └── StudentController.java
│   │       │       ├── service/
│   │       │       │   └── StudentService.java
│   │       │       ├── repository/
│   │       │       │   └── StudentRepository.java
│   │       │       ├── entity/
│   │       │       │   └── Student.java
│   │       │       └── StudentManagementSystemApplication.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── database_schema.sql
```

## Features

### Backend (Spring Boot)
- **REST APIs** for CRUD operations on students
- **Pagination Support** - View students with configurable page size
- **Search Functionality** - Search by name, student ID, or email
- **Data Validation** - Ensures data integrity
- **Error Handling** - Comprehensive error responses
- **CORS Support** - Enables frontend-backend communication

### Frontend (HTML/CSS/JS)
- **Responsive Design** - Works on desktop, tablet, and mobile
- **View Students** - Display all students with pagination
- **Add Student** - Form to add new students
- **Edit Student** - Update student information
- **Delete Student** - Remove students from database
- **Search** - Real-time search for students
- **Modern UI** - Clean and intuitive interface

### Database (MySQL)
- **Student Table** - Stores student information
- **Indexing** - Optimized queries on frequently searched fields
- **Sample Data** - Pre-populated with test data

## Prerequisites

- Java 11 or higher
- MySQL Server 8.0+
- Maven 3.6+
- Modern web browser

## Installation & Setup

### 1. Database Setup

```bash
# Connect to MySQL
mysql -u root -p

# Execute the SQL script
source database_schema.sql
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend

# Update application.properties with your MySQL credentials
# Edit: src/main/resources/application.properties
# Change:
#   spring.datasource.username=root
#   spring.datasource.password=your_password

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend

# Open index.html in your browser
# Or start a local server:
python -m http.server 8000
```

Access the application at `http://localhost:8000`

## API Endpoints

### Get All Students (with pagination)
```
GET /api/students?page=0&size=10&sortBy=id&direction=ASC
```

### Get Student by ID
```
GET /api/students/{id}
```

### Create Student
```
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "studentId": "STU006",
  "email": "john@example.com",
  "phone": "9876543215",
  "course": "B.Tech - CSE",
  "gpa": 3.9,
  "address": "123 Street, City"
}
```

### Update Student
```
PUT /api/students/{id}
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543216",
  "course": "B.Tech - CSE",
  "gpa": 3.95,
  "address": "456 Avenue, City"
}
```

### Delete Student
```
DELETE /api/students/{id}
```

### Search Students
```
GET /api/students/search?query=John&page=0&size=10
GET /api/students/search/byName?name=John&page=0&size=10
GET /api/students/search/byStudentId?studentId=STU&page=0&size=10
```

## Configuration

### Database Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# Database URL (default: localhost)
spring.datasource.url=jdbc:mysql://localhost:3306/student_management_system?useSSL=false&serverTimezone=UTC

# Database username and password
spring.datasource.username=root
spring.datasource.password=root

# JPA settings
spring.jpa.hibernate.ddl-auto=update
```

### Server Configuration
- Default Server Port: `8080`
- Context Path: `/sms`

## Testing

### Manual Testing
1. Start the backend server
2. Open frontend in browser
3. Add a new student
4. Search for students
5. Edit student information
6. Delete a student
7. View paginated student list

### Using cURL (Backend Testing)
```bash
# Get all students
curl http://localhost:8080/sms/api/students?page=0&size=10

# Create student
curl -X POST http://localhost:8080/sms/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "studentId": "STU999",
    "email": "test@example.com",
    "phone": "9999999999",
    "course": "B.Tech",
    "gpa": 3.5,
    "address": "Test Address"
  }'
```

## Technologies Used

### Backend
- **Framework**: Spring Boot 2.7.14
- **Database**: MySQL 8.0
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven
- **Language**: Java 11

### Frontend
- **HTML5**: Structure
- **CSS3**: Styling and animations
- **JavaScript (ES6+)**: Interactivity
- **Responsive Design**: Mobile-first approach

## Features Implemented

✅ Add Student
✅ Update Student
✅ Delete Student
✅ View Student List
✅ Pagination Support
✅ Search by Name
✅ Search by Student ID
✅ Search by Email
✅ Form Validation
✅ Error Handling
✅ Responsive Design
✅ Modal Dialogs
✅ REST APIs
✅ CORS Support

## Future Enhancements

- User authentication and authorization
- Upload student profile pictures
- Generate student reports
- Email notifications
- Bulk import/export functionality
- Advanced filtering options
- Export to PDF/Excel
- Student performance analytics
- Admin dashboard

## Troubleshooting

### Backend won't start
- Check if MySQL server is running
- Verify database credentials in `application.properties`
- Check if port 8080 is available

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:8080`
- Check browser console for CORS errors
- Verify API_BASE_URL in `script.js`

### Database issues
- Ensure MySQL is running
- Check database exists: `SHOW DATABASES;`
- Verify user permissions

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please refer to the troubleshooting section above or create an issue in the repository.
