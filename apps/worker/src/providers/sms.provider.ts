export async function sendSMS(to: string, message: string) {
    if (!to) throw new Error('Recipient (to) is required.')
    if (!message) throw new Error("Message does not exist.")

        console.log(`Sending SMS to ${to}`)
        return
}