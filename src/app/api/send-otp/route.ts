export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Lưu OTP tạm (có thể dùng Redis/DB thực tế)
const otpStore = new Map<string, { otp: string; expires: number }>();

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, error: "Thiếu email" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // hết hạn sau 5 phút
  otpStore.set(email, { otp, expires });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Mã OTP của bạn",
      html: `<p>Mã OTP của bạn là: <b>${otp}</b></p><p>Mã này sẽ hết hạn sau 5 phút.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    return NextResponse.json({ success: false, error: "Không gửi được email" }, { status: 500 });
  }
}

// Cho phép truy cập otpStore bên ngoài nếu cần
export { otpStore };
