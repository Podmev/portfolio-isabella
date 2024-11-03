import { NextResponse, NextRequest } from "next/server";
import { initMongoose } from "../../../_lib/initMongoose";
import Article from "../../../_models/Article";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await initMongoose();
  if (!mongoose.Types.ObjectId.isValid(params.id))
    return NextResponse.json(
      { msg: `No article with id: ${params.id}` },
      { status: 404 }
    );
  return NextResponse.json(await Article.findById(params.id).exec());
}
