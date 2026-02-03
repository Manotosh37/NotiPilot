import { Request, Response } from "express"
import { notiService } from "src/services/noti.service";

export async function createNotification( req: Request, res: Response) {
    const { channel, payload, priority, category } = req.body;
    const notification = await notiService.enqueueNotification({
        channel,
        payload,
        priority,
        category
    });
    res.status(202).json(notification);
}