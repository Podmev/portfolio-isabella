import { initMongoose } from "@/app/_lib/initMongoose";
import articleModel from "@/app/_models/articleModel";
import { NextResponse } from "next/server";
import axiosWithUrl from "@/app/_lib/axiosWithUrl";
import companyModel from "@/app/_models/companyModel";

export async function DELETE(req) {
  await initMongoose();
  console.log("deleteData");
  try {
    await companyModel.deleteMany();
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
    const companies = (await axiosWithUrl.get("cache/companies.json")).data;
    const articles = (await axiosWithUrl.get("cache/articles.json")).data;

    await companyModel.create(companies);
    await articleModel.create(articles);

    console.log("Data successfully loaded!");
    return NextResponse.json(
      {
        status: "success",
        message: `Imported ${articles.length} articles, ${companies.length} companies`,
      },
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

export async function PATCH(req) {
  await initMongoose();
  console.log("reimportData");
  try {
    await companyModel.deleteMany();
    await articleModel.deleteMany();

    console.log("Data successfully deleted!");

    const companies = (await axiosWithUrl.get("cache/companies.json")).data;
    const articles = (await axiosWithUrl.get("cache/articles.json")).data;

    await companyModel.create(companies);
    await articleModel.create(articles);

    console.log("Data successfully loaded!");
    return NextResponse.json(
      {
        status: "success",
        message: `Imported ${articles.length} articles, ${companies.length} companies`,
      },
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
