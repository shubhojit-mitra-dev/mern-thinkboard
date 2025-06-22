# ThinkBoard - MERN Stack Note Taking Application

ThinkBoard is a full-stack note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, read, update, and delete notes with a clean and intuitive interface.

## 🚀 Features

- ✨ Create, read, update, and delete notes
- 🎨 Clean and responsive UI built with DaisyUI and Tailwind CSS
- 🚦 Rate limiting to prevent API abuse (100 requests per minute)
- 🔔 Real-time feedback with toast notifications
- 📱 Mobile-friendly responsive design
- ⚡ Fast performance with Vite build system
- 🌙 Dark theme with forest theme from DaisyUI

## 🔧 Technology Stack

### Frontend
- **React** (v19.1.0) - JavaScript library for building user interfaces
- **Vite** (v6.3.5) - Next-generation frontend build tool
- **React Router** (v7.6.2) - Declarative routing for React applications
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **DaisyUI** (v4.12.24) - Component library for Tailwind CSS
- **Axios** (v1.9.0) - Promise-based HTTP client for API requests
- **React Hot Toast** (v2.5.2) - Lightweight toast notifications
- **Lucide React** (v0.515.0) - Beautiful & consistent icon set

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** (v4.18.2) - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.15.1) - MongoDB object modeling for Node.js
- **Upstash Redis** - Serverless Redis for rate limiting
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing middleware
- **dotenv** (v16.5.0) - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB Atlas account** - [Sign up here](https://www.mongodb.com/atlas)
- **Upstash Redis account** - [Sign up here](https://upstash.com/) (for rate limiting)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-thinkboard.git
cd mern-thinkboard
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install backend dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```bash
touch .env
```

Add the following environment variables to your `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

**How to get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster or use existing one
3. Go to Database Access and create a user
4. Go to Network Access and add your IP (0.0.0.0/0 for development)
5. Click "Connect" → "Connect your application" → Copy the connection string

**How to get Upstash Redis credentials:**
1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Copy the REST URL and REST TOKEN from the database details

Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install frontend dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── config/                    # Configuration files
│   │   ├── db.js                 # MongoDB connection setup
│   │   └── upstash.js            # Redis configuration for rate limiting
│   ├── controllers/
│   │   └── notesController.js    # Business logic for note operations
│   ├── middlewares/
│   │   └── ratelimiter.middleware.js  # Rate limiting middleware
│   ├── models/
│   │   └── Note.js               # Mongoose schema for notes
│   ├── routes/
│   │   └── notes.router.js       # API routes definition
│   └── server.js                 # Express server setup and entry point
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
└── package-lock.json
```

### Frontend Structure
```
frontend/
├── public/                       # Static assets
├── src/
│   ├── components/              # Reusable React components
│   │   ├── Navbar.jsx          # Navigation bar component
│   │   ├── NoteCard.jsx        # Individual note card component
│   │   ├── NotesNotFound.jsx   # Empty state component
│   │   └── RateLimitedUI.jsx   # Rate limit notification component
│   ├── lib/                    # Utility functions and configurations
│   │   ├── axios.js           # Axios instance with base configuration
│   │   └── utils.js           # Helper functions (date formatting)
│   ├── pages/                 # Page components (routes)
│   │   ├── CreatePage.jsx     # Create new note page
│   │   ├── HomePage.jsx       # Main dashboard with all notes
│   │   └── NoteDetailPage.jsx # View/edit specific note page
│   ├── App.jsx               # Main application component with routing
│   ├── index.css            # Global CSS styles
│   └── main.jsx             # React application entry point
├── index.html               # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js         # Vite build configuration
└── eslint.config.js       # ESLint configuration
```

## 🔄 API Reference

The backend provides RESTful API endpoints for managing notes:

### Base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-app-domain.com/api`

### Notes Endpoints

| Method | Endpoint         | Description           | Request Body              | Response                      |
|--------|------------------|-----------------------|---------------------------|-------------------------------|
| GET    | `/notes`         | Get all notes         | -                         | Array of note objects         |
| GET    | `/notes/:id`     | Get a specific note   | -                         | Single note object            |
| POST   | `/notes`         | Create a new note     | `{ title, content }`      | Created note object           |
| PUT    | `/notes/:id`     | Update a note         | `{ title, content }`      | Success message               |
| DELETE | `/notes/:id`     | Delete a note         | -                         | Success message               |

### Note Object Structure
```json
{
  "_id": "64f8b8c8e1234567890abcde",
  "title": "Sample Note Title",
  "content": "This is the content of the note...",
  "createdAt": "2023-09-06T10:30:00.000Z",
  "updatedAt": "2023-09-06T10:30:00.000Z"
}
```

### Error Responses
```json
{
  "message": "Error description"
}
```

### Rate Limiting
- **Limit:** 100 requests per 60 seconds per IP
- **Response when exceeded:** 429 Too Many Requests

## 🧪 Testing with Postman

### 1. Get All Notes
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/notes`
- **Headers:** `Content-Type: application/json`

### 2. Get Single Note
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/notes/{note_id}`
- Replace `{note_id}` with actual MongoDB ObjectId

### 3. Create New Note
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/notes`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "My First Note",
  "content": "This is the content of my first note. It can be as long as needed."
}
```

### 4. Update Note
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/notes/{note_id}`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "Updated Note Title",
  "content": "This is the updated content of the note."
}
```

### 5. Delete Note
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/notes/{note_id}`
- **Headers:** `Content-Type: application/json`

## 💡 Key Components Explained

### Backend Components

**server.js**
- Entry point for the Express application
- Sets up middleware (CORS, JSON parsing, rate limiting)
- Configures routes and static file serving for production
- Connects to MongoDB database

**db.js**
- Handles MongoDB connection using Mongoose
- Includes error handling and connection logging

**Note.js (Model)**
- Defines the Mongoose schema for notes
- Includes title, content, and automatic timestamps
- Exports the Note model for use in controllers

**notesController.js**
- Contains all CRUD operations for notes
- Handles errors and sends appropriate HTTP responses
- Sorts notes by creation date (newest first)

**ratelimiter.middleware.js**
- Implements rate limiting using Upstash Redis
- Prevents API abuse by limiting requests per IP
- Returns 429 status when limit is exceeded

### Frontend Components

**main.jsx**
- Entry point for React application
- Sets up React Router and Toast notifications
- Renders the main App component

**App.jsx**
- Defines application routes using React Router
- Includes the gradient background styling
- Manages navigation between pages

**HomePage.jsx**
- Displays all notes in a grid layout
- Handles loading states and empty states
- Shows rate limiting UI when necessary
- Fetches notes from API on component mount

**CreatePage.jsx**
- Form for creating new notes
- Validates input (title and content required)
- Handles form submission and navigation
- Shows loading state during API calls

**NoteDetailPage.jsx**
- Displays and allows editing of a specific note
- Includes delete functionality with confirmation
- Handles update operations
- Navigates back to home after operations

**NoteCard.jsx**
- Reusable component for displaying note previews
- Shows title, content preview, and creation date
- Includes quick delete functionality
- Links to note detail page for editing

## 🚀 Deployment

This application is configured for deployment on platforms like Render, Heroku, or similar services where the React build is served by the Express server.

### Production Build Process

1. **Frontend Build:**
```bash
cd frontend
npm run build
```

2. **Backend Configuration:**
The server automatically serves the built React app in production:
```javascript
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}
```

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
PORT=5000
NODE_ENV=production
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### Deployment Steps (Render Example)
1. Connect your GitHub repository to Render
2. Set the build command: `cd frontend && npm install && npm run build && cd ../backend && npm install`
3. Set the start command: `cd backend && npm start`
4. Add environment variables in Render dashboard
5. Deploy!

## 🛠️ Development Scripts

### Backend Scripts
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

### Frontend Scripts
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## 🔧 Configuration Files

### tailwind.config.js
- Configures Tailwind CSS with DaisyUI
- Sets the theme to "forest" for dark mode styling
- Defines content paths for purging unused CSS

### vite.config.js
- Configures Vite build tool
- Sets up React plugin for JSX support
- Configures build optimization

### eslint.config.js
- ESLint configuration for code quality
- Includes React-specific rules
- Configured for modern JavaScript/JSX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Express](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [DaisyUI](https://daisyui.com/) - Component library
- [Vite](https://vitejs.dev/) - Build tool
- [Upstash](https://upstash.com/) - Serverless Redis

---

**Live Demo:** [Add your deployed URL here]

For any questions or issues, please open an issue on GitHub or contact the maintainers.

