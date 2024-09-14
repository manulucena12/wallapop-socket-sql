import { Client } from "pg";

const { DB_PROD, DB_TEST, DB_DEV, NODE_ENV } = process.env;

if ((!DB_DEV && !DB_PROD && !DB_TEST) || !NODE_ENV) {
  throw new Error("Missing env variables");
}

const connectionString =
  NODE_ENV === "prod" ? DB_PROD : NODE_ENV === "dev" ? DB_DEV : DB_TEST;

export const client = new Client({
  connectionString,
});

export const databaseConnection = async () => {
  try {
    await client.connect();
    console.log(`Database connected on mode ${NODE_ENV}`);
  } catch (error) {
    console.error("Database not connected", error);
  }
};
