const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  createFriend,
  updateUser,
  deleteUser,
  deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// set up GET one, PUT, and DELETE at api/users/:id
router
  .route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// set up POST and DELETE friend at api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;

