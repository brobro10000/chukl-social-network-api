const router = require('express').Router();
const { getAllUsers, getUsersById, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/user-controller.js');

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)
router.route('/:id').get(getUsersById).put(updateUser).delete(deleteUser)
router.route('/').get(getAllUsers).post(createUser);
module.exports = router;