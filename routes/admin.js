 const express = require('express');
const router = express.Router();
const School = require('../models/School');
const Staff = require('../models/Staff');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/admin/login');
};

// Admin login page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'cvv123') {
    req.session.isAuthenticated = true;
    res.redirect('/admin');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Admin dashboard (protected)
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const schools = await School.find({});
    const staff = await Staff.find({}).populate('school');
    console.log('Staff data:', staff); // Debugging log
    res.render('dashboard', { schools, staff });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Add school
router.post('/add-school', isAuthenticated, async (req, res) => {
  const { name, logo, description } = req.body;
  await new School({ name, logo, description }).save();
  res.redirect('/admin');
});

// Delete school
router.post('/delete-school/:id', isAuthenticated, async (req, res) => {
  await School.findByIdAndDelete(req.params.id);
  await Staff.deleteMany({ school: req.params.id });
  res.redirect('/admin');
});

// Add staff
router.post('/add-staff', isAuthenticated, async (req, res) => {
  const { name, role, email, phone, school } = req.body;
  await new Staff({ name, role, email, phone, school }).save();
  res.redirect('/admin');
});

// Delete staff
router.post('/delete-staff/:id', isAuthenticated, async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;