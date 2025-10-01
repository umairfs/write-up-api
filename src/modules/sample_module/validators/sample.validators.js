const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const sampleModuleConstants = require("../constants");

module.exports = ({ sampleId }) => {
  if (sharedValidators.isRequired(sampleId)) {
    sharedServices.error.throw(
      sampleModuleConstants.sample.errorMessages.SAME0001
    );
  }

  return {
    sampleId,
  };
};
