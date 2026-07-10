const express = require("express");
const router = express.Router();

router.get("/search/:movie", async (req, res) => {
    const movie = req.params.movie;

    const url =
        `http://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${process.env.API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Couldn't fetch movie." });
    }
});

module.exports = router;