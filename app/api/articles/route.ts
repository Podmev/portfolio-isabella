import { NextResponse } from "next/server";
import { initMongoose } from "../../_lib/initMongoose";
import Article from "../../_models/Article";

export async function GET() {
  await initMongoose();
  return NextResponse.json(await Article.find().exec());
}
