# Api-for-messaging-app-

A simple Node.js/Express API for user authentication and messaging, using MongoDB and JWT.

## Features

- User registration and login (with JWT authentication)
- Send and receive messages between users
- MongoDB Atlas for data storage

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Emmyu/Api-for-messaging-app-.git
   cd Api-for-messaging-app-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   JWT_SECRET=your_jwt_secret
   MONGO_URI_ATLAS=your_mongodb_atlas_uri
   ```

### Running the Server

```bash
node server.js
```

The server will run at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Auth

- `POST /auth/register`  
  Register a new user.  
  **Body:** `{ "username": "yourname", "password": "yourpass" }`

- `POST /auth/login`  
  Login and receive a JWT token.  
  **Body:** `{ "username": "yourname", "password": "yourpass" }`

### Messages

- `POST /messages/send`  
  Send a message to another user.  
  **Headers:** `Authorization: Bearer <token>`  
  **Body:** `{ "toUsername": "recipient", "content": "Hello!" }`

- `GET /messages`  
  Get messages for the logged-in user.  
  **Headers:** `Authorization: Bearer <token>`

