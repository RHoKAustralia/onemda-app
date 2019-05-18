require('dotenv').config();
import mongoose from "mongoose";

import connectToMongoDb from "../connectToMongoDb";
import User from "../models/User";

connectToMongoDb(process.env.DB_URL);

mongoose.connection.once(
  "open",
  async () => {
    const db = mongoose.connection.db;

    await seedData(db);

    mongoose.connection.close();
  }
);

async function seedData(db) {
  await dropCollections(db);
  await createData();
}

async function dropCollections(db) {
  const collections = await db.listCollections().toArray();

  for (const collection of collections) {
    const name = collection.name;

    if (!name.startsWith("system.")) {
      await db.dropCollection(name);
    }
  }
}

async function createData() {
  await createUsers();
}

async function createUsers() {
  await User.insertMany([
    {
      username: "admin",
      email: "admin1@onemda.com.au",
      name: "Test Admin",
      password: "$2b$10$wmPoHgyzpZhbAMMaFTd/5OyUeQ9xnM.5Y8kDI0MpKio5cJcoSpNR6",
      roles: ["admin"]
    },
    {
      username: "supporter",
      name: "Test Supporter",
      password: "$2b$10$wmPoHgyzpZhbAMMaFTd/5OyUeQ9xnM.5Y8kDI0MpKio5cJcoSpNR6",
      roles: ["supporter"]
    },
    {
      username: "trainer",
      name: "Test Trainer",
      password: "$2b$10$wmPoHgyzpZhbAMMaFTd/5OyUeQ9xnM.5Y8kDI0MpKio5cJcoSpNR6",
      roles: ["trainer"]
    },
    {
      username: "participant",
      name: "Test Participant",
      password: "$2b$10$wmPoHgyzpZhbAMMaFTd/5OyUeQ9xnM.5Y8kDI0MpKio5cJcoSpNR6",
      roles: ["participant"]
    },
  ]);
}
