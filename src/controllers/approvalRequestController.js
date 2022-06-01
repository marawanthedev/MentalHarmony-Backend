const asyncHandler = require("express-async-handler");
const assert = require("../helpers/assertion");
const ApprovalRequestService = require("../services/approvalRequestService");
const approvalRequestServiceObj = new ApprovalRequestService();

//@desc add approval submission
//@route is not there, only called by user controller
//@access Private
const addApprovalRequest = async (requester) => {
  const approvalRequest = await approvalRequestServiceObj.addApprovalRequest(
    requester
  );
  if (approvalRequest) return approvalRequest;
  else return null;
};

const getApprovalRequests = asyncHandler(async (req, res) => {
  const { isApproved } = req.query;
  const user = req.user;

  if (user.type === "admin") {
    if (isApproved) {
      const approvalRequests =
        await approvalRequestServiceObj.getApprovalRequests(isApproved);
      assert(
        approvalRequests,
        approvalRequests,
        "No approval requests were found",
        res
      );
    } else
      res.status(404).json({ message: "Approval request retrieval failed" });
  } else res.status(404).json({ message: "Permission denied" });
});

const acceptApprovalRequest = asyncHandler(async (req, res) => {
  const { id } = req.query;

  //updates user approval status to true
  const { acceptedRequest, updatedUser } =
    await approvalRequestServiceObj.acceptApprovalRequest(id);

  if (updatedUser && acceptedRequest)
    res.status(200).json(acceptApprovalRequest);
  else if (!updatedUser && !acceptApprovalRequest)
    res.status(404).json({ message: "User approval Status was not updated" });
  else if (!acceptApprovalRequest && updatedUser)
    res.status(404).json({ message: "Request Status was not updated" });
});

module.exports = {
  addApprovalRequest,
  getApprovalRequests,
  acceptApprovalRequest,
};
