import mongoose from "mongoose";

async function connectToMongoDB(): Promise<void> {
  const username = "root";
  const password = "example";
  const host = "mongo-service";
  const port = "27017";
  const database = "unread";
  const authSource = "admin";

  const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`;

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

export default connectToMongoDB;
