const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const movieRoutes = require("./routes/movies");

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 3000;

console.log(process.env.API_KEY);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});