const {
  verifyLoginPermission,
  verifyLoginCredentials,
} = require("../validation/verifyLogin");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const {
  addApprovalRequest,
} = require("../controllers/approvalRequestController");
const { generateToken } = require("../helpers/generateToken");

class UserService {
  registerUser = async ({
    email,
    password,
    type,
    faculty_name,
    phone_number,
    location,
    specialKey,
    description,
    name,
    speciality,
  }) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return { message: "User already exists" };
    }
    // hashing the password
    //   salt needed for hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let user;

    if (type === "student") {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        type,
        faculty_name: faculty_name ? faculty_name : null,
        phone_number: phone_number ? phone_number : null,
        location: location ? location : null,
      });
      return {
        user: {
          name: user.email,
          type: user.type,
          token: generateToken(user._id),
        },
      };
    }
    if (type === "serviceprovider") {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        specialKey,
        type,
        speciality: speciality ? speciality : null,
        description: description ? description : null,
        phone_number: phone_number ? phone_number : null,
        location: location ? location : null,
        approval_status: false,
      });

      if (user) {
        const approvalRequest = await addApprovalRequest(user._id);

        return {
          user: {
            name: user.email,
            type: user.type,
            token: generateToken(user._id),
          },
        };
      } else {
        return { message: "Signup has failed" };
      }
    }
    if (type === "admin") {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        type,
      });
      return {
        user: {
          name: user.email,
          type: user.type,
          token: generateToken(user._id),
        },
      };
    }
  };
  verifyUserLogin = async (email, password) => {
    //check for user email
    const user = await User.findOne({ email });
    if (verifyLoginPermission(user)) {
      if (verifyLoginCredentials(user, password)) {
        return { user, message: "" };
      } else {
        return { user: null, message: "invalid credentials" };
      }
    } else {
      return {
        user: null,
        message: "Login is un-authorized or invalid credentials were entered",
      };
    }
  };

  deleteUser = async (id) => {
    const user = await User.findByIdAndRemove(id);
    return user;
  };
  updateUser = async (id, data) => {
    const user = await User.findByIdAndUpdate(id, { ...data }, { new: true });
    return user;
  };

  getUserByType = async (type) => {
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
    return filteredUsers;
  };
  getUser = async (id) => {
    const user = await User.findById(id);
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

    return {
      user,
      objectToBeReturned,
    };
  };
}

module.exports = UserService;
