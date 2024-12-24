// @ts-ignore
import { transporter } from "../index";

export const sendMail = (to: string, subject: string, body: string) =>
  new Promise((resolve, reject) => {
    let mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to,
      subject,
      html: body,
    };

    // send mail with defined transport object
    //@ts-ignore
    transporter.sendMail(mailOptions, function (err: Error, info: any) {
      if (err) {
        console.error(err);
        resolve(false);
      } else {
        console.log(info);
        resolve(true);
      }
    });
  });
