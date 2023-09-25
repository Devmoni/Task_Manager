const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Sample initial tasks
let tasks = [
  { id: 1, title: 'Sample Task 1', priority: 'High', dueDate: '2023-09-30' },
  { id: 2, title: 'Sample Task 2', priority: 'Medium', dueDate: '2023-10-15' },
];

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { title, priority, dueDate } = req.body;
  const id = tasks.length + 1;
  tasks.push({ id, title, priority, dueDate });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    res.redirect('/');
  } else {
    res.render('edit', { task });
  }
});

app.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, priority, dueDate } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { id, title, priority, dueDate };
  }
  res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
