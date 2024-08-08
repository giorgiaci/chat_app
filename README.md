# Chat Application
- Node.js for the backend.
- Angular for the frontend.
- MongoDB as a Platform as a Service (PaaS) for database management.
- JWT (JSON Web Token) for API call authentication and token validation.
- Socket.io for real-time communication between clients and the server.

## Features

- Real-time Messaging**: Chat with other users instantly.
- Secure Authentication**: User login and registration are secured with JWT.
- Cloud Database**: Data is stored and managed using MongoDB as a service.
- Stand alone angualr components.

## Configuration

### Backend Configuration
The backend is built with Node.js and uses Express for handling routes, and Mongoose for MongoDB object modeling.

### Frontend Configuration
The frontend is developed with Angular and connects to the backend to handle user authentication and chat functionality.

## Environment Configuration

The connection string for MongoDB is stored in the `.env` file. This file is used by the `config-env.js` script, which handles all environment variables required for the application.

### Env files

1. **Environment File**: 
   - The `.env` file contains sensitive information, including the MongoDB connection strings.
   - Example entry in `.env`:
     ```
     MONGODB_URI=mongodb://username:password@host:port/database
     ```

2. **Configuration File**:
   - The `config-env.js` file reads the variables from the `.env` file.
   - It ensures that all environment-specific settings are available throughout the application.

### Usage

Ensure that your `.env` file is correctly set up before starting the application. The `config-env.js` script will automatically load these settings into the application's environment.

**Note**: Do not commit the `.env` file to version control. Instead, check the `.env.example` file I provided as a template.
