# Quick Start Guide

## What You Have

A complete Student Management System with:
- ✅ Spring Boot Backend (REST APIs)
- ✅ H2 In-Memory Database (No setup required!)
- ✅ Frontend (HTML/CSS/JavaScript)

## Step-by-Step Setup (Windows)

### 1. Start Backend (5 minutes)

**Prerequisites**: Java 11+ and Maven installed

```bash
# Navigate to backend folder
cd student-management-system\backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

Expected output:
```
2024-XX-XX XX:XX:XX.XXX  INFO ... started StudentManagementSystemApplication
... Tomcat started on port 8080
... H2 console available at '/h2-console'
```

### 2. Start Frontend (1 minute)

```bash
# Navigate to frontend folder
cd student-management-system\frontend

# Option A: Using Python
python -m http.server 8000

# Option B: Using Node.js (if installed)
npx http-server

# Option C: Directly open in browser
# Open index.html in your web browser
```

Then open: **http://localhost:8000**

## Verify Everything is Working

1. Backend Running? → Visit http://localhost:8080/sms/api/students
   - Should see JSON data of students

2. Frontend Working? → Visit http://localhost:8000
   - Should see the Student Management System UI
   - Click "View Students" - should see 5 sample students

3. Try These Operations:
   - Search for "Rahul" (should find 1 student)
   - Add a new student
   - Edit an existing student
   - Delete a student

## Default Database Credentials

H2 Database (In-Memory):
```
JDBC URL: jdbc:h2:mem:student_management_system
Username: sa
Password: (empty)
H2 Console: http://localhost:8080/sms/h2-console
```

To change these, edit:
```
backend/src/main/resources/application.properties
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Connection refused" from frontend | Ensure backend is running on port 8080 |
| Frontend shows "Loading..." forever | Check browser console (F12) for CORS errors |
| H2 console not accessible | Visit http://localhost:8080/sms/h2-console |
| Data not persisting | H2 is in-memory - data resets on restart |
| Port 8080 already in use | Stop other applications or change port in application.properties |

## Project Files

```
student-management-system/
├── backend/                      # Spring Boot Application
│   ├── pom.xml                  # Maven dependencies
│   └── src/main/java/...        # Java source code
├── frontend/                     # Web Application
│   ├── index.html               # Main page
│   ├── styles.css               # Styling
│   └── script.js                # JavaScript logic
├── database_schema.sql          # Database setup
└── README.md                    # Full documentation
```

## API Examples

### View All Students
```
http://localhost:8080/sms/api/students?page=0&size=10
```

### Search Students
```
http://localhost:8080/sms/api/students/search?query=Rahul
```

### Add Student (POST)
```
curl -X POST http://localhost:8080/sms/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Student",
    "studentId": "STU100",
    "email": "new@example.com",
    "phone": "9876543210",
    "course": "B.Tech CSE",
    "gpa": 3.8,
    "address": "123 Street, City"
  }'
```

## Next Steps

1. ✅ Run the application
2. ✅ Test all features
3. ✅ Customize the UI if needed
4. ✅ Add more students
5. ✅ Deploy to production

For full documentation, see **README.md**

Need Help? Check the README.md file for detailed troubleshooting.
