import mongoose from "mongoose";

const uri = `mongodb+srv://podmev:${process.env.DATABASE_PASSWORD}@portfolio-isabella.2c87l.mongodb.net/?retryWrites=true&w=majority&appName=portfolio-isabella`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export default async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    console.log("before connect");
    await mongoose.connect(uri, clientOptions);
    console.log("after connect");
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
//run().catch(console.dir);