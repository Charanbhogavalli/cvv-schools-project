 const express = require('express');
const router = express.Router();
const School = require('../models/School');
const Staff = require('../models/Staff');

// Home page
router.get('/', async (req, res) => {
  const schools = await School.find({});
  res.render('index', { schools });
});

// School details
router.get('/school/:id', async (req, res) => {
  const school = await School.findById(req.params.id);
  const staff = await Staff.find({ school: req.params.id });
  res.render('schoolDetails', { school, staff });
});

module.exports = router;