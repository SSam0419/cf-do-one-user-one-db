import { WorkerMailer } from "worker-mailer";

// Connect to SMTP server
export const getMailer = async () =>
  await WorkerMailer.connect({
    credentials: {
      username: "bob@acme.com",
      password: "password",
    },
    authType: "plain",
    host: "smtp.acme.com",
    port: 587,
    secure: true,
  });

// Send email
// await mailer.send({
//   from: { name: "Bob", email: "bob@acme.com" },
//   to: { name: "Alice", email: "alice@acme.com" },
//   subject: "Hello from Worker Mailer",
//   text: "This is a plain text message",
//   html: "<h1>Hello</h1><p>This is an HTML message</p>",
// });
