"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var redis_1 = require("redis");
var redisPort = 6380;
var redisAddress = "myBookmark.redis.cache.windows.net";
var redisPassword = "";
var expiryTimeSpan = 1296000;
var RedisAgent = /** @class */ (function () {
    function RedisAgent() {
        this._client = this.createRedisClient();
    }
    RedisAgent.prototype.SCAN = function (start, count) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._client.scan(start.toString(), 'COUNT', count.toString(), function (err, reply) {
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
                _this._client.get(key, function (err, value) {
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
                _this._client.set(key, value, function (err, reply) {
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
                _this._client.expire(key, expiryTimeSpan, function (err, reply) {
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
    RedisAgent.prototype.createRedisClient = function () {
        try {
            if (this._client) {
                return this._client;
            }
            var redisClient = redis_1.createClient(redisPort, redisAddress, {
                auth_pass: redisPassword,
                tls: {
                    servername: redisAddress,
                },
            });
            redisClient.on("error", function (err) { return console.log("RedisAgent.createRedisClient unexpected exception by " + err); });
            return redisClient;
        }
        catch (ex) {
            console.log("RedisAgent.createRedisClient unexpected exception by " + ex);
            return null;
        }
    };
    return RedisAgent;
}());
exports.RedisAgent = RedisAgent;
