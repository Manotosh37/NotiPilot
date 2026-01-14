type Loglevel = "info" | "warn" | "error"; 

export const logger = {
    log(level: Loglevel, message: string, meta?: Record<string, unknown>) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...(meta && { meta })
        };
        console.log(JSON.stringify(entry));
    },
    info(message: string, meta?: Record<string, unknown>) {
        this.log("info", message, meta);
    },
    warn(message: string, meta?: Record<string, unknown>) {
        this.log("warn", message, meta);
    },
    error(message: string, meta?: Record<string, unknown>) {
        this.log("error", message, meta);
    }
};