import nodemailer from "nodemailer";

// Khởi tạo transporter từ cấu hình biến môi trường
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_SECURE !== "false", // mặc định dùng SSL trên port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendMailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Gửi email thô với nội dung HTML tùy chỉnh
 */
export async function sendMail({ to, subject, html }: SendMailParams) {
  const mailOptions = {
    from: `"Học Lái Xe Chiến Thắng" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}

interface ContactNotificationParams {
  fullName: string;
  phone: string;
  email?: string | null;
  subject?: string | null;
  message?: string | null;
}

/**
 * Định dạng template HTML và gửi email thông báo học viên đăng ký mới về Gmail
 */
export async function sendContactNotificationEmail({
  fullName,
  phone,
  email,
  subject,
  message,
}: ContactNotificationParams) {
  const receiver = process.env.RECEIVER_EMAIL;
  if (!receiver) {
    console.warn("[Mail Service] Bỏ qua gửi email vì thiếu cấu hình RECEIVER_EMAIL");
    return;
  }

  const cleanEmail = email || "Không cung cấp";
  const cleanSubject = subject || "Đăng ký tư vấn chung";
  const cleanMessage = message || "Không có nội dung tin nhắn";
  const currentTime = new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Đăng ký học viên mới</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 0;
          color: #334155;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          padding: 32px 24px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .header p {
          color: #bfdbfe;
          margin: 8px 0 0 0;
          font-size: 14px;
        }
        .content {
          padding: 32px 24px;
        }
        .welcome-text {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
          color: #475569;
        }
        .info-card {
          background: #f1f5f9;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .info-row {
          display: flex;
          margin-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
        }
        .info-row:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }
        .info-label {
          width: 140px;
          font-weight: 600;
          color: #475569;
          font-size: 14px;
        }
        .info-value {
          flex: 1;
          color: #0f172a;
          font-size: 14px;
        }
        .message-box {
          background: #f8fafc;
          border-left: 4px solid #3b82f6;
          padding: 12px 16px;
          margin-top: 8px;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #475569;
        }
        .footer {
          background-color: #f8fafc;
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          margin: 4px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ĐĂNG KÝ HỌC VIÊN MỚI</h1>
          <p>Hệ thống tự động thông báo từ Website Học Lái Xe</p>
        </div>
        <div class="content">
          <p class="welcome-text">Xin chào Ban Quản Trị,</p>
          <p class="welcome-text">Bạn vừa nhận được một yêu cầu đăng ký tư vấn/học lái xe mới từ website với thông tin chi tiết dưới đây:</p>
          
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">Họ và tên:</span>
              <span class="info-value" style="font-weight: 600;">${fullName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Số điện thoại:</span>
              <span class="info-value"><a href="tel:${phone}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">${phone}</a></span>
            </div>
            <div class="info-row">
              <span class="info-label">Địa chỉ Gmail:</span>
              <span class="info-value">${cleanEmail}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Khóa học:</span>
              <span class="info-value" style="color: #1e3a8a; font-weight: 600;">${cleanSubject}</span>
            </div>
            <div class="info-row" style="flex-direction: column; border-bottom: none; padding-bottom: 0;">
              <span class="info-label" style="width: 100%; margin-bottom: 4px;">Nội dung tin nhắn:</span>
              <div class="message-box">${cleanMessage.replace(/\n/g, "<br>")}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>Thời gian đăng ký: <strong>${currentTime}</strong></p>
          <p>Đây là email tự động từ hệ thống website. Vui lòng không trả lời trực tiếp email này.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendMail({
    to: receiver,
    subject: `[Học viên mới] ${fullName} - ${phone} đăng ký ${cleanSubject}`,
    html: htmlContent,
  });
}
