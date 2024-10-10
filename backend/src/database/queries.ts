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
    await client.query(`
            CREATE TABLE IF NOT EXISTS reviews(
                id SERIAL PRIMARY KEY,
                reviewer INT NOT NULL REFERENCES users(id),
                reviewed INT NOT NULL REFERENCES users(id),
                content TEXT NOT NULL,
                grade REAL NOT NULL
            )
        `);
    await client.query(`
            CREATE TABLE IF NOT EXISTS chats(
                id SERIAL PRIMARY KEY,
                seller INT NOT NULL REFERENCES users(id),
                interested INT NOT NULL REFERENCES users(id),
                product TEXT NOT NULL,
                sellerview BOOLEAN NOT NULL DEFAULT TRUE, 
                interestedview BOOLEAN NOT NULL DEFAULT TRUE
            )
        `);
    await client.query(`
            CREATE TABLE IF NOT EXISTS messages(
                id SERIAL PRIMARY KEY,
                content TEXT NOT NULL,
                sender INT NOT NULL REFERENCES users(id),
                chat INT NOT NULL REFERENCES chats(id),
                created TIMESTAMP NOT NULL DEFAULT NOW(),
                isedited BOOLEAN NOT NULL DEFAULT FALSE
            )
        `);
    await client.query(`
            CREATE TABLE IF NOT EXISTS likes(
                id SERIAL PRIMARY KEY,
                likedby INT NOT NULL REFERENCES users(id),
                product INT NOT NULL REFERENCES products(id)
            )
        `);
    console.log("Database is structured");
  } catch (error) {
    console.log(error);
  }
};
