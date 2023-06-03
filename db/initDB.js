require("dotenv").config();

const getDB = require("./getDB");

const main = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log("Borrando tablas...");

    await connection.query("DROP TABLE IF EXISTS notes");
    await connection.query("DROP TABLE IF EXISTS categories");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("Creando tablas...");

    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME
              )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(100) NOT NULL,
                text TEXT NOT NULL,
                category_id INT UNSIGNED,
                is_public BOOLEAN DEFAULT false,
                userId INT UNSIGNED,
                FOREIGN KEY (userId) REFERENCES users(id)
              )  
           `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                categoryId INT UNSIGNED,    
                FOREIGN KEY (categoryId) REFERENCES categories(id)
        )
    `);

    console.log("!Tablas creadas con exito");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();
