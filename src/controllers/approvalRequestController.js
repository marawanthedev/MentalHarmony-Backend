const asyncHandler = require("express-async-handler");
const ApprovalRequest = require("../models/approvalRequest");
const assert = require("../helpers/assertion");

//@desc add approval submission
//@route is not there, only called by user controller
//@access Private
const addApprovalRequest = async (requester) => {
  const approvalRequest = await ApprovalRequest.create({
    requester,
    isApproved: false,
  });
  return approvalRequest;
};

const getApprovalRequests = asyncHandler(async (req, res) => {
  const { isApproved } = req.query;
  const approvalRequests = await ApprovalRequest.find({ isApproved }).populate(
    "requester",
    {
      name: 1,
      speciality: 1,
      phone_number: 1,
      location: 1,
    }
  );

  assert(
    approvalRequests,
    approvalRequests,
    "No stored feelings were found",
    res
  );
});

const acceptApprovalRequest = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const acceptedRequest = await ApprovalRequest.findByIdAndUpdate(id, {
    isApproved: true,
  });
  const { updateUserApprovalStatus } = require("./userController");

  
  //updates user approval status to true
  const updatedUser = await updateUserApprovalStatus(
    acceptedRequest.requester.toString()
  );

  assert(
    acceptedRequest,
    acceptedRequest,
    "No stored feelings were found",
    res
  );
});

module.exports = {
  addApprovalRequest,
  getApprovalRequests,
  acceptApprovalRequest,
};
