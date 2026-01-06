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

export const sendOrderConfirmationEmail = async (order) => {
  const { customerEmail, customerName, _id: orderId, products, totalPrice, shippingAddress, createdAt } = order;

  // Format products for display
  const productRows = products.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: left;">
        <div style="font-weight: 600; color: #2d3748;">${item.product?.name || 'Product'}</div>
        <div style="font-size: 14px; color: #718096;">
          ${item.color ? `Color: ${item.color}` : ''} ${item.size ? `Size: ${item.size}` : ''} Quantity: ${item.quantity}
        </div>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: #2d3748;">
        $${(item.product?.price * item.quantity || 0).toFixed(2)}
      </td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `Order Confirmation - Order #${orderId.toString().slice(-8).toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Luxe Bags</title>
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
                    <div style="text-align: center; margin-bottom: 30px;">
                      <div style="display: inline-block; background-color: #48bb78; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                        ✅ Order Confirmed
                      </div>
                    </div>

                    <h2 style="color: #2d3748; font-size: 24px; font-weight: 600; margin: 0 0 10px 0; text-align: center;">
                      Thank You for Your Order, ${customerName}! 🎉
                    </h2>

                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
                      Your luxury purchase has been confirmed. We're thrilled to have you as part of our exclusive community.
                    </p>

                    <!-- Order Details Box -->
                    <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin: 30px 0;">
                      <h3 style="color: #2d3748; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
                        📋 Order Details
                      </h3>

                      <div style="margin-bottom: 15px;">
                        <strong style="color: #4a5568;">Order ID:</strong>
                        <span style="color: #667eea; font-weight: 600;">#${orderId.toString().slice(-8).toUpperCase()}</span>
                      </div>

                      <div style="margin-bottom: 15px;">
                        <strong style="color: #4a5568;">Order Date:</strong>
                        <span style="color: #2d3748;">${new Date(createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>

                      <div style="margin-bottom: 20px;">
                        <strong style="color: #4a5568;">Shipping Address:</strong><br>
                        <span style="color: #2d3748;">
                          ${shippingAddress?.address || ''}<br>
                          ${shippingAddress?.city || ''}, ${shippingAddress?.postalCode || ''}<br>
                          ${shippingAddress?.country || ''}
                        </span>
                      </div>

                      <!-- Products Table -->
                      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <thead>
                          <tr style="background-color: #edf2f7;">
                            <th style="padding: 12px; text-align: left; font-weight: 600; color: #2d3748; border-bottom: 2px solid #e2e8f0;">
                              Product Details
                            </th>
                            <th style="padding: 12px; text-align: right; font-weight: 600; color: #2d3748; border-bottom: 2px solid #e2e8f0;">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${productRows}
                          <tr style="background-color: #f7fafc;">
                            <td style="padding: 15px; text-align: right; font-weight: 700; color: #2d3748; font-size: 16px; border-top: 2px solid #e2e8f0;">
                              Total Amount:
                            </td>
                            <td style="padding: 15px; text-align: right; font-weight: 700; color: #667eea; font-size: 18px; border-top: 2px solid #e2e8f0;">
                              $${totalPrice.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- Next Steps -->
                    <div style="background-color: #e6fffa; border: 1px solid #b2f5ea; border-radius: 8px; padding: 20px; margin: 30px 0;">
                      <h4 style="color: #234e52; font-size: 16px; font-weight: 600; margin: 0 0 15px 0;">
                        🚚 What's Next?
                      </h4>
                      <ul style="color: #2d3748; margin: 0; padding-left: 20px;">
                        <li style="margin-bottom: 8px;">Our artisans are carefully preparing your luxury items</li>
                        <li style="margin-bottom: 8px;">You'll receive tracking information once your order ships</li>
                        <li style="margin-bottom: 8px;">Expected delivery: 5-7 business days</li>
                        <li>Questions? Contact our concierge at support@luxebags.com</li>
                      </ul>
                    </div>

                    <!-- Contact Info -->
                    <div style="text-align: center; margin: 30px 0;">
                      <p style="color: #4a5568; font-size: 16px; margin: 0 0 10px 0;">
                        Need assistance with your order?
                      </p>
                      <a href="mailto:support@luxebags.com"
                         style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 16px;">
                        📧 Contact Our Luxury Concierge
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #718096; font-size: 14px; margin: 0 0 15px 0;">
                      Thank you for choosing Luxe Bags - where luxury meets excellence.
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
    console.log('Order confirmation email sent to:', customerEmail);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw new Error('Failed to send order confirmation email');
  }
};
