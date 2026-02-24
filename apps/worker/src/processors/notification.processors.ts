import { notiRepo, NotiChannel } from "@notipilot/database"
import { sendEmail } from "../providers/email.provider";
import { sendSMS } from "../providers/sms.provider";


const MAX_RETRY = 2

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
            const nextRetryCount = notification.retryCount + 1;
            await notiRepo.incrementRetry(notificationId)
            if (nextRetryCount >= MAX_RETRY) {
            await notiRepo.markAsFailed(notificationId)
            return; }
            await notiRepo.markAsFailed(notificationId)
            throw error}
    } 
    else if (notification.channel === NotiChannel.SMS) {
        console.log("Sending SMS:")
        const { to, message } = notification.payload as {
        to: string,
        message: string
    }
    try {
        await sendSMS(to, message)
        await notiRepo.markAsSent(notificationId)
    }
    catch (error) {
        const nextRetryCount = notification.retryCount + 1;
        await notiRepo.incrementRetry(notificationId)
        if (nextRetryCount >= MAX_RETRY) {
            await notiRepo.markAsFailed(notificationId)
            return;
        }
        await notiRepo.markAsFailed(notificationId)
        throw error
    }
    }
} 