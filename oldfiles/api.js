const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 8080;

// Create a connection to the Sakila database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'user',
    database: 'sakila'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the Sakila database');
});

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`));

// Define a GET endpoint to fetch actors
app.get('/actors', (req, res) => {
    connection.query('SELECT * FROM actor', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send(results);
    });
});

// Define a GET endpoint to fetch films
app.get('/films', (req, res) => {
    connection.query('SELECT * FROM film', (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).send(results);
    });
});