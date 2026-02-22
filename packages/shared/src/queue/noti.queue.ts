import { Queue } from "bullmq"
import { bullmqConnection } from "./connection.js"
import { QUEUE_NAMES } from "../contant/queue-name.js"

export const notiQueue = new Queue(
    QUEUE_NAMES.Notification_Delivery,
    {
        connection: bullmqConnection,
        defaultJobOptions: {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 1000
            },
            removeOnComplete: true,
            removeOnFail: false
        }
    }
);   