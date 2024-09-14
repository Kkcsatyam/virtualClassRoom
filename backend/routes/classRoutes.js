// routes/classRoutes.js
const express = require('express');
const router = express.Router();
const { createClass, getClasses } = require('../controllers/classController');
const auth = require('../middleware/auth');

// @route    POST /api/classes
// @desc     Create a new class
// @access   Private (Instructor)
router.post('/', createClass);

// @route    GET /api/classes
// @desc     Get all classes
// @access   Public
router.get('/', getClasses);

module.exports = router;
