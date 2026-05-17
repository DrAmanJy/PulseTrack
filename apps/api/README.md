# PulseTrack API

## Overview
PulseTrack Express API is the backend service for the PulseTrack application. It is built using Node.js, Express, and MongoDB.

## Tech Stack
- **Framework:** Express (v5)
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **Email Service:** Resend
- **Validation:** Zod
- **API Security:** Express Rate Limit, Cookie Parser

## Directory Structure
- `src/config/`: Configuration files (e.g., database connection, environment variables).
- `src/modules/`: Domain-driven business logic modules (e.g., `auth`).
- `src/shared/`: Shared resources across the application, including:
  - `errors/`: Custom error handling classes.
  - `middleware/`: Express middleware (e.g., authentication, error handling).
  - `utils/`: Reusable utility functions.
- `src/app.js`: Express application configuration and middleware setup.
- `src/server.js`: Application entry point to start the server.

## Scripts
- **Development:** `pnpm dev` (Runs the development server using nodemon, loading variables from `.env`)
- **Production:** `pnpm start` (Runs the server using node, loading variables from `.env`)

## Internal Dependencies
This API is part of a monorepo and leverages internal packages:
- `@pulsetrack/emails`: Email templates and services.
- `@pulsetrack/validations`: Shared validation schemas.
