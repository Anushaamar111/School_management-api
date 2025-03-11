const db = require("../config/db");
const getDistance = require("../utils/distanceCalculator");

// Add School API
exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(201).json({ message: "School added successfully", schoolId: result.insertId });
  });
};

// List Schools API (sorted by proximity)
exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and Longitude are required" });
  }

  db.query("SELECT * FROM schools", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    const sortedSchools = results.map(school => ({
      ...school,
      distance: getDistance(latitude, longitude, school.latitude, school.longitude),
    })).sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  });
};
