import { createClient } from "redis";

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    tls: true, // для облачного Redis обычно требуется TLS
  },
  password: process.env.REDIS_PASSWORD,
});

client.on("error", (err) => console.error("Redis Client Error", err));

await client.connect();

export default client;
