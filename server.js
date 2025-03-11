require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const schoolRoutes = require("./routes/apiRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api", schoolRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
