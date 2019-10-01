"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require("https");
var Promise = require("bluebird");
var HttpAgent = /** @class */ (function () {
    function HttpAgent() {
    }
    HttpAgent.prototype.get = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                https.get(url, function (res) {
                    res.setEncoding("utf-8");
                    _this.getContent(res).then(function (html) { return resolve(html); }, function (error) { return reject(error); });
                }).on("error", function (err) {
                    reject(err);
                });
            }
            catch (ex) {
                reject("HttpAgent.get throw exception " + ex);
            }
        });
    };
    HttpAgent.prototype.post = function (url, body) {
        return new Promise(function (resolve, reject) {
        });
    };
    HttpAgent.prototype.getContent = function (response) {
        var html = "";
        return new Promise(function (resolve, reject) {
            response.on("data", function (chunk) { return html += chunk; });
            response.on("end", function () { return resolve(html); });
            response.on("err", function (err) { return reject(err); });
        });
    };
    return HttpAgent;
}());
exports.HttpAgent = HttpAgent;
