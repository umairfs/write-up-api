const express = require("express");
const sampleModuleRoutes = express.Router();

const sampleModuleControllers = require("app_modules/sample_module/controllers");

// route_name: sample
// route_path: /sample/sample
// route_description:
//      route used to test sample module
sampleModuleRoutes.post("/sample", sampleModuleControllers.test);

module.exports = sampleModuleRoutes;
