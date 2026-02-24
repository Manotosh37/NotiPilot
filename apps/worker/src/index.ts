import { Worker } from "bullmq"
import { QUEUE_NAMES, bullmqConnection } from "@notipilot/shared/"
import { processNotification } from "./processors/notification.processors"

new Worker( QUEUE_NAMES.Notification_Delivery, async (job) =>{
    const { notificationId } = job.data
    await processNotification(notificationId)
},
{
    connection: bullmqConnection
})