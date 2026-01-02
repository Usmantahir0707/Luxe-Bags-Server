import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password for Gmail
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Complete Your Luxe Bags Account Setup',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Luxe Bags Account</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                      LUXE BAGS
                    </h1>
                    <p style="color: #e8eaf6; font-size: 16px; margin: 8px 0 0 0; opacity: 0.9;">
                      Where Luxury Meets Elegance
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #2d3748; font-size: 24px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
                      Welcome to Luxe Bags! 🎉
                    </h2>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
                      Thank you for joining our exclusive community. To complete your account setup and start shopping our premium collection, please verify your email address.
                    </p>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 35px 0;">
                      <a href="${verificationUrl}"
                         style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: #ffffff;
                                padding: 16px 32px;
                                text-decoration: none;
                                border-radius: 8px;
                                display: inline-block;
                                font-weight: 600;
                                font-size: 16px;
                                text-transform: uppercase;
                                letter-spacing: 0.5px;
                                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                                transition: all 0.3s ease;">
                        ✅ Verify Email Address
                      </a>
                    </div>

                    <!-- Fallback Link -->
                    <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 30px 0;">
                      <p style="color: #718096; font-size: 14px; margin: 0 0 10px 0; text-align: center;">
                        <strong>If the button doesn't work,</strong> copy and paste this link into your browser:
                      </p>
                      <p style="color: #4a5568; font-size: 14px; word-break: break-all; margin: 0; text-align: center;">
                        <a href="${verificationUrl}" style="color: #667eea; text-decoration: none;">${verificationUrl}</a>
                      </p>
                    </div>

                    <!-- Warning -->
                    <div style="background-color: #fff5f5; border-left: 4px solid #e53e3e; padding: 15px 20px; margin: 25px 0; border-radius: 0 6px 6px 0;">
                      <p style="color: #c53030; font-size: 14px; margin: 0; font-weight: 500;">
                        ⏰ This verification link will expire in 24 hours for security reasons.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #718096; font-size: 14px; margin: 0 0 15px 0;">
                      Questions? Contact our luxury concierge at
                      <a href="mailto:support@luxebags.com" style="color: #667eea; text-decoration: none; font-weight: 500;">support@luxebags.com</a>
                    </p>
                    <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                      © 2024 Luxe Bags. All rights reserved. | Follow us on social media for exclusive deals.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Secure Your Luxe Bags Account - Password Reset',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Luxe Bags Password</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                      LUXE BAGS
                    </h1>
                    <p style="color: #e8eaf6; font-size: 16px; margin: 8px 0 0 0; opacity: 0.9;">
                      Where Luxury Meets Elegance
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #2d3748; font-size: 24px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
                      🔐 Secure Your Account
                    </h2>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
                      We received a request to reset your password for your Luxe Bags account. No worries - it happens to the best of us! Click the button below to create a new secure password.
                    </p>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 35px 0;">
                      <a href="${resetUrl}"
                         style="background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
                                color: #ffffff;
                                padding: 16px 32px;
                                text-decoration: none;
                                border-radius: 8px;
                                display: inline-block;
                                font-weight: 600;
                                font-size: 16px;
                                text-transform: uppercase;
                                letter-spacing: 0.5px;
                                box-shadow: 0 4px 15px rgba(229, 62, 62, 0.4);
                                transition: all 0.3s ease;">
                        🔒 Reset Password Now
                      </a>
                    </div>

                    <!-- Fallback Link -->
                    <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 30px 0;">
                      <p style="color: #718096; font-size: 14px; margin: 0 0 10px 0; text-align: center;">
                        <strong>If the button doesn't work,</strong> copy and paste this link into your browser:
                      </p>
                      <p style="color: #4a5568; font-size: 14px; word-break: break-all; margin: 0; text-align: center;">
                        <a href="${resetUrl}" style="color: #e53e3e; text-decoration: none;">${resetUrl}</a>
                      </p>
                    </div>

                    <!-- Security Notice -->
                    <div style="background-color: #fef5e7; border-left: 4px solid #ed8936; padding: 15px 20px; margin: 25px 0; border-radius: 0 6px 6px 0;">
                      <p style="color: #744210; font-size: 14px; margin: 0; font-weight: 500;">
                        ⚠️ For your security, this reset link will expire in 1 hour. If you didn't request this reset, please ignore this email - your account remains secure.
                      </p>
                    </div>

                    <!-- Additional Info -->
                    <div style="background-color: #f0fff4; border: 1px solid #9ae6b4; border-radius: 8px; padding: 15px 20px; margin: 25px 0;">
                      <p style="color: #22543d; font-size: 14px; margin: 0; font-weight: 500;">
                        💡 <strong>Password Tips:</strong> Choose a strong password with at least 8 characters, including uppercase, lowercase, numbers, and symbols for maximum security.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #718096; font-size: 14px; margin: 0 0 15px 0;">
                      Need help? Our security team is here for you at
                      <a href="mailto:security@luxebags.com" style="color: #667eea; text-decoration: none; font-weight: 500;">security@luxebags.com</a>
                    </p>
                    <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                      © 2024 Luxe Bags. All rights reserved. | Your security is our top priority.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};
