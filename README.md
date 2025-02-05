
### Configuration

- **config/database.js**: Contains the MongoDB connection logic.

### Controllers

- **controllers/authController.js**: Handles user authentication (signup, login, logout).
- **controllers/cropController.js**: Manages crop-related operations (add, update, delete, view crops).
- **controllers/profileController.js**: Handles user profile operations (view, edit, upload profile image).
- **controllers/userController.js**: Manages user-related operations (view users, update user information).

### Middlewares

- **middlewares/auth.js**: Middleware for user authentication using JWT.
- **middlewares/multer.js**: Middleware for handling file uploads using Multer.

### Models

- **models/crop.js**: Defines the schema for crop data.
- **models/userModel.js**: Defines the schema for user data.

### Routes

- **routes/authRouter.js**: Routes for authentication (signup, login, logout).
- **routes/cropRouter.js**: Routes for crop-related operations.
- **routes/profileRouter.js**: Routes for user profile operations.
- **routes/userRouter.js**: Routes for user-related operations.

### Utilities

- **utils/emailService.js**: Utility for sending emails using Nodemailer.
- **utils/weatherService.js**: Utility for fetching weather updates.
- **utils/uploadImageCloudinary.js**: Utility for uploading images to Cloudinary.

### Main Application

- **app.js**: The main entry point of the backend application. It sets up the Express server, connects to the database, and initializes routes and middlewares.

### Environment Variables

- **.env**: Contains environment variables for configuration (e.g., database connection string, JWT secret, email credentials).

### Ignored Files

- **.gitignore**: Specifies files and directories to be ignored by Git (e.g., `node_modules`).

### Package Configuration

- **package.json**: Contains metadata about the project and its dependencies.

## Frontend

### Components

- **components/Navbar.jsx**: Component for displaying the navigation bar.
- **components/Login.jsx**: Component for handling user login and signup.
- **components/Profile.jsx**: Component for displaying the user profile.
- **components/CropList.jsx**: Component for displaying the list of crops.
- **components/AddCrop.jsx**: Component for adding a new crop.
- **components/EditCrop.jsx**: Component for editing crop details.
- **components/Weather.jsx**: Component for displaying weather updates.
- **components/MarketPrices.jsx**: Component for displaying market prices.

### Store

- **store/appStore.js**: Configures the Redux store and applies persistence.
- **store/cropSlice.js**: Redux slice for managing crop data.
- **store/userSlice.js**: Redux slice for managing user data.

### Utilities

- **utils/constants.js**: Contains constants used throughout the application.
- **utils/api.js**: Utility for making API calls.

### Main Application

- **App.js**: The main entry point of the frontend application. It sets up the routes and provides the Redux store.
- **index.js**: The main entry point for rendering the React application.

### Styles

- **App.css**: Contains global styles for the application.
- **index.css**: Contains Tailwind CSS imports and custom styles.

### Configuration

- **tailwind.config.js**: Configuration file for Tailwind CSS.
- **vite.config.js**: Configuration file for Vite.

### Environment Variables

- **.env**: Contains environment variables for configuration (e.g., backend URL).

### Ignored Files

- **.gitignore**: Specifies files and directories to be ignored by Git (e.g., `node_modules`).

### Package Configuration

- **package.json**: Contains metadata about the project and its dependencies.
