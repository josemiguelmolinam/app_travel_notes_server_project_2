require('dotenv').config();

const getDB = require('./getDB');

const main = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log('Borrando tablas...');

    // await connection.query("DROP TABLE IF EXISTS notes");
    // await connection.query("DROP TABLE IF EXISTS categories");
    // await connection.query("DROP TABLE IF EXISTS users");
    await connection.query('DROP DATABASE IF EXISTS notes');
    console.log('creando base datos');
    await connection.query('CREATE DATABASE notes');
    await connection.query('USE notes');
    console.log('Creando tablas...');

    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                createdAt DATETIME NOT NULL
                
              )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(100) NOT NULL,
                text TEXT NOT NULL,
                categoryId INT UNSIGNED NOT NULL,
                isPublic BOOLEAN DEFAULT false,
                userId INT UNSIGNED,
                image VARCHAR(100),
                createdAt DATETIME NOT NULL,
                modifiedAt DATETIME ,
                FOREIGN KEY (userId) REFERENCES users(id)
              )  
           `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                createdAt DATETIME NOT NULL
                )
    `);

    console.log('!Tablas creadas con exito');

    //agregamos las categorias
    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('lista compra', ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO categories (name, createdAt) VALUES ('lista pelis', ?)`,
      [new Date()]
    );
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();
