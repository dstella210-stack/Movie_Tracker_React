const express = require("express");
require("dotenv").config();
const { connectRedis } = require("./config/Redis.js");
const movieRoutes = require("./routes/Movies.js");
const userRoutes = require("./routes/Users.js").default;

const app = express();
app.use(express.json());
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;

connectRedis()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to Redis:", err);
        process.exit(1);
    }); 