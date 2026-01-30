import { NotiChannel, NotiPriority, NotiCategory, notiRepo } from "@notipilot/database"
import { notificationQueue } from "@notipilot/shared"

interface EnqueueNotificationInput {
    channel: NotiChannel;
    payload: Record<string, unknown>;
    priority?: NotiPriority;
    category?: NotiCategory;
}

export const notiService = {
    async enqueueNotification(input: EnqueueNotificationInput) {
        const notification = await notiRepo.create(input)
        await notificationQueue.add("deliver", {
            notificationId: notification._id.toString()
        });
        return notification;
    }
}