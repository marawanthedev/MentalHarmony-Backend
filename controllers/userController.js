const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const assert = require("../services/assertion");

//@desc registerUser
//@route post/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const validTypes = ["student", "serviceprovider", "admin"];
  let validType = false;
  const {
    name,
    email,
    password,
    type,
    faculty_name,
    specialKey,
    description,
    phone_number,
    location,
  } = req.body;

  if (!name || !email || !password || !type) {
    res.status(400);
    throw new Error("please add all fields");
  }

  validTypes.forEach((_type) => {
    if (type === _type) {
      validType = true;
    }
  });

  if (!validType) {
    res.status(400);
    throw new Error("please submit a valid type");
  }

  // check if user exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    // res.status(400);
    res.status(400);
    throw new Error("User already exists");
  }
  // hashing the password
  //   salt needed for hasing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    specialKey,
    type,
    faculty_name: faculty_name ? faculty_name : null,
    description: description ? description : null,
    phone_number: phone_number ? phone_number : null,
    location: location ? location : null,
  });

  //*Assert guide, (assertionFactor,DataToBeReturned,errorMessage,res object)
  assert(
    user,
    {
      name: user.email,
      type: user.type,
      token: generateToken(user._id),
    },
    "invalid new Data",
    res
  );

  res.json({ message: "Register user" });
});

//@desc LoginUser
//@route post/api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  //   bcrypt compare compares the unhashed password which is sent throught the params with the stored hasehed password of the previously signed up user to maintain security stuff

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      name: user.email,
      type: user.type,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
  res.json({ message: "login user" });
});

//@desc get User by Id
//@route post/api/users/me
//@access Private

const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  const objectToBeReturned = {
    location: user.location ? user.location : null,
    name: user.name,
    phone_number: user.phone_number ? user.phone_number : null,
    type: user.type,
    ...(user.type === "student" && {
      faculty_name: user.faculty_name ? user.faculty_name : null,
    }),
    ...(user.type === "serviceprovider" && {
      description: user.description ? user.description : null,
    }),
    ...(user.type === "serviceprovider" && {
      speciality: user.speciality ? user.speciality : null,
    }),
  };

  //*Assert guide, (assertionFactor,DataToBeReturned,errorMessage,res object)
  assert(user, objectToBeReturned, "Could not get user by id", res);
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id, type } = req.user;
  let user;
  if (type === "student") {
    user = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true });
  }
  if (type === "serviceprovider") {
    user = await User.findByIdAndUpdate(_id, { ...req.body }, { new: true });
  }

  //*Assert guide, (assertionFactor,DataToBeReturned,errorMessage,res object)
  assert(user, user, "User update was not successful", res);
});

//@desc get User by category
//@route Get/api/users/me
//@access Private

const getUserByType = asyncHandler(async (req, res) => {
  const type = req.query.type;
  // we need to await for the result
  const users = await User.find({ type: type });

  const filteredUsers = [];

  users.forEach((user, index) => {
    if (type === "serviceprovider") {
      filteredUsers[index] = {
        _id: user._id,
        name: user.name,
        speciality: user.speciality,
        description: user.description ? user.description : null,
        phone_number: user.phone_number,
        location: user.location,
      };
    }
    
    if (type === "student") {
      filteredUsers[index] = {
        name: user.name,
        faculty_name: user.faculty_name,
        phone_number: user.phone_number,
        location: user.location,
      };
    }
  });
  //*Assert guide, (assertionFactor,DataToBeReturned,errorMessage,res object)
  assert(filteredUsers, filteredUsers, "Users were not found", res);

  // res.status(200).json(filteredUsers);
});

//@desc get User Data
//@route post/api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "getting me" });
});

// generate new token

const generateToken = (id) => {
  // signing a token with the users singed or registered id and with the process secret and then setting expiry date
  //   tokens will inculde the user id which might be used in making rest calls
  // while keeping the users data secure and un visible
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUserByType,
  getUser,
  updateUser,
};
