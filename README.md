# Backend API for Event Management System

This is the **backend API** built using **Node.js**, **Express**, and **MongoDB** for the Event Management System. It handles event creation, user registration, and event participation logic.

---

## 🌐 Live URL

**Render Deployment**:  
➡️ [`https://event-management-api-l5un.onrender.com`](https://event-management-api-l5un.onrender.com)

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- cors
- Render (for deployment)

---

## 📁 Project Structure

```bash
.
├── server.js               # Entry point of the app
├── /routes                 # API route files
├── /controllers            # Logic for each route
├── /models                 # Mongoose schemas
├── /middlewares            # Authentication or error handling
├── /config                 # DB config
├── .env                    # Environment variables 
├── .gitignore
├── package.json
└── README.md

```

---


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/samrat-ghosh-007/Event-Management-API.git
cd Event-Management-API
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

Create a .env file in the root directory:
```bash
MONGO_URI=your-mongodb-uri
```

### 4. Start the Server

```bash
npm start
```
Run the server at `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint                                     | Description                        |
|--------|----------------------------------------------|------------------------------------|
| POST   | `/api/events`                                | Create an Event                    |
| GET    | `/api/events/:eventId`                       | Details of an Event                |
| POST   | `/api/events/:eventId/register/:userId`      | Registration of an User to an Event|
| DELETE | `/api/events/:eventId/cancel/:userId`        | Cancels Registration               |
| GET    | `/api/events/upcoming/all`                   | Shows the Upcoming Events          |
| POST   | `/api/events/:eventId/register/:userId`      | Registration of User to an Event   |
| GET    | `/api/events/:eventId/stats`                 | Shows the Statistics of an Event   |
| POST   | `/api/users`                                 | Creates User                       |
| DELETE | `/api/users/:userId`                         | Deletes the User                   |

---

## Example API Requests & Responses

### 1. Create Event

**POST** `/api/events`

**Request Body:**
```json
{
  "title": "Tech Summit 2025",
  "dateTime": "2025-08-01T09:00:00Z",
  "location": "Mumbai",
  "capacity": 100
}
```

**Response:**
```json
{
  "_id": "64f00b5d9c1eaf1f04b739a9",
  "title": "Tech Summit 2025",
  "dateTime": "2025-08-01T09:00:00.000Z",
  "location": "Mumbai",
  "capacity": 100,
  "registrations": []
}
```

## 2. Get Event Details (Including Registered Users)

**POST** `/api/events/:eventId`

**Response:**
```json
{
  "_id": "64f00b5d9c1eaf1f04b739a9",
  "title": "Tech Summit 2025",
  "dateTime": "2025-08-01T09:00:00.000Z",
  "location": "Mumbai",
  "capacity": 100,
  "registrations": [
    {
      "_id": "64f00c1eaf1f7b004b739b2d",
      "name": "Alice Sharma",
      "email": "alice@example.com"
    }
  ]
}
```

## 3. Register a User to Event

**POST** `/api/events/:eventId/register/:userId`

**Success Response:**
```json
{
  "message": "User registered successfully"
}
```

**Already Registered:**
```json
{
  "message": "User already registered"
}
```

**Event Full:**
```json
{
  "message": "Event is full"
}
```

## 4. Cancel Registration

**DELETE** `/api/events/:eventId/cancel/:userId`

**Success Response:**
```json
{
  "message": "Registration cancelled successfully"
}
```

**Not Registered:**
```json
{
  "message": "User not registered for this event"
}
```

## 5. Get All Upcoming Events

**GET** `/api/events/upcoming/all`

**Response:**
```json
[
  {
    "_id": "64f00b5d9c1eaf1f04b739a9",
    "title": "Tech Summit 2025",
    "dateTime": "2025-08-01T09:00:00.000Z",
    "location": "Mumbai",
    "capacity": 100,
    "registrations": [ /* Array of users */ ]
  },
  ...
]
```

## 6. Get Event Stats

**GET** `/api/events/:eventId/stats`

**Response:**
```json
{
  "eventId": "64f00b5d9c1eaf1f04b739a9",
  "totalRegistrations": 47,
  "remainingSeats": 53,
}
```

## 7. Create User

**POST** `/api/users`

**Request Body:**
```json
{
  "name": "Alice Sharma",
  "email": "alice@example.com"
}
```

**Success Response:**
```json
{
  "_id": "64f01aef2d3aab1a90b81234",
}
```

**Error (Duplicate Email)**
```json
{
  "message": "User with this email already exists"
}
```

## 8. Delete User

**DELETE** `/api/users/:userId`

**Success Response:**
```json
{
  "message": "User deleted successfully"
}
```

**Error (User not Found)**
```json
{
  "message": "User not found"
}
```

---


## 🧾 License
This project is submitted as part of a technical internship task.  
Developed by **Samrat Ghosh**.



















