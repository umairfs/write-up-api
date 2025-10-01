const winston = require("winston");

const loggerServices = {};

// below class is created to push logs to an API end point
class LoggerAPITransport extends winston.Transport {
    constructor(options) {
        super(options);
        this.apiEndpoint = options.apiEndpoint;
    }

    log(info, callback) {
        fetch(this.apiEndpoint, {
            body: JSON.stringify(info),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => callback(null, true))
            .catch((err) => callback(err));
    }
}

// service_name: warn
// service_description:
//      logger service to log messages in warn log file
loggerServices.warn = winston.createLogger({
    level: "warn",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf((params) => {
            const { timestamp, level, message } = params;
            return `${timestamp} ${level}: \n${JSON.stringify(message)}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "log/warn.log",
            level: "warn",
        }),
    ],
});

// service_name: success
// service_description:
//      logger service to log messages in success log file
loggerServices.success = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            const { timestamp, level, message } = info;
            return `${timestamp} ${level}: \n${JSON.stringify(message)}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "log/success.log",
            level: "info",
        }),
    ],
});

// service_name: error
// service_description:
//      logger service to log messages in error log file
loggerServices.error = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf((error) => {
            const { timestamp, level, message } = error;
            return `${timestamp} ${level}: \n${JSON.stringify(message)}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "log/error.log",
            level: "error",
        }),
    ],
});

module.exports = loggerServices;
