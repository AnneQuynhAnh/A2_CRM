const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session); // Import MySQL session store
const connection = require("./database"); // Import your existing database connection
const app = express();
const port = 3007;

// Session store configuration
const sessionStore = new MySQLStore({}, connection.promise()); // Use your existing MySQL connection

app.use(
  session({
    key: "user_sid",
    secret: "your_secret_key", // Replace with your actual secret key
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' folder

// Import route files
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes"); // Import user routes

// Register routes
app.use("/products", productRoutes); // all product-related routes
app.use("/orders", orderRoutes); // all order-related routes
app.use("/users", userRoutes); // all user-related routes

// Serve the sign-up page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "HTML", "signup.html"));
});

// Serve the sign-in page (if needed)
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "HTML", "signin.html"));
});

// Error handling for 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
