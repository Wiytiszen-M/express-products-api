# Products API

Backend API built with Node.js, Express and PostgreSQL.

## Overview

This project is a REST API for managing products and categories. It includes authentication with JWT, role-based authorization, PostgreSQL persistence, validation with Zod, and a clean layered architecture.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- pg
- Zod
- bcrypt
- JSON Web Token
- dotenv
- cors

## Main Features

- Products CRUD
- Categories endpoints
- PostgreSQL database integration
- Product-category relationship using foreign keys
- Query params for filtering, sorting and pagination
- Zod request validation
- Centralized error handling
- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Role-based authorization
- CORS configuration
- Environment variables with dotenv

## Architecture

The project follows a layered structure:

route → middleware → controller → service → repository → PostgreSQL

## Layers

routes
Define endpoints and attach middlewares.

middlewares
Handle validation, authentication, authorization and errors.

controllers
Read request data, call services and return responses.

services
Handle business logic.

repositories
Access PostgreSQL using SQL queries.

validations
Define request schemas with Zod.

## Proyect Structure

src/
├─ config/
│ └─ database.js
├─ controllers/
│ ├─ auth.controller.js
│ ├─ category.controller.js
│ └─ product.controller.js
├─ errors/
│ └─ AppError.js
├─ middlewares/
│ ├─ authMiddleware.js
│ ├─ authorizeRoles.js
│ ├─ errorHandler.js
│ ├─ notFound.js
│ ├─ requestLogger.js
│ └─ validateRequest.js
├─ repositories/
│ ├─ category.repository.js
│ ├─ product.repository.js
│ └─ user.repository.js
├─ routes/
│ ├─ auth.routes.js
│ ├─ category.routes.js
│ └─ product.routes.js
├─ services/
│ ├─ auth.service.js
│ ├─ category.service.js
│ └─ product.service.js
├─ utils/
│ ├─ asyncHandler.js
│ ├─ generateToken.js
│ └─ sendResponse.js
├─ validations/
│ ├─ auth.validation.js
│ ├─ category.validation.js
│ └─ product.validation.js
├─ app.js
└─ server.js

## What I Practiced

Building a REST API with Express
Structuring backend code in layers
Using PostgreSQL from Node.js
Writing SQL queries with parameters
Avoiding SQL injection
Modeling relations with foreign keys
Validating requests with Zod
Handling errors globally
Implementing authentication with JWT
Protecting routes with middleware
Integrating a React frontend with an Express backend
