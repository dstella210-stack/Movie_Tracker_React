import express from "express";
export const router = express.Router();
import { randomUUID } from "node:crypto";
import redisClient from "../config/Redis.js";


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
    console.log("POST /api/users route reached");
    const { name, favoriteGenre } = req.body;
    const id = randomUUID();
    const user = {
        id,
        name: name || "",
        createdAt: new Date().toISOString(),
    };

    try {
        await redisClient.hSet(`user:${id}`, user);
        await redisClient.rPush("users:ids", id);
        res.status(201).json(user);
    } catch (err) {
        console.log("redis save error", err);
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

export default router;