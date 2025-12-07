const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send booking cancellation email to customer
const sendCancellationEmail = async (to, booking) => {
  try {
    if (!to) {
      console.log('No email address provided, skipping email notification');
      return;
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not configured, skipping email notification');
      return;
    }

    const transporter = createTransporter();

    const endTime = booking.endTime || `${parseInt(booking.time.split(':')[0]) + 1}:${booking.time.split(':')[1]}`;

    const mailOptions = {
      from: '"GolfTee Bookings" <noreply@golftee.com>',
      to,
      subject: 'Your GolfTee Booking Has Been Cancelled',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #16a34a; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .booking-details { background: white; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0; }
              .detail-row { margin: 8px 0; }
              .label { font-weight: bold; color: #374151; }
              .footer { margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">Booking Cancelled</h2>
              </div>
              <div class="content">
                <p>Dear ${booking.fullName || 'Customer'},</p>
                <p>We regret to inform you that your GolfTee booking has been cancelled by our admin team.</p>

                <div class="booking-details">
                  <h3 style="margin-top: 0; color: #111;">Booking Details</h3>
                  <div class="detail-row">
                    <span class="label">Booking ID:</span> ${booking.id}
                  </div>
                  <div class="detail-row">
                    <span class="label">Course:</span> ${booking.courseName || 'N/A'}
                  </div>
                  <div class="detail-row">
                    <span class="label">Date:</span> ${booking.date}
                  </div>
                  <div class="detail-row">
                    <span class="label">Time:</span> ${booking.startTime || booking.time} - ${endTime}
                  </div>
                  <div class="detail-row">
                    <span class="label">Players:</span> ${booking.noPlayers || booking.players_count || 0}
                  </div>
                </div>

                <p>If you have any questions or would like to reschedule, please contact our support team.</p>

                <div class="footer">
                  <p>© 2025 GolfTee Admin Portal. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to ${to}`);
  } catch (err) {
    console.error('Error sending cancellation email:', err);
    // Don't throw error - email failure shouldn't break the cancel flow
  }
};

module.exports = { sendCancellationEmail };
