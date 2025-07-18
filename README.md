# Leaderboard Application

## Overview
The Leaderboard Application is a web-based platform designed to display user rankings and claim history. It features a responsive frontend built with React and a backend powered by Node.js/Express, connected to a MongoDB Atlas database. The project demonstrates modern web development practices, including API integration, state management, and deployment on cloud platforms.

- **Frontend**: React application hosted on Netlify.
- **Backend**: Express server hosted on Render, managing API requests and database interactions.
- **Database**: MongoDB Atlas for storing user and history data.

## Features
- Display a list of users with their total points.
- Highlight the top three users with avatars and rankings.
- View claim history for selected users.
- Add new users and claim points via the frontend interface.
- Automatic selection of the first user on load.

## Installation

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/Ashwin454/leaderboard-app
   cd leaderboard-app/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   MONGODB_URI
   PORT
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd leaderboard-app/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   node server.js
   ```

## Deployment
- **Frontend**: Deployed on Netlify. Push the `frontend` directory to a GitHub repository and connect it to Netlify for automatic deployment.
- **Backend**: Deployed on Render. Push the `backend` directory to a GitHub repository, create a new web service on Render, and set the environment variables.
- **Keep Alive**: The backend includes a self-pinging mechanism to prevent Render inactivity (pinging every 10 minutes).

### Deployed URLs
- Frontend: [https://leaderboard-app-1.netlify.app/](https://leaderboard-app-1.netlify.app/) (replace with your Netlify URL)
- Backend API: [https://leaderboard-app-iq8m.onrender.com](https://leaderboard-app-iq8m.onrender.com) (replace with your Render URL)

## API
The backend provides the following endpoints:
- `GET /api/v1/users/get`: Retrieve the list of users.
- `POST /api/v1/users/create`: Creates a user on given name as input.
- `GET /api/v1/users/claim`: Gives random points(1 to 10) to the user whose _id is given as input
- `GET /api/v1/history/get`: Retrieve the claim history.
- `GET /ping`: End point for keeping the webserice alive on render.
