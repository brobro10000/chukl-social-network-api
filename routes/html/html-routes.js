const router = require('express').Router();
const path = require('path');



router.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/', (req, res) => {
  res.redirect('/index')
});

module.exports = router;
