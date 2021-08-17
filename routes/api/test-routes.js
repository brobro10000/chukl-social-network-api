const router = require('express').Router();
const { getAllTest } = require('../../controllers/test-controller.js');

router.route('/').get(getAllTest);

module.exports = router;