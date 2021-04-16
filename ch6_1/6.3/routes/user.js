const express = require('express');
const router = express.Router();

// GET router
router.get('/', (req, res) => {
  let name = 'Jayden';
  res.send(`<h1>router-get hello User ${name} Router</h1>`);
});

module.exports = router;