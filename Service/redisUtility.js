"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var redis_1 = require("redis");
var redisPort = 6380;
var redisAddress = "myBookmark.redis.cache.windows.net";
var redisPassword = "u93X6QKxkPtUae0XZ6eWE2HwFrl0xjP4PADkgOMei9M=";
var expiryTimeSpan = 1296000;
var Redis_Client;
var RedisAgent = /** @class */ (function () {
    function RedisAgent() {
    }
    RedisAgent.prototype.SCAN = function (start, count) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.Client.scan(start.toString(), 'COUNT', count.toString(), function (err, reply) {
                    if (!!err) {
                        reject("scan resdis failed");
                        console.log("WebCrawler.getBookList: scan redis Error is " + err);
                        return;
                    }
                    if (reply.length != 2) {
                        reject("invalid book list in redis " + JSON.stringify(reply));
                        return;
                    }
                    ;
                    resolve(reply[1]);
                });
            }
            catch (ex) {
                console.log("RedisAgent.SCAN unexpected exception by " + ex);
                return reject("RedisAgent.SCAN:Failed by " + ex);
            }
        });
    };
    RedisAgent.prototype.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.Client.get(key, function (err, value) {
                    if (!!err) {
                        reject(err);
                        return;
                    }
                    resolve(value);
                });
            }
            catch (ex) {
                console.log("RedisAgent.get unexpected exception by " + ex);
                reject("RedisAgent.get:Failed by " + ex);
            }
        });
    };
    RedisAgent.prototype.set = function (key, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.Client.set(key, value, function (err, reply) {
                    if (!!err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            }
            catch (ex) {
                console.log("RedisAgent.set unexpected exception by " + ex);
                reject("RedisAgent.set: Failed by " + ex);
            }
        });
    };
    RedisAgent.prototype.expiry = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.Client.expire(key, expiryTimeSpan, function (err, reply) {
                    if (!!err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            }
            catch (ex) {
                console.log("RedisAgent.expiry unexpected exception by " + ex);
                reject("RedisAgent.expiry: Faied by " + ex);
            }
        });
    };
    Object.defineProperty(RedisAgent.prototype, "Client", {
        get: function () {
            try {
                if (Redis_Client) {
                    return Redis_Client;
                }
                var redisClient = redis_1.createClient(redisPort, redisAddress, {
                    auth_pass: redisPassword,
                    tls: {
                        servername: redisAddress,
                    },
                });
                redisClient.on("error", function (err) { return console.log("RedisAgent.createRedisClient unexpected exception by " + err); });
                Redis_Client = redisClient;
                console.error("new redis client");
                return redisClient;
            }
            catch (ex) {
                console.log("RedisAgent.createRedisClient unexpected exception by " + ex);
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    return RedisAgent;
}());
exports.RedisAgent = RedisAgent;
