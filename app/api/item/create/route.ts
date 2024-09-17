import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request: any) {
  const reqBody = await request.json();

  try {
    await connectDB();
    await ItemModel.create(reqBody);
    return NextResponse.json({ message: "アイテム作成成功" });
  } catch (error) {
    return NextResponse.json({ message: "アイテム作成失敗" });
  }
}
