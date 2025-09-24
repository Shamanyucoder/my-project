const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

// In-memory array to store cards
let cards = [
  { id: 1, suit: 'Hearts', value: 'Ace' },
  { id: 2, suit: 'Spades', value: 'King' },
  { id: 3, suit: 'Diamonds', value: 'Queen' }
];

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.get('/cards', (req, res) => {
  res.status(200).json(cards);
});
app.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (card) {
    res.status(200).json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});
app.post('/cards', (req, res) => {
  const newCard = {
    id: cards.length + 1,
    suit: req.body.suit,
    value: req.body.value
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});
app.delete('/cards/:id', (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    const removedCard = cards.splice(index, 1);
    res.status(200).json({ message: `Card with ID ${req.params.id} removed`, card: removedCard[0] });
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
});
