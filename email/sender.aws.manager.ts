import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
const aws = require('@aws-sdk/client-ses');
// Cargar las variables de entorno
dotenv.config();

export class SenderAwsManager {
  async send({ to, subject, html }: {to: string, subject: string, html: string}) {
    const transporter = nodemailer.createTransport({
      SES: {
        ses: new aws.SES({
          region: process.env.EMAIL_AWS_SMTP_REGION,
          credentials: {
            accessKeyId: process.env.EMAIL_AWS_SMTP_USER,
            secretAccessKey: process.env.EMAIL_AWS_SMTP_PASSWORD,
          },
        }),
        aws,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_AWS_SMTP_FROM, // Dirección de correo del remitente
      to, // Dirección de correo del destinatario
      subject: `Centro de notificaciones`,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return {
        success: true,
        message: 'Correo electrónico enviado exitosamente',
      };
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: 'Error al enviar el correo electrónico',
      };
    }
  }
}
