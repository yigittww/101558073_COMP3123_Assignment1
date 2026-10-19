# COMP 3123 - Assignment 1 (Backend)

## Project Overview
A secure RESTful backend API built using Node.js, Express, and MongoDB. This application provides user registration and authentication, JWT-based authorization, and employee CRUD operations. A key security feature is that users can only view and manage employees they created themselves. 

## Technologies Used
* Node.js & Express.js
* MongoDB & Mongoose
* JWT (JSON Web Tokens)
* bcrypt (Password Hashing)
* Helmet (Security Headers)
* express-rate-limit (Rate Limiting)
* express-validator (Input Validation)

## Setup Instructions
1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file in the root directory. Add your specific `PORT`, `MONGODB_URI` and `JWT_SECRET`.
4. Start the server by running `npx nodemon server.js`.

## API Endpoints

### User APIs
* **POST** `/api/v1/user/signup` - Register a new user.
* **POST** `/api/v1/user/login` - Authenticate a user and return a JWT.

### Employee APIs (Protected - Requires JWT)
* **GET** `/api/v1/emp/employees` - Get all employees owned by the authenticated user.
* **POST** `/api/v1/emp/employees` - Create a new employee for the authenticated user.
* **GET** `/api/v1/emp/employees/{eid}` - Get specific employee details.
* **PUT** `/api/v1/emp/employees/{eid}` - Update specific employee details.
* **DELETE** `/api/v1/emp/employees?eid={eid}` - Delete an employee.

### Health Check
* **GET** `/health` - Returns `200 OK` and confirms the server is running smoothly.

## Security & Authentication
* **JWT:** Required for all employee routes. Passed via `Authorization: Bearer <token>` header.
* **Authorization:** The database relationship ensures users can only access/modify employees tied to their `user_id`.
* **Password Hashing:** Implemented via `bcrypt` before saving to MongoDB.
* **Rate Limiting:** Protects the API routes from brute-force attacks (limit set to 100 requests per 15 minutes).
* **Helmet:** Adds secure HTTP headers to all responses.
* **Input Validation:** Done using `express-validator` to ensure required fields and correct formats.

## Local Logging
API requests and HTTP methods are logged locally to `app.log` using a custom middleware. Sensitive data is intentionally excluded from these logs.