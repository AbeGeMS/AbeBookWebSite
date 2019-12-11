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
    baseUrl = getBookUrl(baseUrl.trim());
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
    baseurl = getBookUrl(baseurl.trim());
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
router.put("/bookMark", function (req, res) {
    var bookId = req.body.id;
    var chapter = req.body.chapter;
    var baseurl = utility_1.decodingStr(req.cookies && req.cookies.BaseDomain);
    baseurl = getBookUrl(baseurl.trim());
    if (baseurl) {
        var cacheService_2 = new cacheService_1.CacheService(new bookService_1.BookService(baseurl, new httpUtility_1.HttpAgent()), new redisUtility_1.RedisAgent());
        cacheService_2.setBookMark(bookId, chapter)
            .then(function () { return cacheService_2.extendExpiry(bookId); });
    }
    else {
        res.json("Set book " + bookId + " chapter " + chapter + " Failed.");
    }
});
router.put("/backup", function (req, res) {
    var cacheService = new cacheService_1.CacheService(new bookService_1.BookService("", new httpUtility_1.HttpAgent()), new redisUtility_1.RedisAgent());
    cacheService.getBookList().then(function (book) {
        console.log("[" + new Date().toLocaleString() + "]Back up lib");
        Promise.all(book.map(function (v) { return cacheService.getLatestCharpter(v.BookId).then(function (id) {
            console.log("{\"bookId\": \"" + v.BookId + "\",\"charpterIndex\": " + id + "}");
        }); })).then(function () { res.status(200); res.send(); }, function (err) { return res.json(err); });
    });
});
function getBookUrl(bookDomain) {
    return "https://www." + bookDomain + ".info";
}
module.exports = router;
