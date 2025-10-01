const sharedValidators = require("../validators");

const mysqlHelperServices = {};

mysqlHelperServices.parseInsertValues = (values) => {
    const parsedValues = {};
    Object.keys(values).forEach((key) => {
        if (sharedValidators.isUndefined(values[key])) {
            return;
        }
        if (sharedValidators.isObject(values[key])) {
            values[key] = JSON.stringify(values[key]).replace("'","");
        }
        if (sharedValidators.isArray(values[key])) {
            values[key] = JSON.stringify(values[key]).replace("'","");;
        }
        parsedValues[key] = values[key];
    });
    return parsedValues;
};

mysqlHelperServices.parseInsertManyValues = (values) => {
    const parsedValues = values.map((value) =>
        parsedValues.push(mysqlHelperServices.parseInsertValues(value))
    );
    return parsedValues;
};

mysqlHelperServices.parseUpdateValues = (values) => {
    return mysqlHelperServices.parseInsertValues(values);
};

mysqlHelperServices.generateRefID = (salt = "", type = "") => {
    return `${parseInt(new Date().getTime() / 100)}${type}${salt.slice(7)}`;
};

module.exports = mysqlHelperServices;
