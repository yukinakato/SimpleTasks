const express = require('express');
const mysql = require('mysql')
require('dotenv').config()

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// initialize database table
pool.getConnection((err, connection) => {
  connection.query('start transaction');
  connection.query('drop table if exists tasks');
  connection.query(' \
    create table tasks ( \
      id int unsigned auto_increment primary key, \
      name text not null, \
      priority int not null, \
      completed bit default 0 not null \
    )'
  );
  connection.query('insert into tasks (name, priority) values ("メモ欄", 0)');
  connection.query('insert into tasks (name, priority) values ("買い物に行く", 3)');
  connection.query('insert into tasks (name, priority) values ("洗濯する", 3)');
  connection.query('insert into tasks (name, priority) values ("部屋の掃除", 3)');
  connection.query('insert into tasks (name, priority) values ("郵便局へ行く", 2)');
  connection.query('insert into tasks (name, priority) values ("知人に電話する", 2)');
  connection.query('insert into tasks (name, priority) values ("本屋へ行く", 1)');
  connection.query('commit');
  connection.release();
});

app.get('/', (req, res) => {
  pool.query(
    'select * from tasks',
    (error, results) => {
      res.render('top.ejs', { tasks: results });
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs', { priority: req.query.p });
});

app.post('/create', (req, res) => {
  pool.query(
    'insert into tasks (name, priority) values (?, ?)',
    [req.body.input_task, req.query.p],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.get('/:id/edit/', (req, res) => {
  pool.query(
    'select * from tasks where id = ?',
    [req.params.id],
    (error, results) => {
      if (results.length > 0)
        res.render('edit.ejs', { task: results });
      else
        res.redirect('/');
    }
  );
});

app.post('/:id/update', (req, res) => {
  pool.query(
    'update tasks set name = ? where id = ?',
    [req.body.input_task, req.params.id],
    (error, results) => {
      if (results.affectedRows === 0)  // if not exist when submit pressed
        pool.query(
          'insert into tasks (name, priority) values (?, ?)',
          [req.body.input_task, req.query.p],
          (error, results) => {
            res.redirect('/');
          }
        );
      else
        res.redirect('/');
    }
  );
});



app.post('/:id/delete', (req, res) => {
  pool.query(
    'delete from tasks where id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.get('/reset', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('start transaction');
    connection.query('delete from tasks');
    connection.query('alter table tasks auto_increment=1');

    connection.query('insert into tasks (name, priority) values ("買い物に行く", 3)');
    connection.query('insert into tasks (name, priority) values ("洗濯する", 3)');
    connection.query('insert into tasks (name, priority) values ("部屋の掃除", 3)');
    connection.query('insert into tasks (name, priority) values ("郵便局へ行く", 2)');
    connection.query('insert into tasks (name, priority) values ("知人に電話する", 2)');
    connection.query('insert into tasks (name, priority) values ("本屋へ行く", 1)');
    connection.query('insert into tasks (name, priority) values ("メモ欄", 0)');

    connection.query('commit');
    connection.release();
  });
  res.redirect('/');
});


app.listen(process.env.PORT || 3000);
