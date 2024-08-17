const express = require("express");
const router = express.Router();
const connection = require("../database");
const bcrypt = require("bcrypt");

// Endpoint to handle sign-up
router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  console.log("Received sign-up request for email:", email);

  // Check if the email is already in use
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  connection.query(checkUserQuery, [email], async (err, results) => {
    if (err) {
      console.error("Error checking user existence:", err);
      return res.status(500).json({ error: "Server error during sign-up" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const insertUserQuery =
        "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
      connection.query(
        insertUserQuery,
        [fullname, email, hashedPassword],
        (err) => {
          if (err) {
            console.error("Error inserting new user:", err);
            return res
              .status(500)
              .json({ error: "Server error during sign-up" });
          }

          console.log("User registered successfully with email:", email);
          return res
            .status(201)
            .json({ message: "User registered successfully" });
        }
      );
    } catch (hashError) {
      console.error("Error hashing password:", hashError);
      return res.status(500).json({ error: "Server error during sign-up" });
    }
  });
});

// Endpoint to handle sign-in
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  console.log("Received sign-in request for email:", email);

  // Check if the user exists
  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }

    if (results.length === 0) {
      console.warn("No user found with email:", email);
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        console.warn("Password mismatch for email:", email);
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Set the session userEmail
      req.session.userEmail = user.email;

      // Save the session and respond
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("Error saving session:", saveErr);
          return res
            .status(500)
            .json({ error: "Server error during session save" });
        }

        console.log("Sign-in successful for email:", email);
        // Successful sign-in, return the fullname and role
        return res.json({
          message: "Sign-in successful",
          fullname: user.fullname,
          role: user.role,
        });
      });
    } catch (compareError) {
      console.error("Error comparing passwords:", compareError);
      return res
        .status(500)
        .json({ error: "Server error during password comparison" });
    }
  });
});

// Endpoint to get all users
router.get("/all", (req, res) => {
  const query = "SELECT fullname, email, phone_no FROM users";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }
    return res.json(results);
  });
});

// Endpoint to fetch the current user's details for the navbar and profile page
router.get("/current", (req, res) => {
  const userEmail = req.session.userEmail;
  console.log("Fetching data for user email:", userEmail);

  if (!userEmail) {
    console.log("No user email found in session.");
    return res.status(401).json({ error: "Not authenticated" });
  }

  const query = "SELECT fullname, email, phone_no FROM users WHERE email = ?";
  connection.query(query, [userEmail], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }

    if (results.length === 0) {
      console.log("User not found for email:", userEmail);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User data fetched:", results[0]);
    return res.json({
      fullname: results[0].fullname,
      email: results[0].email,
      phone_no: results[0].phone_no,
    });
  });
});

// Endpoint to update the user profile (email, phone number, and password)
router.post("/updateProfile", (req, res) => {
  const { email, currentPassword, newPassword, phoneNo } = req.body;
  const userEmail = req.session.userEmail;

  if (!userEmail) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // Fetch the user to verify the current password
  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [userEmail], async (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Server error during user fetch" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!passwordMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      // If a new password is provided, hash it
      let updatedPassword = user.password;
      if (newPassword) {
        updatedPassword = await bcrypt.hash(newPassword, 10);
      }

      // Update user details
      const updateQuery =
        "UPDATE users SET email = ?, password = ?, phone_no = ? WHERE email = ?";
      connection.query(
        updateQuery,
        [email, updatedPassword, phoneNo, userEmail],
        (updateErr) => {
          if (updateErr) {
            console.error("Error updating user profile:", updateErr);
            return res
              .status(500)
              .json({ error: "Server error during profile update" });
          }

          // Update session email if it has changed
          req.session.userEmail = email;

          return res.json({
            success: true,
            message: "Profile updated successfully",
          });
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      return res
        .status(500)
        .json({ error: "Server error during profile update" });
    }
  });
});

module.exports = router;
