# QuickChat — Realtime Chat Application

A full-stack realtime chat application with authentication, profile management, and live messaging using **React**, **Node.js/Express**, **MongoDB**, and **Socket.IO**.

## Features

- User authentication (signup/login) with JWT
- Protected routes and auth session check
- Realtime online user tracking with Socket.IO
- One-to-one messaging support (text + image)
- Message seen/unseen tracking
- Profile update support (name, bio, avatar)
- Cloudinary integration for image uploads

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, Axios, React Router |
| Backend | Node.js, Express, Socket.IO |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Media | Cloudinary |

## Project Structure

```text
chatApp/
├── chatApp/                 # Frontend (React + Vite)
│   ├── src/
│   ├── context/
│   └── package.json
├── server/                  # Backend (Express + Socket.IO)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── package.json
└── readme.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adarsh1912-dev/chatApp.git
cd chatApp
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start backend:

```bash
npm run server
```

### 3. Frontend setup

Open a new terminal:

```bash
cd chatApp
npm install
```

Create `chatApp/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

## Available Scripts

### Frontend (`/chatApp`)

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build

### Backend (`/server`)

- `npm start` — run server with Node
- `npm run server` — run server with Nodemon

## API Overview

### Auth routes (`/api/auth`)

- `POST /signup`
- `POST /login`
- `GET /check` (protected)
- `PUT /update-profile` (protected)

### Message routes (`/api/messages`)

- `GET /users` (protected)
- `GET /:id` (protected)
- `GET /mark/:id` (protected)
- `POST /send/:id` (protected)

## Notes

- Frontend and backend must run simultaneously.
- Socket.IO uses the authenticated user ID to map active connections.
- Image uploads are handled by Cloudinary on the backend.

## License

This project is licensed under the ISC License.
