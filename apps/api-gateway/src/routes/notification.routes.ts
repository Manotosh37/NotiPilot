import { Router } from "express"
import { createNotification } from "src/controller/notification.controller"

const router = Router();

router.post("/notifications", createNotification)

export default router;