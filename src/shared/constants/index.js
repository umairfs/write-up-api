const config = require("shared/constants/config.constants");
const dbTableNames = require("shared/constants/db_table_names.constants");
const masterConstants = require("./master.constants");

const sharedConstants = {
    appConfig: config,
    dbTableNames,
    masterConstants,
};

module.exports = sharedConstants;
