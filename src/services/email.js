import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error("No API key provided!");
}
sgMail.setApiKey(apiKey);

class EmailService {
  static async sendEventRegistrationEmail(to, userName, event) {
    const { eventName, date, time } = event;

    const msg = {
      to,
      from: process.env.EMAIL,
      subject: "Event Registration Successful!",
      html: `
    <p>Hi <strong>${userName}</strong>,</p>
    <p>You have successfully registered for the event: <strong>${eventName}</strong>.</p>
    <p><strong>Event Details:</strong></p>
    <ul>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
    </ul>
    <p>Thank you!</p>
  `, // HTML content
    };

    await sgMail.send(msg);
  }
}

export default EmailService;
