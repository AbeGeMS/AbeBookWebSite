"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var utility_1 = require("../lib/utility");
var cookieParser = require("cookie-parser");
var router = express.Router();
router.get('/latestChapter', function (req, res) {
    res.json(1);
});
router.get('/tableOfContent', function (req, res) {
    var result = [
        { Href: "fakeHref", Title: "Fake" },
        { Href: "MockHref", Title: "Mock" }
    ];
    res.json(result);
});
router.get("/books", function (req, res) {
    var result = [{
            Name: "book001",
            BookId: "001"
        }, {
            Name: "book002",
            BookId: "002",
        }];
    res.json(result);
});
router.delete("/bookMark/:id", function () {
});
router.put("/bookMark", function (req, res) {
    res.status(200);
    res.send();
});
router.use(bodyParser());
router.unsubscribe(cookieParser());
router.post('/book', function (req, res) {
    var result = { Index: 1,
        Title: "charpter001",
        Content: ["this is first", "This is second"] };
    res.json(result);
});
router.post('/tableOfContent', function (req, res) {
    var result = [
        { Href: "fakeHref", Title: "Fake" },
        { Href: "MockHref", Title: "Mock" }
    ];
    res.json(result);
});
router.put("/BookDomain/:id", function (req, res) {
    var bookid = utility_1.decodingStr(req.params["id"]);
    if (bookid) {
        res.cookie("BaseDomain", bookid, {
            maxAge: 86400 * 1000,
        });
        res.send(bookid);
    }
    else {
        res.status(500);
    }
});
router.put("/backup", function (req, res) {
    var cacheService = {
        getBookList: function () { return new Promise(function (resolve, reject) {
            var books = [{ BookId: "1", Name: "001" }, { BookId: "2", Name: "002" }];
            resolve(books);
        }); },
        getLatestCharpter: function (v) { return new Promise(function (resolve, reject) {
            resolve(v + 1);
        }); },
    };
    cacheService.getBookList().then(function (book) {
        var pp = book.map(function (v) { return cacheService.getLatestCharpter(v.BookId).then(function (id) {
            console.log("{\"bookId\": \"" + v.BookId + "\",\"charpterIndex\": " + id + "}");
        }); });
        Promise.all(pp).then(function () { res.status(200); res.send(); });
    });
});
module.exports = router;
