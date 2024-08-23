// import { ReservationStateEnum } from "../enums";

// interface ReservationStatusMessage {
//     title: string;
//     subtitle: string;
//     message: string;
// }

// const getReservationStatusMessage = (status: ReservationStateEnum): ReservationStatusMessage => {    
//     let title: string;
//     let subtitle: string;
//     let message: string;

//     switch (status) {
//         case ReservationStateEnum.PAID:
//             title = '¡Gracias por tu pago!';
//             subtitle = 'Tu reserva ha sido confirmada';
//             message = 'Tu pago ha sido procesado correctamente. En breve recibirás un correo con la confirmación de tu reserva y toda la información que necesitas. ¡Nos vemos pronto!';;
//             break;
//         case ReservationStateEnum.PENDING:
//             title = 'Reserva Pendiente';
//             subtitle = 'Tu reserva esta pendiente de confirmación';
//             message = 'Tu reserva se está en espera de confirmación por falta de pago. Por favor, realiza el pago para confirmar tu reserva.';;
//             break;
//         case ReservationStateEnum.CANCELLED:
//             title = 'Cancelación de Reserva';
//             subtitle = 'Tu reserva ha sido cancelada';
//             message = 'Te informamos que tu reserva ha sido cancelada. Si deseas hacer una nueva reserva, puedes hacerlo a través de nuestra plataforma. Gracias por tu comprensión.';
//             break;
//         default:
//             throw new Error('Estado de reserva desconocido');
//     }

//     return { title, subtitle, message };
// }

// export const templateConfirmationStatusReservationChanged = (
//     username: string, 
//     status: ReservationStateEnum
// ):string => {

//     const {title, subtitle, message} = getReservationStatusMessage(status);

//     return `
//         <!DOCTYPE html>
//         <html lang="es">
//         <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${title}</title>
//         </head>
//         <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f9;">
//         <div style="max-width: 600px; width: 100%; margin: 40px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #fff; box-shadow: 0px 3px 12px rgba(47, 43, 61, 0.14);">
//             <div style="text-align: center; margin-bottom: 20px;">
//                 <img src="https://riwi.io/wp-content/uploads/2023/07/Fondo-claro-logo2-1.png" alt="Logo de la Compañía" style="width: 100px; height: auto;">
//             </div>
//             <h2 style="color: #181e4b; text-align: center;">${subtitle}</h2>
//             <p style="color: #333;">Hola <span style="color: #181e4b; font-weight: bold;">${username}</span>,</p>
//             <p style="color: #333;">${message}</p>
//             <p style="color: #333;">Si no realizaste esta reserva, por favor ignora este correo o contacta con nuestro soporte.</p>
//         </div>
//         </body>
//         </html>
//     `;
// }




// // <p style="color: #333;">Detalles de tu reserva:</p>
// // <p style="color: #333;"><strong>Fecha:</strong> ${reservationDate}</p>
// // <p style="color: #333;"><strong>Hora:</strong> ${reservationTime}</p>
// // <p style="color: #333;"><strong>Ubicación:</strong> ${reservationLocation}</p>


// import { Injectable } from '@nestjs/common';

// import Mail from 'nodemailer/lib/mailer';

// import { MailConfig } from '@/modules/common/config/mail.config';
// import { EnvConfig } from '@/modules/common/config';
// import { templateConfirmReservation } from '@/modules/common/mails/confirm-reservation';
// import { templateConfirmationStatusReservationChanged } from '@/modules/common/mails/changed-status-reservation.template';
// import { ReservationStateEnum } from '@/modules/common/enums';

// @Injectable()
// export class MailReservationService extends MailConfig {
//   constructor() {
//     super();
//   }

//   async sendReservationConfirm(
//     email: string,
//     username: string,
//     location: string,
//     price: number,
//     date?: string,
//     startTime?: string,
//     endTime?: string,
//     startDate?: string,
//     endDate?: string
//   ): Promise<void> {
//     const mailOptions: Mail.Options = {
//       from: EnvConfig().userMail,
//       to: email,
//       subject: 'Coworking Riwi - Confirmacion de reservacion',
//       html: templateConfirmReservation(
//         username,
//         location,
//         price,
//         date,
//         startTime,
//         endTime,
//         startDate,
//         endDate
//       ),
//     };

//     await this.transporter.sendMail(mailOptions);
//   }

//   async sendReservationStatus(
//     email: string,
//     username: string,
//     status: ReservationStateEnum,
//   ): Promise<void> {
//     const mailOptions: Mail.Options = {
//       from: EnvConfig().userMail,
//       to: email,
//       subject: 'Coworking Riwi - Estado de reservacion',
//       html: templateConfirmationStatusReservationChanged(username, status),
//     };

//     await this.transporter.sendMail(mailOptions);
//   }
// }



