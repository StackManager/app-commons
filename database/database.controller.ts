import { DatabaseConnectionError } from '@Helpers/errors/Factory/DatabaseConnectionError';
import { GenericError } from '@Helpers/errors/Factory/GenericError';
import { MODELERRORTEXTTYPE } from '@Helpers/errors/ModelErrorConfig';
import { ManagerMigrationController } from '@System/migrations/controller/business/ManagerMigrationController';
import mongoose, { Connection, Mongoose } from 'mongoose';

class Database {
  
  private static instance: Database;
  private isConnected: boolean;
  private connection: Connection | null;

  private requiredEnvVariables: string[];

  private constructor() {
    this.isConnected = false;
    this.connection = null;

    this.requiredEnvVariables = [
      'JWT_KEY',
      'MONGO_USERNAME',
      'MONGO_PASSWORD',
      'MONGO_HOSTNAME',
      'MONGO_PORT',
      'MONGO_DB'
    ];
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private validateEnvVariables(): void {
    for (const variable of this.requiredEnvVariables) {
      if (!process.env[variable]) {
        throw new GenericError([{
          message: `${variable} must be defined`,
          field: variable,
          detail: `${variable} must be defined`,
          code: MODELERRORTEXTTYPE.is_value_no_exist
        }]);
      }
    }
  }

  private async connectToDatabase(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    const {
      MONGO_USERNAME,
      MONGO_PASSWORD,
      MONGO_HOSTNAME,
      MONGO_PORT,
      MONGO_DB
    } = process.env;

    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

    try {
      mongoose.set('strictQuery', false);
      const mongooseInstance: Mongoose = await mongoose.connect(url, {});
      this.connection = mongooseInstance.connection;
      this.isConnected = true;
      console.log("Connected to MongoDB");
    } catch (err) {
      throw new DatabaseConnectionError();
    }
  }

  async migrateDatabase(){
    const manager = new ManagerMigrationController();
    await manager.run();
  }


  public async run(): Promise<void> {
    this.validateEnvVariables();
    await this.connectToDatabase();
    await this.migrateDatabase();
  }
}

export default Database;