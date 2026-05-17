# PulseTrack API Contract

This document outlines the API endpoints available in the PulseTrack application, derived from the routing definitions across various modules.

> **Note**: Base paths (e.g., `/api/v1/auth`) may vary depending on how these routers are mounted in the main Express application (`app.js` or `main.js`). The paths below are relative to their respective module routers.

---

## 1. Activities API
**Module path usually mounted at:** `/activities`

| Method | Endpoint | Description | Middleware/Validation |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Create a new activity | `requireAuth`, `validate(activitySchema)` |
| `GET` | `/` | Retrieve a list of activities | `requireAuth` |
| `GET` | `/:id` | Retrieve an activity by ID | `requireAuth`, `validateId` |
| `PATCH` | `/:id` | Update an activity by ID | `requireAuth`, `validateId`, `validate(updateActivitySchema)` |
| `DELETE` | `/:id` | Delete an activity by ID | `requireAuth`, `validateId` |

---

## 2. Analytics API
**Module path usually mounted at:** `/analytics`

| Method | Endpoint | Description | Middleware/Validation |
| :--- | :--- | :--- | :--- |
| `GET` | `/categories` | Retrieve category statistics | `requireAuth` |
| `GET` | `/trends` | Retrieve weekly trend data | `requireAuth` |
| `GET` | `/summary` | Retrieve dashboard summary | `requireAuth` |

---

## 3. Auth API
**Module path usually mounted at:** `/auth`

### Local Authentication
| Method | Endpoint | Description | Middleware/Validation |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | `authLimiter`, `validate(registerSchema)` |
| `POST` | `/login` | Authenticate user & get tokens | `authLimiter`, `validate(loginSchema)` |
| `POST` | `/logout` | Invalidate user session/tokens | `requireAuth` |

### Google OAuth (Currently Not Implemented)
| Method | Endpoint | Description | Middleware/Validation |
| :--- | :--- | :--- | :--- |
| `GET` | `/google` | Initiate Google OAuth flow | `authLimiter` |
| `GET` | `/google/callback`| Google OAuth callback handling| `authLimiter` |

### OTP & Password Recovery
| Method | Endpoint | Description | Middleware/Validation |
| :--- | :--- | :--- | :--- |
| `POST` | `/verify` | Verify user OTP | `authLimiter`, `validate(verifyOtpSchema)` |
| `POST` | `/resend-otp` | Resend verification OTP | `otpLimiter`, `validate(emailOnlySchema)` |
| `POST` | `/forgot-password`| Request password reset link | `authLimiter`, `validate(emailOnlySchema)` |
| `POST` | `/reset-password/:token`| Reset password via token | `authLimiter`, `validate(newPasswordOnlySchema)` |

### Token Management
| Method | Endpoint | Description | Middleware/Validation |
| :--- | :--- | :--- | :--- |
| `POST` | `/refresh-token` | Refresh expired access token | None |

---

## 4. User API
**Module path usually mounted at:** `/user` (or `/users`)

| Method | Endpoint | Description | Middleware/Validation |
| :--- | :--- | :--- | :--- |
| `GET` | `/me` | Get current user's profile | `requireAuth` |
| `PATCH` | `/me` | Update current user's profile | `requireAuth`, `upload.single('profile')`, `validate(avatarSchema, 'file')`, `validate(updateUserSchema)` |
| `DELETE` | `/me` | Delete current user's account | `requireAuth` |
| `PATCH` | `/update-password`| Update user password | `requireAuth`, `validate(updatePasswordSchema)` |
| `PATCH` | `/update-email` | Update user email address | `requireAuth`, `validate(updateEmailSchema)` |
