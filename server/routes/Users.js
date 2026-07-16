const express = require("express");
const router = express.Router();
const { randomUUID } = require("crypto");
const { redisClient } = require("../redisClient");

router.get("/", async (req, res) => {
    try {
        const ids = await redisClient.lRange("users:ids", 0, -1);
        const users = await Promise.all(
            ids.map((id) => redisClient.hGetAll(`user:${id}`))
        );
        res.json(users);
    } catch (err) {
        res.status(502).json({ error: "Could not reach the database." });
    }
});

router.post("/", async (req, res) => {
    const { name, favoriteGenre } = req.body;
    const id = randomUUID();
    const user = {
        id,
        name: name || "",
        favoriteGenre: favoriteGenre || "",
        createdAt: new Date().toISOString(),
    };

    try {
        await redisClient.hSet(`user:${id}`, user);
        await redisClient.rPush("users:ids", id);
        res.status(201).json(user);
    } catch (err) {
        res.status(502).json({ error: "Could not save the user." });
    }
});

router.post("/", async (req, res) => {
    const { name, favoriteGenre } = req.body;
    const id = randomUUID();
    const user = {
        id,
        name: name || "",
        favoriteGenre: favoriteGenre || "",
        createdAt: new Date().toISOString(),
    };

    try {
        await redisClient.hSet(`user:${id}`, user);
        await redisClient.rPush("users:ids", id);
        res.status(201).json(user);
    } catch (err) {
        res.status(502).json({ error: "Could not save the user." });
    }
});

router.get("/active", async (req, res) => {
    try {
        const activeId = await redisClient.get("activeUser");
        if (!activeId) return res.json(null);

        const user = await redisClient.hGetAll(`user:${activeId}`);
        res.json(user);
    } catch (err) {
        res.status(502).json({ error: "Could not reach the database." });
    }
});

router.post("/active", async (req, res) => {
    const { userId } = req.body;

    try {
        await redisClient.set("activeUser", userId);
        res.json({ userId });
    } catch (err) {
        res.status(502).json({ error: "Could not save active user." });
    }
});

module.exports = router;