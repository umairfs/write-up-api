const uuid = require("uuid");

const uuidServices = {};

uuidServices.uuidV4 = uuid.v4;

uuidServices.validate = uuid.validate;

module.exports = uuidServices;
