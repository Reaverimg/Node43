import nodemailer from "nodemailer";

export const sendMail = (to, subject, text) => {
  let configMail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "phulkse161112@fpt.edu.vn",
      pass: "vifomhhqfbcdlrhv",
    },
  });

  let infoMail = {
    from: "phulkse161112@fpt.edu.vn",
    to,
    subject,
    html: text,
  };

  return configMail.sendMail(infoMail, (error) => error);
};
