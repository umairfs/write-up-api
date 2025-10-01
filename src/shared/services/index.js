const authServices = require("shared/services/auth.services");
const loggerServices = require("shared/services/logger.services");
const mysqlServices = require("shared/services/mysql.services");
const mysqlHelperServices = require("shared/services/mysqlHelpers.services");
const responseServices = require("shared/services/response.services");
const uuidServices = require("shared/services/uuid.services");
const error = require("shared/services/error.services");
const awsServices = require("shared/services/aws.services");
const fileServices = require("shared/services/file.services");

const sharedServices = {
    authServices,
    loggerServices,
    mysqlServices,
    mysqlHelperServices,
    responseServices,
    uuidServices,
    error,
    awsServices,
    fileServices,
};

module.exports = sharedServices;
