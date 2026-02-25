import { z } from "zod";
import { Request, Response, NextFunction } from "express"

const emailSchema = z.object({
  channel: z.literal("EMAIL"),
  payload: z.object({
    to: z.string().email(),
    subject: z.string().min(1),
    body: z.string().min(1),
  }),
  priority: z.enum(["LOW", "NORMAL", "HIGH"]).optional(),
  category: z.enum(["TRANSACTIONAL", "PROMOTIONAL", "SYSTEM"]).optional(),
});

const smsSchema = z.object({
  channel: z.literal("SMS"),
  payload: z.object({
    to: z.string().min(1),
    message: z.string().min(1),
  }),
  priority: z.enum(["LOW", "NORMAL", "HIGH"]).optional(),
  category: z.enum(["TRANSACTIONAL", "PROMOTIONAL", "SYSTEM"]).optional(),
});

const notificationSchema = z.discriminatedUnion("channel", [
  emailSchema,
  smsSchema,
]);

export function validateNotification(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const result = notificationSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: result.error.flatten(),
        });
    }
    req.body = result.data;
    next();
}