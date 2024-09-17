import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function DELETE(request: any, context: any) {
  const reqBody = await request.json();

  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);

    // ① DBのemailと、requestで来たemailを照合
    if (singleItem.email === reqBody.email) {
      // ② 合致した場合だけ関数実行
      await ItemModel.deleteOne({ _id: context.params.id });
      return NextResponse.json({ message: "アイテム削除成功" });
    } else {
      return NextResponse.json({ message: "他の人が作成したアイテムです" });
    }
  } catch (error) {
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}
