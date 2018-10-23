"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var log4js_1 = require("log4js");
var bookRouter = require("./router/bookRouter");
var cacheRouter = require("./router/cacheRouter");
var cookieParser = require("cookie-parser");
var Demo = /** @class */ (function () {
    function Demo() {
    }
    Demo.start = function () {
        var app = express();
        var logger = log4js_1.getLogger("./logs/service.log");
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, "public")));
        app.use("/", bookRouter);
        app.use("/", cacheRouter);
        app.use(log4js_1.connectLogger(logger, { level: "auto" }));
        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "./public/page/index.html"));
        });
        logger.info("This is my first logger");
        var server = app.listen(process.env.PORT || 3000, function () {
            console.log("[" + new Date().toUTCString() + "] Demo is listening port:%s", server.address().port);
        });
    };
    return Demo;
}());
exports.Demo = Demo;
Demo.start();
