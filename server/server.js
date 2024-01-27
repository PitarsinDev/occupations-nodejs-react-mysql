const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.post('/api/occupations', (req, res) => {
    const { name, salary } = req.body;
    const sql = 'INSERT INTO occupations (name, salary) VALUES (?, ?)';
    db.query(sql, [name, salary], (err, result) => {
      if (err) {
        console.error('Error creating occupation:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).send('Occupation created successfully');
      }
    });
});

app.get('/api/occupations', (req, res) => {
    const sql = 'SELECT * FROM occupations';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching occupations:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
});

app.put('/api/occupations/:id', (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
    const sql = 'UPDATE occupations SET name=?, salary=? WHERE id=?';
    db.query(sql, [name, salary, id], (err, result) => {
      if (err) {
        console.error('Error updating occupation:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Occupation updated successfully');
      }
    });
});

app.delete('/api/occupations/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM occupations WHERE id=?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting occupation:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Occupation deleted successfully');
      }
    });
});  

app.listen(port, () => {
    console.log('Server is runnning');
});