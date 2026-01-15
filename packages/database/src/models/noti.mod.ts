import mongoose, { Schema, Document} from "mongoose";

export enum NotiStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SENT = "SENT",
    FAILED = "FAILED"
}

export enum NotiChannel {
    EMAIL = "EMAIL",
    SMS = "SMS"
}

export enum NotiPriority {
    LOW = "LOW",
    NORMAL = "NORMAL",
    HIGH = "HIGH"
}

export enum NotiCategory {
    TRANSACTIONAL = "TRANSACTIONAL",
    PROMOTIONAL = "PROMOTIONAL",
    SYSTEM = "SYSTEM"
}

export interface NotiDocument extends Document {
    channel: NotiChannel
    payload: Record<string, unknown>;
    status: NotiStatus
    retryCount: number
    priority?: NotiPriority
    category?: NotiCategory
    createdAt: Date
    updatedAt: Date
}

const NotiSchema = new Schema<NotiDocument>(
    {
        channel: {
            type: String,
            enum: Object.values(NotiChannel),
            required: true
        },
        payload: {
            type: Schema.Types.Mixed,
            required: true
        },
        status: {
            type: String,
            enum: Object.values(NotiStatus),
            required: true,
            default: NotiStatus.PENDING
        },
        retryCount: {
            type: Number,
            required: true,
            default: 0
        },
        priority: {
            type: String,
            enum: Object.values(NotiPriority),
            required: false
        },
        category: {
            type: String,
            enum: Object.values(NotiCategory),
            required: false
        }
    },
    {
        timestamps: true
    }
);

NotiSchema.index({ status: 1})

export const NotiModel = mongoose.model<NotiDocument>(
    "Notification", 
    NotiSchema
)