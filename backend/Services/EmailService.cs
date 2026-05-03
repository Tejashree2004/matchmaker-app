using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace backend.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendOtpAsync(string toEmail, string otp)
        {
            try
            {
                var email = new MimeMessage();

                email.From.Add(MailboxAddress.Parse(_config["SMTP:Email"]));
                email.To.Add(MailboxAddress.Parse(toEmail));
                email.Subject = "MatchMaker OTP 💖";

                // ✅ IMPROVED EMAIL BODY ONLY (design + clarity)
                email.Body = new TextPart("html")
{
    Text = $@"
<div style='font-family:Arial,sans-serif; padding:20px; background:#f7f7f7;'>

  <div style='max-width:500px; margin:auto; background:white; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1);'>

    <h2 style='color:#ff4b6e; text-align:center;'>🔐 MatchMaker OTP</h2>

    <p>Hello,</p>

    <p>Use the OTP below to verify your account:</p>

    <div style='text-align:center; margin:20px 0;'>
      <span style='font-size:28px; font-weight:bold; color:#ffffff; background:#ff4b6e; padding:10px 20px; border-radius:8px; letter-spacing:3px;'>
        {otp}
      </span>
    </div>

    <p><b>⏳ Valid for:</b> 10 minutes</p>

    <p><b>🕒 Requested at:</b> {DateTime.Now:dd MMM yyyy HH:mm}</p>

    <p style='color:#777; font-size:12px;'>
      If you did not request this, ignore this email.
    </p>

    <hr/>

    <p style='text-align:center; color:#ff4b6e; font-weight:bold;'>
      MatchMaker Team ❤️
    </p>

  </div>
</div>
"
};
                using var smtp = new SmtpClient();

                await smtp.ConnectAsync(
                    _config["SMTP:Host"],
                    Convert.ToInt32(_config["SMTP:Port"]),
                    SecureSocketOptions.StartTls
                );

                await smtp.AuthenticateAsync(
                    _config["SMTP:Email"],
                    _config["SMTP:Password"]
                );

                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ OTP EMAIL FAILED: " + ex.Message);
            }
        }
    }
}