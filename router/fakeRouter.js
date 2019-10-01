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
router.put("/bookMark", function () {
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
module.exports = router;
