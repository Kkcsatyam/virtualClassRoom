
const Class = require("../models/Class");
const User = require("../models/User");

// @desc    Create a new class
// @route   POST /api/classes
// @access  Private (Only instructors can create a class)
exports.createClass = async (req, res) => {
  try {
    const { title, description, sessions, id } = req.body;

    // Check if the user is an instructor
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create new class
    const newClass = new Class({
      title,
      description,
      instructor: id,
      sessions,
    });

    // Save the class to the database
    const savedClass = await newClass.save();
    res.json(savedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get all classes
// @route   GET /api/classes
// @access  Public
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("instructor", "name email");
    res.json(classes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Get a class by ID
// @route   GET /api/classes/:id
// @access  Public
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
    if (!classItem) {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.json(classItem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.status(500).send("Server error");
  }
};

// @desc    Add a lecture to a session in a class
// @route   PUT /api/classes/:id/session/:sessionId
// @access  Private (Instructor only)
exports.addLectureToSession = async (req, res) => {
  try {
    const { title, content } = req.body;
    const classItem = await Class.findById(req.params.id);

    if (!classItem) {
      return res.status(404).json({ msg: "Class not found" });
    }

    // Check if user is the instructor
    if (classItem.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Find the session to add the lecture
    const session = classItem.sessions.id(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ msg: "Session not found" });
    }

    // Add lecture to the session
    session.lectures.push({ title, content });
    await classItem.save();

    res.json(classItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Delete a class
// @route   DELETE /api/classes/:id
// @access  Private (Instructor only)
exports.deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);

    if (!classItem) {
      return res.status(404).json({ msg: "Class not found" });
    }

    // Check if user is the instructor
    if (classItem.instructor.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await classItem.remove();
    res.json({ msg: "Class removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Class not found" });
    }
    res.status(500).send("Server error");
  }
};
