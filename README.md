# NotesPro — Professional Notes Management Application

A production-ready full-stack Notes Management SaaS built with the MERN-style architecture using **MySQL** as the database.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19 + Vite, Tailwind CSS v4   |
| Backend  | Node.js + Express.js               |
| Database | MySQL + Sequelize ORM              |
| API      | Axios, RESTful CRUD                |
| State    | React Context API                  |
| Auth     | JWT-ready structure (optional)     |

## Features

- Create, read, update, and delete notes
- Search, filter by category, and sort notes
- Professional dashboard with stats and recent notes
- Modal-based add/edit with validation
- Delete confirmation dialog
- Dark/light mode toggle
- Toast notifications, loading skeletons, empty states
- Fully responsive layout (desktop, tablet, mobile)

## Project Structure

```
Notes/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Error handler, auth (JWT-ready)
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   ├── utils/           # Helpers
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/  # UI & note components
│       ├── context/     # Theme & Notes state
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── services/    # Axios API layer
│       └── utils/
├── database/
│   └── schema.sql       # MySQL schema + sample data
└── README.md
```

## Prerequisites

- **Node.js** 18+ and npm
- **MySQL** 8.0+ (or MariaDB 10.5+)

## Setup Instructions

### 1. MySQL Database

Start MySQL, then run the schema:

```bash
mysql -u root -p < database/schema.sql
```

Or manually in MySQL Workbench / CLI:

```sql
SOURCE path/to/Notes/database/schema.sql;
```

### 2. Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=notes_db
DB_USER=root
DB_PASSWORD=your_password
CORS_ORIGIN=http://localhost:5173
```

Install and start:

```bash
npm install
npm run dev
```

API runs at **http://localhost:5000**

### 3. Frontend

```bash
cd frontend
cp .env.example .env
```

Default `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Install and start:

```bash
npm install
npm run dev
```

App runs at **http://localhost:5173**

## API Endpoints

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | `/api/health`         | Health check       |
| GET    | `/api/notes`          | Get all notes      |
| GET    | `/api/notes/:id`      | Get single note    |
| POST   | `/api/notes`          | Create note        |
| PUT    | `/api/notes/:id`      | Update note        |
| DELETE | `/api/notes/:id`      | Delete note        |
| GET    | `/api/notes/categories` | List categories |

### Query Parameters (GET `/api/notes`)

- `search` — Search title, content, category
- `category` — Filter by category name
- `sort` — `date-desc` | `date-asc` | `title-asc` | `title-desc` | `category-asc`

### Create/Update Body

```json
{
  "title": "My Note",
  "content": "Note description and content",
  "category": "Work"
}
```

## Database Schema

```sql
notes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'General',
  created_at DATETIME,
  updated_at DATETIME
)
```

## JWT Authentication (Future)

The backend includes `middleware/authMiddleware.js` with commented JWT logic. To enable:

1. Install `jsonwebtoken` and `bcryptjs`
2. Uncomment middleware code
3. Add user model and auth routes
4. Protect note routes with `protect` middleware
5. Store token in `localStorage` (Axios interceptor already configured)

## Production Build

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm start
```

Serve `frontend/dist` via nginx or similar, and point API requests to your production backend URL.

## License

MIT — Free to use for learning and production projects.
