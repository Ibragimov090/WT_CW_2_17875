const express = require('express');
const path = require('path');
const methodOverride = require('method-override'); // For PUT/DELETE in forms
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // Enable PUT/DELETE via POST

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
const indexRouter = require('./routes/index');
const reviewsRouter = require('./routes/reviews');

app.use('/', indexRouter);
app.use('/reviews', reviewsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});