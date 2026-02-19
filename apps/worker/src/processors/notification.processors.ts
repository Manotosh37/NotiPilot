import { notiRepo } from "@notipilot/database"
import { NotiChannel } from "@notipilot/database"
import { sendEmail } from "../providers/email.provider";

export async function processNotification(notificationId: string) {
    const notification = await notiRepo.getById(notificationId)

    if (!notification) {
        return 
    }

    await notiRepo.markAsProcessing(notificationId);
    if (notification.channel === NotiChannel.EMAIL) {
        console.log("Sending mail:")
        const { to, subject, body} = notification.payload as {
            to: string,
            subject: string,
            body: string
        }
        try {
            await sendEmail(to, subject, body)
            await notiRepo.markAsSent(notificationId) }

        catch (error) {
            await notiRepo.incrementRetry(notificationId)
            await notiRepo.markAsFailed(notificationId)
            throw error}
    } 
    else if (notification.channel === NotiChannel.SMS) {
        console.log("Sending SMS:")
    }
} 