import fs from "fs";
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
import Article from "@/app/_models/articleModel";

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE_URL.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("DB connection successful!"));

// READ JSON FILE

const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/articles.json`, "utf-8")
);

//IMPORT DATA INTO DB

export async function importData() {
  console.log("importData");
  try {
    await Article.create(articles);
    console.log("Data successfully loaded!");
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
  //   process.exit();
}

// DELETE ALL DATA FROM DB
export async function deleteData() {
  console.log("deleteData");
  try {
    await Article.deleteMany();
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
  //   process.exit();
}
