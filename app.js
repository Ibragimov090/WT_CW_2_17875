const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

let reviews = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { reviews: reviews });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/reviews', (req, res) => {
  const { title, author, genre, review } = req.body;
  reviews.push({ id: Date.now(), title, author, genre, review });
  res.redirect('/');
});

// Edit route (GET)
app.get('/edit/:id', (req, res) => {
  const review = reviews.find(r => r.id == req.params.id);
  if (review) {
    res.render('edit', { review });
  } else {
    res.status(404).send('Review not found');
  }
});

// Edit route (POST)
app.post('/edit/:id', (req, res) => {
  const { title, author, genre, review } = req.body;
  const index = reviews.findIndex(r => r.id == req.params.id);
  if (index !== -1) {
    reviews[index] = { id: reviews[index].id, title, author, genre, review };
    res.redirect('/');
  } else {
    res.status(404).send('Review not found');
  }
});

// Delete route
app.post('/delete/:id', (req, res) => {
  reviews = reviews.filter(r => r.id != req.params.id);
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});