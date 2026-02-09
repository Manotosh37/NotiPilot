import { Worker } from "bullmq"
import { QUEUE_NAMES, bullmqConnection } from "@notipilot/shared"

new Worker("notifications", async (job) => {
    console.log(job.data.notificationId)
})

new Worker( QUEUE_NAMES.Notification_Delivery, async (job) =>{
    const { notificationId } = job.data;
    console.log("Received job for notification:", notificationId)
},
{
    connection: bullmqConnection
})