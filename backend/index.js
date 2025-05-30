const express = require("express");
const cors = require("cors");
require("dotenv").config;

const app = express();
app.use(cors());
app.use(express.json());

//Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks",taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));