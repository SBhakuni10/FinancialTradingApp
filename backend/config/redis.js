import redis from "redis";

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

client.on("connect", () => console.log("Redis connected..."));
client.on("error", (err) => console.log("Redis Error:", err));

await client.connect();

export default client;
