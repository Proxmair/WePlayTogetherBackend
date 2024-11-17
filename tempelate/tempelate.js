const generateEmailTemplate = (title, message, actionText, actionLink) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
      <div style="margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="text-align: center; background-color: #4f46e5; color: #000000; padding: 30px 0; font-size: 20px; border-radius: 8px 8px 0 0;">
          We Play Together
        </div>

        <!-- Main Content -->
        <div style="padding: 20px; text-align: center; color: #3d4451;">
          <h2 style="color: #4f46e5; font-size: 18px;">${title}</h2>
          <p>${message}</p>
          <a href="${actionLink}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 10px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">
            ${actionText}
          </a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding: 20px; background-color: #f3f4f6; font-size: 12px; color: #3d4451; border-radius: 0 0 8px 8px;">
          <p>If you didn't request this, please ignore this email.</p>
          <p>Stay connected with us:</p>
          <div>
            <a href="https://www.facebook.com" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px;"></a>
            <a href="https://www.twitter.com" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" style="width: 24px;"></a>
            <a href="https://www.instagram.com" style="margin: 0 10px;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px;"></a>
          </div>
          <p>&copy; ${new Date().getFullYear()} We Play Together. All rights reserved.</p>
          <a href="#" style="text-decoration: none; color: #4f46e5;">Unsubscribe</a>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const emailVerfTemplate = (verificationLink) => {
  return generateEmailTemplate(
    "Email Verification",
    "You're almost there! Click the button below to verify your email address:",
    "Verify Email",
    verificationLink
  );
};

export const passwordResetTemplate = (resetLink) => {
  return generateEmailTemplate(
    "Password Reset",
    "You're almost there! Click the button below that will redirect you to the password reset page:",
    "Reset Password",
    resetLink
  );
};