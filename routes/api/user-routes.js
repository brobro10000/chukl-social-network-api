const router = require('express').Router();
const { getAllUsers, getUsersById, createUser, updateUser, deleteUser } = require('../../controllers/user-controller.js');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUsersById).put(updateUser).delete(deleteUser)

module.exports = router;