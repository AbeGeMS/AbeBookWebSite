"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var log4js_1 = require("log4js");
var bluebird_1 = require("bluebird");
var CacheService = /** @class */ (function () {
    function CacheService(bookService, redisClient) {
        this._redisAgent = redisClient;
        this._bookService = bookService;
        this._log = log4js_1.getLogger();
    }
    CacheService.prototype.getBookList = function () {
        var _this = this;
        try {
            this._log.info("cacheService.getBookList: start to get book");
            return this._redisAgent.SCAN(0, 20).then(function (values) {
                _this._log.info("cacheService.getBookList: get books count " + values.length);
                var booksPromise = values.map(function (v) { return _this._bookService.getTitle(v).then(function (title) {
                    return { BookId: v, Name: title };
                }, function (err) {
                    return { BookId: v, Name: err };
                }); });
                return Promise.filter(booksPromise, function (item) { return item.Name.trim() != null; });
            });
        }
        catch (error) {
            return bluebird_1.reject("CacheService.getBookList: Failed by " + error);
        }
    };
    CacheService.prototype.getLatestCharpter = function (bookId) {
        try {
            return this._redisAgent.get(bookId)
                .then(function (charpter) {
                return parseInt(charpter);
            }, function (err) { return bluebird_1.reject("CacheService.getLatestCharpter: Faied by " + err); });
        }
        catch (ex) {
            return bluebird_1.reject("CacheService.getLatestCharpter: Failed by " + ex);
        }
    };
    return CacheService;
}());
exports.CacheService = CacheService;
