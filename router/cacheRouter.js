"use strict";
var express = require("express");
var cacheService_1 = require("../Service/cacheService");
var bookService_1 = require("../Service/bookService");
var httpUtility_1 = require("../Service/httpUtility");
var redisUtility_1 = require("../Service/redisUtility");
var utility_1 = require("../lib/utility");
var routerName = "bookRouter";
var router = express.Router();
router.get('/latestChapter', function (req, res) {
    var baseUrl = utility_1.decodingStr(req.cookies && req.cookies.BaseDomain);
    baseUrl = "https://" + baseUrl.trim() + ".com/";
    var bookId = req.query.id;
    if (!baseUrl || !bookId) {
        res.json("cacheRouter.latestChapter: invailid parameter " + baseUrl + ", " + bookId);
        return;
    }
    var cacheService = new cacheService_1.CacheService(new bookService_1.BookService(baseUrl, new httpUtility_1.HttpAgent()), new redisUtility_1.RedisAgent());
    cacheService.getLatestCharpter(bookId).then(function (chapter) { return res.json({ latestChapter: chapter }); }, function (err) { return res.json(err); });
});
router.get('/tableOfContent', function (req, res) {
    var result;
    res.json(result);
});
router.get("/books", function (req, res) {
    var baseurl = utility_1.decodingStr(req.cookies && req.cookies.BaseDomain);
    baseurl = "https://" + baseurl.trim() + ".com/";
    if (baseurl) {
        var cacheService = new cacheService_1.CacheService(new bookService_1.BookService(baseurl, new httpUtility_1.HttpAgent()), new redisUtility_1.RedisAgent());
        cacheService.getBookList().then(function (books) { return res.json(books); }, function (error) { return res.json(error); });
    }
    else {
        res.json("Couldn't found book Domain in cookie.");
    }
});
router.delete("/bookMark/:id", function (req, res) {
    var bookId = utility_1.decodingStr(req.params.id);
    console.log("Delete book " + bookId);
});
module.exports = router;
