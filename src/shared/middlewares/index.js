const eventLoggingMiddleware = require("shared/middlewares/event_logging.middlewares");
const responseMiddleware = require("shared/middlewares/response.middlewares");
const authMiddleware = require("shared/middlewares/auth.middlewares");

const sharedMiddlewares = {
    eventLoggingMiddleware,
    responseMiddleware,
    authMiddleware
}

module.exports = sharedMiddlewares;
