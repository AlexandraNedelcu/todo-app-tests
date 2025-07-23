const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

let users = [{ username: "test", password: "1234" }];
let todos = [
  { id: 1, title: "First task", completed: false },
];
let currentId = 2;

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const found = users.find((u) => u.username === username && u.password === password);
  if (found) res.json({ success: true });
  else res.status(401).json({ success: false, message: "Invalid credentials" });
});

// Get todos
app.get("/items", (req, res) => {
  res.json(todos);
});

// Create todo
app.post("/items", (req, res) => {
  const { title } = req.body;
  const newItem = { id: currentId++, title, completed: false };
  todos.push(newItem);
  res.status(201).json(newItem);
});

// Update todo
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ message: "Item not found" });
  todos[index] = { ...todos[index], title, completed };
  res.json(todos[index]);
});

// Delete todo
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ message: "Item not found" });
  todos.splice(index, 1);
  res.json({ success: true });
});

// Delete all todos
app.delete('/items', (req, res) => {
  todos = [];
  res.sendStatus(204);
});

module.exports = app;