const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc registerUser
//@route post/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const validTypes = ["student", "serviceprovider", "admin"];
  let validType = false;
  const { name, email, password, type, faculty_name, specialKey } = req.body;

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
    faculty_name,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.email,
      email: user.email,
      type: user.type,
      special_key: user.specialKey ? user.specialKey : null,
      faculty_name: user.faculty_name ? user.faculty_name : null,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid new Data");
  }
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
      _id: user.id,
      name: user.email,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
  res.json({ message: "login user" });
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
};
