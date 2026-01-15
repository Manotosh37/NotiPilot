// import { NotiCategory, NotiChannel, NotiDocument, NotiModel, NotiPriority } from "../models/noti.mod";

// interface CreateNotiInput {
//     channel: NotiChannel
//     payload: Record<string, unknown>
//     priority?: NotiPriority
//     category?: NotiCategory
// }

// export const NotiRepo = 
//     async function create(data: CreateNotiInput) {
//         const newRecord = await NotiModel.create(data)
//         return newRecord
//     }
import { Types } from "mongoose";
import {
  NotiModel,
  NotiStatus,
  NotiChannel,
  NotiPriority,
  NotiCategory,
  NotiDocument
} from "../models/noti.mod.js";

/**
 * Input allowed when creating a notification.
 * This protects invariants.
 */
interface CreateNotiInput {
  channel: NotiChannel;
  payload: Record<string, unknown>;
  priority?: NotiPriority;
  category?: NotiCategory;
}

export const notiRepo = {
  async create(data: CreateNotiInput): Promise<NotiDocument> {
    const notification = await NotiModel.create(data);
    return notification;
  },
  async getById(id: string): Promise<NotiDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    return NotiModel.findById(id).exec();
  },
  async markAsProcessing(id: string): Promise<NotiDocument> {
    const notification = await this.getById(id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (notification.status === NotiStatus.PROCESSING) {
      return notification;
    }

    if (notification.status !== NotiStatus.PENDING) {
      throw new Error(
        `Cannot mark notification as PROCESSING from ${notification.status}`
      );
    }

    notification.status = NotiStatus.PROCESSING;
    await notification.save();

    return notification;
  },
  async markAsSent(id: string): Promise<NotiDocument> {
    const notification = await this.getById(id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (notification.status === NotiStatus.SENT) {
      return notification;
    }

    if (notification.status !== NotiStatus.PROCESSING) {
      throw new Error(
        `Cannot mark notification as SENT from ${notification.status}`
      );
    }

    notification.status = NotiStatus.SENT;
    await notification.save();

    return notification;
  },
  async markAsFailed(id: string): Promise<NotiDocument> {
    const notification = await this.getById(id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (notification.status === NotiStatus.FAILED) {
      return notification;
    }

    if (notification.status !== NotiStatus.PROCESSING) {
      throw new Error(
        `Cannot mark notification as FAILED from ${notification.status}`
      );
    }

    notification.status = NotiStatus.FAILED;
    await notification.save();

    return notification;
  },
  async incrementRetry(id: string): Promise<NotiDocument> {
    const notification = await this.getById(id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (notification.status !== NotiStatus.PROCESSING) {
      throw new Error(
        `Cannot increment retry when status is ${notification.status}`
      );
    }

    notification.retryCount += 1;
    await notification.save();

    return notification;
  }
};
