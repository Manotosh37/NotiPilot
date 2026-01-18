export const bullmqConnection = {
    host: process.env.REDIS_HOST ?? "localhost",
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT): 6379,
    password: process.env.REDIS_PASSWORD || undefined
}