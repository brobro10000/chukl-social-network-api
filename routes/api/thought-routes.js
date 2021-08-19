const router = require('express').Router();
const { getAllThoughts, getThoughtsById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller.js');

router.route('/').get(getAllThoughts).post(createThought);
router.route('/:id').get(getThoughtsById).put(updateThought).delete(deleteThought)
router.route('/:id/reactions').post(addReaction).delete(deleteReaction)
module.exports = router;