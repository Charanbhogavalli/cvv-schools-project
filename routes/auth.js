const express = require("express");
const router = express.Router();

// Login page
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Handle login form
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    req.session.admin = true;
    res.redirect("/admin");
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;