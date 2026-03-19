import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export default redis;


// await redis.set("key", value)      // store something
// await redis.get("key")             // retrieve something
// await redis.del("key")             // delete something