Here's an updated version of your README to address potential inconsistencies and clarify the setup and API details. Changes include corrections to commands, descriptions, and structure for better accuracy and readability. 

---

### **README for User Backend**
```markdown
# User Backend

This backend service handles user-specific functionalities, including authentication, note management, and secure data sharing with the Admin Backend.

---

## **Features**
1. **Authentication**
   - `POST /auth/register`: Register a new user.
   - `POST /auth/login`: Log in as a user and receive a JWT.

2. **User-Specific Operations**
   - `GET /notes`: Fetch all notes for the authenticated user.
   - `POST /notes`: Create a new note.
   - `PATCH /notes/:id`: Update a specific note.
   - `DELETE /notes/:id`: Delete a specific note.

3. **Secret API for Admin Backend**
   - `GET /admin/notes`: Fetch all notes data for admin (restricted to admin tokens).
   - `GET /admin/users`: Fetch all users registered in Backend 1.
   - `GET /admin/users/:id`: Fetch details of a specific user.
   - `DELETE /admin/users/:id`: Delete a specific user.

---

## **Setup Instructions**
1. Clone the repository:
   ```bash
   git clone https://github.com/Sahil1551/Medoc_Assignment1.git
   cd .\Backend1\
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


3. Start the server:
   ```bash
   node dist/server.js
   ```

---

## **API Endpoints**
| Endpoint             | Method | Description                          |
|----------------------|--------|--------------------------------------|
| `/auth/register`     | POST   | Register a new user                 |
| `/auth/login`        | POST   | Log in as a user and receive a JWT  |
| `/notes`             | GET    | Fetch all notes for the authenticated user |
| `/notes`             | POST   | Create a new note                   |
| `/notes/:id`         | PATCH  | Update a specific note              |
| `/notes/:id`         | DELETE | Delete a specific note              |

### **Secret API Endpoints for Admin Backend**
| Endpoint             | Method | Description                          |
|----------------------|--------|--------------------------------------|
| `/admin/notes`       | GET    | Fetch notes data for admin           |
| `/admin/users`       | GET    | Fetch all users data                 |
| `/admin/users/:id`   | GET    | Fetch a specific user's data         |
| `/admin/users/:id`   | DELETE | Delete a specific user               |

---

## **Technologies Used**
- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **JWT Authentication**

---

### **README for Admin Backend**
```markdown
# Admin Backend

This backend service handles administrative operations, including user management, audit logging, and secure data sharing with the User Backend.

---

## **Features**
1. **Authentication**
   - `POST /auth/register`: Register as an admin.
   - `POST /auth/login`: Log in as an admin and receive a JWT.

2. **Administrative Operations**
   - `GET /auth/users`: Fetch all user profiles from the User Backend via secure API calls.
   - `GET /auth/users/:id`: Fetch details of a specific user from the User Backend via secure API calls.
   - `DELETE /auth/users/:id`: Delete a user profile from the User Backend via secure API calls.
   - `GET /auth/notes`: Fetch notes data from the User Backend via secure API calls.
   - `GET /auth/logs`: Fetch Audit logs data from the Admin Backend .

3. **Cross-Backend Communication**
   - Secure API calls to fetch shared user and notes data from the User Backend.

---

## **Setup Instructions**
1. Clone the repository:
   ```bash
   git clone https://github.com/Sahil1551/Medoc_Assignment1.git
   cd .\Backend2\
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


4. Start the server:
   ```bash
   npm dist/server.js
   ```

---
Here’s the updated **API Endpoints** section for the Admin Backend, aligned with the features you provided:

---

## **API Endpoints**
| **Endpoint**         | **Method** | **Description**                                                                 |
|-----------------------|------------|---------------------------------------------------------------------------------|
| `/auth/register`      | POST       | Register as an admin.                                                          |
| `/auth/login`         | POST       | Log in as an admin and receive a JWT.                                          |
| `/auth/users`         | GET        | Fetch all user profiles from the User Backend via secure API calls.            |
| `/auth/users/:id`     | GET        | Fetch details of a specific user from the User Backend via secure API calls.    |
| `/auth/users/:id`     | DELETE     | Delete a user profile from the User Backend via secure API calls.              |
| `/auth/notes`         | GET        | Fetch notes data from the User Backend via secure API calls.                   |
| `/auth/logs`          | GET        | Fetch audit log data from the Admin Backend.                                   |

---


## **Technologies Used**
- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **JWT Authentication**
```

---

### **Root README for the Repository**
```markdown
# SWE Backend Assignment

This repository contains two backend services designed to showcase role-based access control (RBAC) and secure data sharing.

---


---

## **Features**
- **Role-Based Access Control (RBAC)**
- **Cross-Backend Secure API Communication**
- **Input Validation and Error Handling**
- **Modular Code Design**

---
```
