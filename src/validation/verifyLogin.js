const bcrypt = require("bcryptjs/dist/bcrypt");

function verifyLoginPermission(user) {
  if (user.type === "student") {
    return true;
  }
  if (user.type === "serviceprovider" && user.approval_status === true) {
    return true;
  }
  if (user.type === "admin") {
    return true;
  }
  return false;
}
async function verifyLoginCredentials(user, password) {
  //   bcrypt compare compares the unhashed password which is sent throught the params with the stored hasehed password of the previously signed up user to maintain security stuff
  if (user && (await bcrypt.compare(password, user.password))) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  verifyLoginCredentials,
  verifyLoginPermission,
};
