//@Assertion
//@Assure that there are valid data
//@access Public

function assert(assertionFactor, dataToBeReturned, errorMessage, res) {
  if (
    assertionFactor !== undefined &&
    assertionFactor !== null &&
    assertionFactor !== "" &&
    assertionFactor !== [] &&
    assertionFactor !== {}
  ) {
    return res.status(200).json(dataToBeReturned);
  } else {
    res.status(400);
    throw new Error(errorMessage);
  }
}

module.exports = assert;
