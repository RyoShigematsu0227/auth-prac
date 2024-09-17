import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://ryo:<password(省略)>@cluster0.44lsp.mongodb.net/nextEc?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Success: Connected to MongoDB");
  } catch (error) {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
}
