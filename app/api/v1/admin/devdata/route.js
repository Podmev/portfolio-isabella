import { initMongoose } from "@/app/_lib/initMongoose";
import articleModel from "@/app/_models/articleModel";
import { NextResponse } from "next/server";
import axiosWithUrl from "@/app/_lib/axiosWithUrl";

export async function DELETE(req) {
  await initMongoose();
  console.log("deleteData");
  try {
    await articleModel.deleteMany();
    console.log("Data successfully deleted!");
    return NextResponse.json(
      { status: "success", message: null },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await initMongoose();
  console.log("importData");
  try {
    const articles = (await axiosWithUrl.get("cache/articles.json")).data;
    await articleModel.create(articles);
    console.log("Data successfully loaded!");
    return NextResponse.json(
      { status: "success", message: `Imported ${articles.length} articles` },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
