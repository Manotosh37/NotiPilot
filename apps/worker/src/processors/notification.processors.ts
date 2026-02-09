import { notiRepo } from "@notipilot/database"
import { notiChannel } from "@notipilot/database"

export async function processNotification(notificationId: string) {
    const notification = await notiRepo.getById(notificationId)

    if (!notification) {
        return notification
    }

    await notiRepo.markAsProcessing(notificationId);
    if (notification.channel === notiChannel.EMAIL) {
        console.log("Sending mail:")
    } else if (notification.channel === notiChannel.SMS) {
        console.log("Sending SMS:")
    }
}