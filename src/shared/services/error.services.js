const errorServices = {};

errorServices.throw = (code) => {
    throw new Error(JSON.stringify(code));
}

module.exports = errorServices;