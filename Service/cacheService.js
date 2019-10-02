"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var bluebird_1 = require("bluebird");
var CacheService = /** @class */ (function () {
    function CacheService(bookService, redisClient) {
        this._redisAgent = redisClient;
        this._bookService = bookService;
    }
    CacheService.prototype.getBookList = function () {
        var _this = this;
        try {
            return this._redisAgent.SCAN(0, 20).then(function (values) {
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
    CacheService.prototype.setBookMark = function (bookId, charpter) {
        var charpterNumber = parseInt(charpter, 10);
        if (charpterNumber >= 0) {
            return this._redisAgent.set(bookId, charpterNumber.toString());
        }
        else {
            return Promise.reject("invalid parameter. the @charpter:" + charpter + " must be a number");
        }
    };
    CacheService.prototype.extendExpiry = function (bookId) {
        try {
            return this._redisAgent.expiry(bookId)
                .then(function () { return true; }, function (err) { return bluebird_1.reject("CacheService.extendExpiry: Failed to extend expiry time by " + err); });
        }
        catch (ex) {
            return bluebird_1.reject("CacheService.extendExpiry: Failed by " + ex);
        }
    };
    return CacheService;
}());
exports.CacheService = CacheService;
