"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribe(email: string) {
  await resend.emails.send({
    from: "Tara Kape <onboarding@resend.dev>",
    to: email,
    subject: "Subscribed to Tara Kape",
    text: "Thank you for subscribing to Tara Kape! This is done only for testing and portfolio purposes. If you need a developer, contact Eirin Gonzales.",
  });
}