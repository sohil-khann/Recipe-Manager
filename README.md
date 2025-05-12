# Recipe Manager

A full-stack web application for managing recipes with user authentication and CRUD functionality.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete recipes
- User dietary preferences
- Bootstrap-based responsive design
- Form validation
- Secure password handling
- Session management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-manager
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system:
```bash
mongod
```

4. Create a `.env` file in the root directory (optional):
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/recipe-manager
SESSION_SECRET=your-secret-key
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
recipe-manager/
├── models/
│   ├── user.js
│   └── recipe.js
├── routes/
│   ├── users.js
│   └── recipes.js
├── views/
│   ├── layout.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── recipes/
│       ├── index.ejs
│       ├── new.ejs
│       ├── edit.ejs
│       └── show.ejs
├── public/
│   └── css/
│       └── style.css
├── app.js
├── package.json
└── README.md
```

## API Routes

### Authentication
- GET /register - Show registration form
- POST /register - Register new user
- GET /login - Show login form
- POST /login - Login user
- GET /logout - Logout user

### Recipes
- GET /recipes - Show all recipes
- GET /recipes/new - Show new recipe form
- POST /recipes - Create new recipe
- GET /recipes/:id - Show recipe details
- GET /recipes/:id/edit - Show edit recipe form
- PUT /recipes/:id - Update recipe
- DELETE /recipes/:id - Delete recipe

## Security Features

- Password hashing using bcrypt
- Session-based authentication
- CSRF protection
- Input validation
- XSS prevention
- Secure password storage

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 