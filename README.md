# educationELLy Server

![Node.js](https://img.shields.io/badge/Node.js-v10.11.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.17.1-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=JSON%20web%20tokens)
![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)

## Overview

**educationELLy Server** is the backend API for the educationELLy application - a comprehensive platform designed to support English Language Learning (ELL) students and their teachers. This Express.js server provides secure authentication, RESTful API endpoints, and data persistence for managing ELL student information.

The platform bridges the gap between ELL specialists and mainstream classroom teachers by providing centralized access to student language proficiency data, fostering collaboration, and enabling all teachers to participate in the language learning process.

## Features

- 🔐 **Secure Authentication** - JWT-based authentication with Passport.js
- 📊 **Student Management** - Full CRUD operations for ELL student profiles
- 🔒 **Protected Routes** - Role-based access control for sensitive data
- 📱 **RESTful API** - Clean, intuitive API design following REST principles
- 🚀 **Production Ready** - Deployed on Heroku with MongoDB Atlas
- ✅ **Validation** - Input validation and error handling

## Demo Account

To explore the application, you can use the following demo credentials:

```
Email: demo@example.com
Password: demopassword
```

## Getting Started

### Prerequisites

- Node.js (v10.11.0 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/maxjeffwell/full-stack-capstone-server.git
   cd full-stack-capstone-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost/educationelly
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   PORT=8080
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:8080` with automatic reloading via nodemon.

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | No |
| POST | `/signin` | Login user (returns JWT) | No |
| GET | `/logout` | Logout current user | Yes |
| GET | `/whoami` | Get current user info | Yes |

### Student Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/students` | Get all students | Yes |
| GET | `/students/:id` | Get student by ID | Yes |
| POST | `/students` | Create new student | Yes |
| PUT | `/students/:id` | Update student | Yes |
| DELETE | `/students/:id` | Delete student | Yes |

### Request/Response Examples

#### Register User
```bash
POST /signup
Content-Type: application/json

{
  "email": "teacher@school.edu",
  "password": "securepassword123"
}

Response: 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Create Student
```bash
POST /students
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe",
  "school": "Lincoln Elementary",
  "teacher": "Ms. Smith",
  "gradeLevel": 5,
  "nativeLanguage": "Spanish",
  "ellStatus": "Intermediate",
  "designation": "ELL"
}
```

## Project Structure

```
educationELLy-server/
├── controllers/
│   └── authentication.js    # Auth logic (signup/signin)
├── models/
│   ├── student.js          # Student schema
│   └── user.js             # User schema with password hashing
├── services/
│   └── passport.js         # JWT & Local strategies
├── test/
│   ├── server.test.js      # Server tests
│   └── user.test.js        # Auth tests
├── index.js                # Express server setup
├── router.js               # Route definitions
├── .env                    # Environment variables
├── .babelrc                # Babel configuration
├── .eslintrc.js            # ESLint rules
├── package.json            # Dependencies & scripts
└── Procfile                # Heroku deployment
```

## Authentication & Security

### JWT Authentication Strategy

The server implements a stateless JWT (JSON Web Token) authentication system using Passport.js:

- **Token Generation**: JWTs are created upon successful login/signup containing user ID and timestamp
- **Token Expiration**: Tokens expire after 7 days for security
- **Token Validation**: Every protected route validates the JWT from the Authorization header
- **Stateless Design**: No server-side session storage - tokens contain all necessary auth information
- **Bearer Token Format**: Clients must send tokens as `Authorization: Bearer <token>`

The JWT strategy extracts tokens from request headers, verifies signatures using the `JWT_SECRET`, and validates token expiration. Invalid or expired tokens are automatically rejected.

## Technologies

### Core
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **JWT** - Secure token-based auth

### Security
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development
- **Nodemon** - Auto-restart on file changes
- **Babel** - ES6+ transpilation
- **ESLint** - Code linting
- **Mocha/Chai** - Testing framework

## Testing

Run the test suite:
```bash
npm run test2
```

The test suite includes:
- Server connection tests
- Authentication flow tests
- API endpoint tests
- Error handling tests

## Deployment

### Heroku Deployment

1. Create a Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_production_secret
   ```

3. Deploy:
   ```bash
   git push heroku master
   ```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost/local` |
| `JWT_SECRET` | Secret for JWT signing | Required |
| `NODE_ENV` | Environment (production/development) | `development` |
| `PORT` | Server port | `8080` |

## Next Steps

### Immediate Priorities
- [ ] **Add Comprehensive Testing** - Expand test coverage to include all endpoints and edge cases
- [ ] **Implement Rate Limiting** - Add protection against API abuse and brute force attacks
- [ ] **Add Request Validation** - Implement robust input validation using Joi or express-validator
- [ ] **Enhanced Error Handling** - Create custom error classes and centralized error handling middleware

### Feature Enhancements
- [ ] **Role-Based Access Control** - Implement teacher/admin/student roles with different permissions
- [ ] **Progress Tracking API** - Add endpoints for tracking student language learning progress over time
- [ ] **Bulk Operations** - Support bulk student imports via CSV/Excel
- [ ] **Real-time Updates** - Implement WebSocket support for real-time notifications
- [ ] **File Upload** - Add support for student document/assessment uploads
- [ ] **API Versioning** - Implement versioned endpoints (e.g., /api/v1/students)

### Performance & Scalability
- [ ] **Database Indexing** - Add MongoDB indexes for frequently queried fields
- [ ] **Caching Layer** - Implement Redis for caching frequently accessed data
- [ ] **Pagination** - Add pagination support for student list endpoints
- [ ] **Query Optimization** - Implement field selection and populate optimization

### Documentation & Developer Experience
- [ ] **API Documentation** - Generate interactive API docs using Swagger/OpenAPI
- [ ] **Postman Collection** - Create and maintain a Postman collection for easy API testing
- [ ] **Docker Support** - Add Dockerfile and docker-compose for containerized development
- [ ] **CI/CD Pipeline** - Set up GitHub Actions for automated testing and deployment

### Security Enhancements
- [ ] **Refresh Tokens** - Implement JWT refresh token mechanism
- [ ] **Password Reset** - Add forgot password functionality with email verification
- [ ] **Two-Factor Authentication** - Optional 2FA for enhanced security
- [ ] **Audit Logging** - Track all data modifications for compliance

### Integration Features
- [ ] **Email Notifications** - Send updates about student progress
- [ ] **Export Functionality** - Generate PDF/Excel reports of student data
- [ ] **Third-party Integrations** - Connect with school management systems
- [ ] **Backup Strategy** - Implement automated database backups

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Author

**Jeff Maxwell**
- Email: [maxjeffwell@gmail.com](mailto:maxjeffwell@gmail.com)
- GitHub: [@maxjeffwell](https://github.com/maxjeffwell)
- Portfolio: [https://www.el-jefe.me](https://www.el-jefe.me)

## Acknowledgments

- Thanks to all contributors who have helped shape educationELLy
- Special recognition to ELL teachers and specialists who provided valuable feedback
- Built with ❤️ for the education community