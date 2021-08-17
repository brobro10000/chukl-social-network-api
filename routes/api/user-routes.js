const router = require('express').Router();
const { getAllUsers } = require('../../controllers/user-controller.js');

router.route('/').get(getAllUsers);

module.exports = router;