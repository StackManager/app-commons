import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
const aws = require('@aws-sdk/client-ses');
// Cargar las variables de entorno
dotenv.config();

export class SenderAWS {
  async sendEmail({ to, subject, html }) {
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
      subject: `"Centro de notificaciones" <${process.env.EMAIL_AWS_SMTP_FROM}>`,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      //console.log('gestion', info);
      return {
        success: true,
        message: 'Correo electrónico enviado exitosamente',
      };
    } catch (error) {
      console.log('voy a nostrar un error', error);
      return {
        success: false,
        message: 'Error al enviar el correo electrónico',
      };
    }
  }
}
