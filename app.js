const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);
app.get('/', (req, res) => {
    res.send('express test');
});

module.exports = app;