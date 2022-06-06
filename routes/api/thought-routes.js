const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  addThought,
  addReaction,
  updateThought,
  removeThought,
  removeReaction
} = require('../../controllers/thought-controller');

// GET all and POST thoughts at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// GET one, PUT, Delete thoughts at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought)

// POST and DELETE reactions at /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction)

module.exports = router;