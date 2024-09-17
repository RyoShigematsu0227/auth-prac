import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function PUT(request: any, context: any) {
  const reqBody = request.json();

  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);
    if (singleItem.email === reqBody.email) {
      await ItemModel.updateOne({ _id: context.params.id }, reqBody);
      return NextResponse.json({ message: "アイテム編集成功" });
    } else {
      return NextResponse.json({ message: "他の人が作成したアイテムです" });
    }
  } catch (error) {
    return NextResponse.json({ message: "アイテム編集失敗" });
  }
}
