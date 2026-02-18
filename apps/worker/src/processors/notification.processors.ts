import { notiRepo, notiChannel } from "@notipilot/database"
import { sendEmail } from "../providors/email.provider";
export async function processNotification(notificationId: string) {
    const notification = await notiRepo.getById(notificationId)

    if (!notification) {
        return notification
    }

    await notiRepo.markAsProcessing(notificationId);
    if (notification.channel === notiChannel.sendEmail) {
        console.log("Sending mail:")
    } else if (notification.channel === notiChannel.SMS) {
        console.log("Sending SMS:")
    }
} 