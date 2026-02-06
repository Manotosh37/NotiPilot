import { Worker } from "bullmq"
import { QUEUE_NAME, bullmqConnection } from "@notipilot/shared"

new Worker("notifications", async (job) => {
    console.log(job.data.notificationId)
})

new Worker( QUEUE_NAME.NOTIFICATION_DELIVERY, async (job) =>{
    const { notificationId } = job.data;
    console.log("Received job for notification:", notificationId)
},
{
    connection: bullmqConnection
})