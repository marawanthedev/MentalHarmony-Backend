// class UserService {
//   constructor() {}
//   verifyLoginPermission(user) {
//     if (user.type === "student") {
//       return true;
//     }
//     if (user.type === "serviceprovider" && user.approval_status === true) {
//       return true;
//     }
//     return false;
//   }
//   async verifyLoginCredentials(user) {
//     //   bcrypt compare compares the unhashed password which is sent throught the params with the stored hasehed password of the previously signed up user to maintain security stuff
//     // console.log(user);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }
function verifyLoginPermission(user) {
  if (user.type === "student") {
    return true;
  }
  if (user.type === "serviceprovider" && user.approval_status === true) {
    return true;
  }
  return false;
}
async function verifyLoginCredentials(user) {
  //   bcrypt compare compares the unhashed password which is sent throught the params with the stored hasehed password of the previously signed up user to maintain security stuff
  // console.log(user);
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
