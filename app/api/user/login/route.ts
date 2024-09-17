import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const reqBody = await request.json();

  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });
    // ① その人がユーザー登録を済ませているかどうかをチェック
    if (savedUserData) {
      // ② 登録していたら、パスワードをチェック
      if (reqBody.password === savedUserData.password) {
        // ③ パスワード一致したら、トークンを発行し、フロントに送る
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const payload = {
          email: reqBody.email,
        }
        const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1d").sign(secretKey)
        return NextResponse.json({ message: "ログイン成功", token: token });
      } else {
        return NextResponse.json({ message: "ログイン失敗：パスワードが間違っています" });
      }
    } else {
      return NextResponse.json({ message: "ログイン失敗：ユーザー登録をしてください" });
    }
  } catch (error) {
    return NextResponse.json({ message: "ログイン失敗" });
  }
}
