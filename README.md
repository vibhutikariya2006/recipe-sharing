# Recipe Sharing App – Backend

A RESTful backend for a Recipe Sharing Application developed using **Node.js, Express.js, MongoDB and Mongoose**. It provides APIs for user authentication, recipe management, comments, image uploads and admin authorization.

## 🚀 Features

- **User Authentication:** User registration and login using JWT.
- **Password Security:** Password hashing using bcrypt.
- **Recipe Management:** Create, view, update and delete recipes.
- **Recipe Search:** Search and filter recipes by category.
- **Recipe Details:** Manage ingredients, instructions, preparation time, cooking time and difficulty.
- **Image Upload:** Upload recipe images using Cloudinary.
- **Comments:** Add and manage comments on recipes.
- **Admin Authorization:** Restrict administrative operations using admin middleware.
- **Database Management:** Store application data using MongoDB and Mongoose.
- **Protected Routes:** Secure APIs using JWT authentication.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | Database modeling |
| JWT | User authentication |
| bcrypt | Password hashing |
| Cloudinary | Image storage |
| Multer | File upload handling |
| dotenv | Environment configuration |

## 📁 Project Structure

```text
Backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── commentController.js
│   │   └── recipeController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── isAdmin.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── Comment.js
│   │   ├── Recipe.js
│   │   └── User.js
│   │
│   └── routes/
│       ├── authRoutes.js
│       ├── commentRoutes.js
│       └── recipeRoutes.js
│
└── .env
│
└── package-lock.json
│
└── package.json
│
└── server.js
```

## 🔐 Authentication and Authorization

The application uses JSON Web Tokens (JWT) for authentication.

**Registration**
- Users can create a new account.
- Passwords are hashed using bcrypt.
- User information is stored in MongoDB.

**Login**
- Users log in using their credentials.
- The backend verifies the password.
- A JWT token is generated and returned.

**Authorization**
- JWT authentication protects private routes.
- Authentication middleware verifies user tokens.
- Admin middleware checks administrative permissions.
- Unauthorized users cannot access protected resources.

## 🍽️ Recipe Management

The Recipe module manages all recipe-related operations.

Each recipe contains:

| Field | Description |
|---|---|
| title | Name of the recipe |
| description | Recipe description |
| ingredients | List of ingredients |
| instructions | Step-by-step cooking instructions |
| category | Recipe category |
| prepTime | Preparation time |
| cookTime | Cooking time |
| difficulty | Cooking difficulty |
| image | Recipe image URL |

Recipe images are uploaded to Cloudinary, and their URLs are stored in MongoDB.

## 💬 Comment Management

The Comment module allows users to interact with recipes through comments.

- Create comments on recipes.
- Store comments in MongoDB.
- Associate comments with users and recipes.
- Manage comments through comment controllers and routes.

## ☁️ Cloudinary Integration

Cloudinary is used for storing recipe images.

**Image Upload Workflow:**

1. User selects a recipe image.
2. Image is sent to the backend.
3. Upload middleware processes the file.
4. Image is uploaded to Cloudinary.
5. Cloudinary returns the image URL.
6. Image URL is stored in the recipe document.

## 🔗 API Modules

The backend provides three main route modules:

| Route File | Functionality |
|---|---|
| authRoutes.js | User registration, login and authentication |
| recipeRoutes.js | Recipe creation, retrieval, updating and deletion |
| commentRoutes.js | Recipe comment management |

Controllers contain the application logic, while routes define the API endpoints.

## 🗄️ Database Models

The application uses MongoDB with Mongoose.

**Main Collections:**

1. **User:** Stores user details, credentials and account information.
2. **Recipe:** Stores recipe details, ingredients, instructions and image URLs.
3. **Comment:** Stores comments associated with users and recipes.

## 🛡️ Security

- Password hashing using bcrypt.
- JWT-based authentication.
- Protected API routes.
- Admin authorization middleware.
- Environment variables for sensitive credentials.
- Input validation and error handling.

## 🧪 API Testing

API endpoints can be tested using Postman.

Important functionalities to test:

- User registration and login.
- JWT token generation.
- Access to protected routes.
- Recipe creation and retrieval.
- Recipe updating and deletion.
- Recipe image uploads.
- Comment creation and management.
- Admin authorization.

## 🔮 Future Improvements

- Recipe ratings and reviews.
- Save favourite recipes.
- User recipe collections.
- Advanced recipe filtering.
- Pagination.
- Admin dashboard analytics.
- Improved API security and validation.

## 👨‍💻 Author

**Recipe Sharing App – Backend**

Developed using Node.js, Express.js and MongoDB.

---

