import { client } from ".";

export const queries = async () => {
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL,
                passwordhash TEXT NOT NULL,
                fullname TEXT NOT NULL,
                avatar TEXT NOT NULL
            )
        `);
    await client.query(`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                price INT NOT NULL,
                description TEXT NOT NULL,
                location TEXT NOT NULL,
                condition TEXT NOT NULL,
                category TEXT NOT NULL,
                photo TEXT NOT NULL,
                user_id INT NOT NULL REFERENCES users(id)
            )
        `);
    console.log("Database is structured");
  } catch (error) {
    console.log(error);
  }
};
