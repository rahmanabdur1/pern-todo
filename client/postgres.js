// CREATE DATABASE perntodo;

// CREATE TABLE todo (
//     id VARCHAR(255) PRIMARY KEY,
//     name VARCHAR(20),
//     description VARCHAR(255)
// );

// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   username VARCHAR(50) UNIQUE,
//   email VARCHAR(100) UNIQUE,
//   password VARCHAR(255)
// );


// CREATE TABLE counter_table (
//   id VARCHAR(255) PRIMARY KEY,
//   counter INTEGER NOT NULL DEFAULT 0
// );

// CREATE TABLE counter (
//   id INTEGER PRIMARY KEY,  
//   value INTEGER NOT NULL DEFAULT 0
// );
// INSERT INTO counter (value) VALUES (0);

// CREATE TABLE products (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255),
//   price NUMERIC,
//   category VARCHAR(255),
//   title VARCHAR(255),
//   description TEXT,
//   color VARCHAR(255) ARRAY,
//   img VARCHAR(255)
// );



// -- [] DEFAULT '{}'::VARCHAR(255)[]







// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "kthl8822",
//   host: "localhost",
//   port: 5432,
//   database: "perntodo"
// });

// module.exports = pool;












// const express = require("express");
// const app = express();
// const cors = require("cors");
// const PORT = 3001;
// const { v4: uuidv4 } = require('uuid'); 
// const pool = require("./db");


// // middleware
// app.use(cors());
// app.use(express.json()); // req.body

// // route


// // create a todo
// app.post("/todos", async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const id = uuidv4(); // Generate a unique ID for the todo

//     // Validate input data (optional, but recommended)
//     if (!name || !description) {
//       res.status(400).send("Please provide both name and description");
//       return;
//     }

//     const newTodo = await pool.query(
//       "INSERT INTO todo (id, name, description) VALUES ($1, $2, $3) RETURNING *",
//       [id, name, description]
//     );

//     res.status(201).json(newTodo.rows[0]); // Send the newly created todo as a response
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });


// app.get('/todos', async (req, res) => {
//   try {
//    const result = await pool.query('SELECT * FROM todo');
 
//    const todos = result.rows; // Extract the todo data from the result
 
//    res.json(todos); // Send the todos as a JSON response
//   } catch (err) {
//    console.error(err.message);
//    res.status(500).send("Server Error");
//   }
//  });

// // get a todo
// app.put('/todos/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description } = req.body;
//     const result = await pool.query('UPDATE todo SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });



// // delete a todo
// app.delete('/todos/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query('DELETE FROM todo WHERE id = $1 RETURNING *', [id]);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });



// app.get('/products/:productId', async (req, res) => {
//   const productId = req.params.productId;

//   try {
//     const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);

//     if (rows.length === 0) {
//       res.status(404).json({ error: 'Product not found' });
//     } else {
//       res.json(rows[0]);
//     }
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// app.get('/products', async (req, res) => {
//   try {
//     const { rows } = await pool.query('SELECT * FROM products');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/products', async (req, res) => {
//   try {
//     const { name, price, category, title, description, color, img } = req.body;

//     const result = await pool.query(
//       'INSERT INTO products (name, price, category, title, description, color, img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
//       [name, parseFloat(price), category, title, description, color || [], img]
//     );    
    
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error inserting data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// app.get('/', async (req, res) => {
//     res.send('blogs  server is running');
//   });

  
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



