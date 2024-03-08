import mongoose, { Connection, Mongoose } from "mongoose";
import { DatabaseData } from "./database.data";
import { DatabaseConnectionError } from "@Commons/errors/factory/database.connection.error";

export class DataBaseController {
  private dataBaseData: DatabaseData;
  private connection: Connection | null;

  constructor(dataBaseData: DatabaseData) {
    this.dataBaseData = dataBaseData;
    this.connection = null;
  }

  async connect(): Promise<void> {
    const url = `mongodb://${this.dataBaseData.mongoUsername}:${this.dataBaseData.mongoPassword}@${this.dataBaseData.mongoHostname}:${this.dataBaseData.mongoPort}/${this
      .dataBaseData.mongoDB}?authSource=admin`;

    try {
      mongoose.set('strictQuery', false);
      const mongooseInstance: Mongoose = await mongoose.connect(url, {});
      this.connection = mongooseInstance.connection;
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log("Failed to connect MongoDB", err);
      throw new DatabaseConnectionError();
    }
  }

  get(): Connection | null {
    return this.connection;
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      console.log("Disconnected from MongoDB");
    }else{
      console.log("Connection never was open");
    }
  }

}