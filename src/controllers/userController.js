const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const assert = require("../helpers/assertion");
const UserService = require("../services/userService");
const { generateToken } = require("../helpers/generateToken");
//serviceObject instantiation
const userServiceObject = new UserService();

//@desc updateUserApprovalStatus accepts user signup request
//@route  none
//@access Private to the approval request controller

const updateUserApprovalStatus = async (user_id) => {
  const user = await User.findByIdAndUpdate(user_id, { approval_status: true });
  return user;
};

//@desc registerUser
//@route post/api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const validTypes = ["student", "serviceprovider", "admin"];
  let validType = false;

  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.type
  ) {
    res.status(404);
    throw new Error("please add all fields");
  }

  validTypes.forEach((_type) => {
    if (req.body.type === _type) {
      validType = true;
    }
  });

  if (!validType) {
    res.status(404);
    throw new Error("please submit a valid type");
  }

  // check if user exists
  const { user, message } = await userServiceObject.registerUser(req.body);
  console.log('x')
 console.log(user)
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error(message);
  }
});

//@desc LoginUser
//@route post/api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, message } = await userServiceObject.verifyUserLogin(
    email,
    password
  );

  if (user) {
    res.status(201).json({
      name: user.email,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(message);
  }
});

//@desc get User by Id
//@route post/api/users/me
//@access Private

const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user ? req.user : req.body;
  if (_id) {
    const { user, objectToBeReturned } = await userServiceObject.getUser(
      _id.toString()
    );
    req.user = null;

    // if (user) {
    //   res.status(200).json(objectToBeReturned);
    // }
    //should be fixed

    assert(user, objectToBeReturned, "Could not get user by id", res);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await userServiceObject.updateUser(_id, { ...req.body });
  assert(user, user, "User update was not successful", res);
});

//@desc get User by category
//@route Get/api/users/me
//@access Private

const getUserByType = asyncHandler(async (req, res) => {
  const type = req.query.type;
  // we need to await for the result
  const users = await userServiceObject.getUserByType(type);
  assert(users, users, "Users were not found", res);
});

//@desc delete User by category
//@route Delete/api/user?id=id
//@access Private

const deleteUser = asyncHandler(async (req, res) => {
  //**needs to be only accessible to admins
  const { type } = req.user;
  const { id } = req.query;

  if (type === "admin") {
    const user = await userServiceObject.deleteUser(id);
    assert(user, user, "User deletion was not successful", res);
  } else res.status(404).json("Deleting user is only allowed by admins!");
});

// generate new token

module.exports = {
  updateUserApprovalStatus,
  registerUser,
  loginUser,
  getUserByType,
  getUser,
  updateUser,
  deleteUser,
};
