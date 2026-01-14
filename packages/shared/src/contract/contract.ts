export type NotificationChannel = "EMAIL" | "SMS";

export interface NotificationPayload {
    notificationId: string;
    channel: NotificationChannel;
    createdAt: string;
}

export interface EmailPayload extends NotificationPayload {
    channel: "EMAIL";
    to: string;
    subject: string;
    body: string;
}

export interface SmsPayload extends NotificationPayload {
    channel: "SMS"
    to: string;
    message: string
}

export type NotificationJobPayload = EmailPayload | SmsPayload;