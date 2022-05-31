//@Assertion
//@Assure that there are valid data
//@access Public

//*Assert guide, (assertionFactor,DataToBeReturned,errorMessage,res object)

function assert(assertionFactor, dataToBeReturned, errorMessage, res) {
  if (
    assertionFactor !== undefined &&
    assertionFactor !== null &&
    assertionFactor !== "" &&
    Array.isArray(assertionFactor) &&
    assertionFactor.length > 0 &&
    assertionFactor !== {}
  ) {
    return res.status(200).json(dataToBeReturned);
  } else {
    res.status(400).json({ message: errorMessage });
    throw new Error(errorMessage);
  }
}

module.exports = assert;
