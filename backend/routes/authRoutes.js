const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController"); // Ensure these functions exist and are imported correctly

// Route for registering a user
router.get("/register", (req, res) => {
    res.json("message: hello")
})
router.post("/register", registerUser); // Check that registerUser is defined and imported

// Route for logging in a user
router.post("/login", loginUser); // Check that loginUser is defined and imported

module.exports = router;
