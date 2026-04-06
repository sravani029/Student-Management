# Student Management System - Configuration Guide

## Backend Configuration (application.properties)

The main configuration file is located at:
```
backend/src/main/resources/application.properties
```

### Current Configuration

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/sms

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/student_management_system?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=INFO
logging.level.com.studentms=DEBUG
```

## Customization Options

### Change Server Port
```properties
server.port=9000
```
Access the API: `http://localhost:9000/sms/api/students`

### Remote Database Connection
```properties
spring.datasource.url=jdbc:mysql://192.168.1.100:3306/student_management_system?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Change Context Path
```properties
server.servlet.context-path=/api/v1
```
Access the API: `http://localhost:8080/api/v1/api/students`

### Disable Schema Updates
```properties
spring.jpa.hibernate.ddl-auto=validate
```
This prevents automatic table creation.

### Enable SQL Logging
```properties
spring.jpa.show-sql=true
```
See SQL queries in console.

## Frontend Configuration

### API Base URL
Edit in `frontend/script.js`:

```javascript
// Line 1
const API_BASE_URL = 'http://localhost:8080/sms/api/students';
```

To connect to a remote server:
```javascript
const API_BASE_URL = 'http://your-server.com/sms/api/students';
```

## Database Configuration

### Connection String Format
```
jdbc:mysql://[host]:[port]/[database]?[options]
```

### Common Options
- `useSSL=false` - Disable SSL (for local development)
- `serverTimezone=UTC` - Set timezone
- `allowPublicKeyRetrieval=true` - Allow public key retrieval

### Example Configurations

**Local Development:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_management_system?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
```

**Production with SSL:**
```properties
spring.datasource.url=jdbc:mysql://prod-db.com:3306/student_db?useSSL=true&serverTimezone=UTC
spring.datasource.username=prod_user
spring.datasource.password=secure_password
```

## Environment-Specific Configurations

### Development Configuration
```properties
# application-dev.properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/student_management_system?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=create-drop
logging.level.root=DEBUG
```

### Production Configuration
```properties
# application-prod.properties
server.port=8080
spring.datasource.url=jdbc:mysql://prod-server:3306/student_db?useSSL=true&serverTimezone=UTC
spring.datasource.username=prod_user
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate
logging.level.root=WARN
```

### Run with Specific Profile
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=prod"
```

## Browser Storage & Performance

### Optimize Frontend Performance

Edit `frontend/styles.css` for Gzip compression:
```css
/* Add to the top of styles.css */
/* gzip: compress: true; */
```

### Browser Console Issues?
If you see CORS errors, ensure backend has proper cross-origin settings.
Backend is already configured with `@CrossOrigin(origins = "*")`.

## Logging Configuration

### Log Levels
- `TRACE` - Very detailed information
- `DEBUG` - Detailed information for debugging
- `INFO` - General information
- `WARN` - Warning messages
- `ERROR` - Error messages
- `FATAL` - Fatal errors

Current Setup:
- Root Level: `INFO` (general info and above)
- Application Level: `DEBUG` (detailed debugging)

To change:
```properties
logging.level.root=WARN
logging.level.com.studentms=INFO
```

## Pagination Configuration

### Page Size
Currently set to 10 students per page in `frontend/script.js`:

```javascript
const pageSize = 10;
```

Change this value to display more/fewer students per page.

## Security Notes

⚠️ **Important for Production:**

1. Change default database password
2. Use environment variables for sensitive data
3. Enable SSL for remote connections
4. Restrict CORS origins
5. Implement authentication
6. Use HTTPS in production

Example with environment variables:
```properties
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

## Troubleshooting Tips

1. **Connection Issues**: Check MySQL host and port
2. **Authentication Errors**: Verify username and password
3. **CORS Errors**: Check frontend API_BASE_URL
4. **Data Not Showing**: Check database has data and migrations ran
5. **Performance Issues**: Check database indexes and query logs

## Quick Reference

| Setting | File | Default | Purpose |
|---------|------|---------|---------|
| Server Port | application.properties | 8080 | Backend port |
| Context Path | application.properties | /sms | API base path |
| DB Host | application.properties | localhost | Database server |
| DB Port | application.properties | 3306 | MySQL port |
| API Base URL | script.js | localhost:8080 | Frontend connection |
| Page Size | script.js | 10 | Students per page |
| Auto DDL | application.properties | update | Schema updates |

For more help, refer to Spring Boot documentation:
https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/
