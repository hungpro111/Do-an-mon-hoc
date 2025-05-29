import { NextResponse } from "next/server";
import { otpStore } from "../send-otp/route";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const record = otpStore.get(email);
  if (!record) {
    return NextResponse.json({ valid: false, error: "Không tìm thấy mã OTP" });
  }

  const isExpired = Date.now() > record.expires;
  const isMatch = otp === record.otp;

  if (isExpired) {
    otpStore.delete(email);
    return NextResponse.json({ valid: false, error: "Mã OTP đã hết hạn" });
  }

  if (!isMatch) {
    return NextResponse.json({ valid: false, error: "Mã OTP không đúng" });
  }

  // Xác minh thành công
  otpStore.delete(email);
  return NextResponse.json({ valid: true });
}
