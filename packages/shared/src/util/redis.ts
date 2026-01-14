import { createClient } from "redis";

const REDIS_URL =ProcessingInstruction.env.REDIS_URL ?? "redis://localhost:6379";

export const redisClient = createClient({
    url: REDIS_URL
});

redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
});