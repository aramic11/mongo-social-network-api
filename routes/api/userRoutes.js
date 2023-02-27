const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// Route to get all users and create a new user
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// Route to get, update, or delete a specific user by ID
router.route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

// Route to add or remove a friend from a user's friend list by user ID and friend ID
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
