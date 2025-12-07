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

// Professional GolfTee email template
const getEmailTemplate = (booking) => {
  return `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Booking Cancelled</title>

  <style>
    /* Mobile responsive */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 20px !important;
      }
    }
  </style>
</head>

<body style="background-color:#f5f5f5;margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:30px 0;">
    <tr>
      <td align="center">

        <table class="container" width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;padding:30px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <div style="width:70px;height:70px;background:#16a34a;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;">
                <span style="font-size:40px;color:white;">⛳</span>
              </div>
              <h2 style="font-size:24px;color:#333;margin:10px 0;">GolfTee Booking Update</h2>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td>
              <h3 style="color:#dc2626;font-size:22px;margin-top:0;">
                Your Booking Has Been Cancelled
              </h3>
              <p style="font-size:16px;color:#555;line-height:1.6;">
                Dear ${booking.fullName || 'Customer'},
              </p>

              <p style="font-size:16px;color:#555;line-height:1.6;">
                We wanted to let you know that your booking has been <strong style="color:#dc2626;">cancelled</strong> by the GolfTee administration team.  
                If this was unexpected or you need support, feel free to contact us anytime.
              </p>
            </td>
          </tr>

          <!-- Booking Info Card -->
          <tr>
            <td>
              <div style="
                border:1px solid #ddd;
                border-radius:10px;
                padding:20px;
                margin:25px 0;
                background:#fafafa;
              ">
                <h3 style="margin-top:0;color:#333;">Booking Details</h3>
                <p style="margin:5px 0;font-size:16px;"><strong>Booking ID:</strong> ${booking.id}</p>
                <p style="margin:5px 0;font-size:16px;"><strong>Course:</strong> ${booking.courseName || 'N/A'}</p>
                <p style="margin:5px 0;font-size:16px;"><strong>Date:</strong> ${booking.date}</p>
                <p style="margin:5px 0;font-size:16px;"><strong>Time:</strong> ${booking.startTime || 'N/A'} – ${booking.endTime || 'N/A'}</p>
                <p style="margin:5px 0;font-size:16px;"><strong>Players:</strong> ${booking.noPlayers || 0}</p>
                <p style="margin:5px 0;font-size:16px;"><strong>Non-Players:</strong> ${booking.nonPlayers || 0}</p>
                <p style="margin:5px 0;font-size:16px;"><strong>Status:</strong> 
                  <span style="color:#dc2626;font-weight:bold;">Cancelled</span>
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center">
              <a href="https://golftee.lk/app" 
                style="
                  background:#16a34a;
                  padding:12px 25px;
                  color:#fff;
                  text-decoration:none;
                  font-size:16px;
                  border-radius:6px;
                  display:inline-block;
                  margin-bottom:25px;
                ">
                Book Again
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="color:#888;font-size:14px;">
              <p style="margin:0;">GolfTee © 2025 • All Rights Reserved</p>
              <p style="margin:5px 0;">This is an automated message. Please do not reply.</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
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

    const mailOptions = {
      from: '"GolfTee Bookings" <official.golftee@gmail.com>',
      to,
      subject: 'Your GolfTee Booking Has Been Cancelled',
      html: getEmailTemplate(booking),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to ${to}`);
  } catch (err) {
    console.error('Error sending cancellation email:', err);
    // Don't throw error - email failure shouldn't break the cancel flow
  }
};

module.exports = { sendCancellationEmail };
