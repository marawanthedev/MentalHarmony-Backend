const ApprovalRequest = require("../models/approvalRequest");

class ApprovalRequestService {
  addApprovalRequest = async (requester) => {
    const approvalRequest = await ApprovalRequest.create({
      requester,
      isApproved: false,
    });
    return approvalRequest;
  };

  getApprovalRequests = async (isApproved) => {
    const approvalRequests = await ApprovalRequest.find({
      isApproved,
    }).populate("requester", {
      name: 1,
      speciality: 1,
      phone_number: 1,
      location: 1,
    });

    return approvalRequests;
  };
  acceptApprovalRequest = async (id) => {
    const acceptedRequest = await ApprovalRequest.findByIdAndUpdate(id, {
      isApproved: true,
    });
    const {
      updateUserApprovalStatus,
    } = require("../controllers/userController");

    //updates user approval status to true
    const updatedUser = await updateUserApprovalStatus(
      acceptedRequest.requester.toString()
    );

    return { acceptedRequest, updatedUser };
  };
}

module.exports = ApprovalRequestService;
