import { NextResponse, NextRequest } from "next/server";
import { initMongoose } from "../../../_lib/initMongoose";
import Article from "../../../_models/Article";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("get article by id");
  await initMongoose();
  console.log(params.id);
  // if (!mongoose.Types.ObjectId.isValid(params.id))
  //   return NextResponse.json(
  //     { msg: `No article with id :${params.id}` },
  //     { status: 404 }
  //   );
  const a = await Article.findById(params.id).exec();
  console.log(a);
  return NextResponse.json(await Article.findById(params.id).exec());
}
