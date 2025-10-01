// read .env and pass values to process.env
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const sharedConstants = require("shared/constants");
const sharedMiddlewares = require("shared/middlewares");
const appModules = require("../src/modules");

const app = express();

// enable req and res event logging middleware
app.use(sharedMiddlewares.eventLoggingMiddleware);

// enable helmet
app.use(helmet());

// enable CORS implementation
app.use(
    cors({
        origin: "http://localhost:3001",
        methods: "GET,POST",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

// enable response compression
app.use(
    compression({
        filter: function (req, res) {
            if (req.headers["x-no-compression"]) {
                // don't compress responses with this request header
                return false;
            }

            // fallback to standard filter function
            return compression.filter(req, res);
        },
    })
);

// enable middleware for parsing JSON request bodies
app.use(express.json());

// enable middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// load all app modules
app.use(appModules);

// enable response format handling middleware
app.use(sharedMiddlewares.responseMiddleware);

// define root route
app.get("/", (req, res) => {
    res.send("Centrum fintech api");
});

// start application server
app.listen(sharedConstants.appConfig.app.port, sharedConstants.appConfig.app.host, (err) => {
    if (err) {
        logger.error({
            error: err,
            message: err.message,
        });
        console.log(`Error ${err.message}`);
    }

    console.log(`Server running on http://${sharedConstants.appConfig.app.host}:${sharedConstants.appConfig.app.port}`);
});
