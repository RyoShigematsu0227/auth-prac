import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request: any) {
  // ① トークンの存在をチェック
  const token = await request.headers.get("Authorization")?.split(" ")[1]
  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }
  try {
    // ② トークンがあれば、有用性をチェック
    const secretKey = new TextEncoder().encode("next-market-app-book")
    const decodedJwt = await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "トークンが正しくないので、ログインしてください" });
  }
}

export const config = {
  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}
