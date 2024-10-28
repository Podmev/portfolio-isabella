import mongoose from "mongoose";

export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  if (typeof process.env.DATABASE_URL === "undefined") {
    throw Error("Env var 'DATABASE_URL' should be defined");
  }
  if (typeof process.env.DATABASE_PASSWORD === "undefined") {
    throw Error("Env var 'DATABASE_PASSWORD' should be defined");
  }
  const DB = process.env.DATABASE_URL.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  return await mongoose
    .connect(DB)
    .then(() => console.log("DB connection successful! "));
}
