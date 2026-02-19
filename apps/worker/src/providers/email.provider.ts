export async function sendEmail(to: string, subject: string, body?: string) {
  if (!to) throw new Error("Recipient (to) is required");
  if (!subject) throw new Error("Subject is required");

  console.log(`Sending email to ${to}`);
  return 
}