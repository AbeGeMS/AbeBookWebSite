"use strict";
var express = require("express");
var bookService_1 = require("../Service/bookService");
var httpUtility_1 = require("../Service/httpUtility");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var utility_1 = require("../lib/utility");
var routerName = "bookRouter";
var router = express.Router();
router.use(bodyParser());
router.unsubscribe(cookieParser());
router.post('/book', function (req, res) {
    var bookDomain = req.cookies && req.cookies.BaseDomain;
    var bookId = req.body.bookId;
    var index = req.body.index;
    var chapterId = req.body.chapterId;
    if (!bookDomain || !bookId || !chapterId) {
        res.status(500).json({
            error: "invalid parameter Domain:" + bookDomain + " book:" + bookId + " chapter:" + chapterId
        });
    }
    bookDomain = getBookUrl(bookDomain);
    var bookService = new bookService_1.BookService(bookDomain, new httpUtility_1.HttpAgent());
    bookService.getContent(bookId, chapterId, index)
        .then(function (content) { return res.json(content); });
    console.info("POST " + routerName + ".book:\n        Search book " + bookId + " chapter " + chapterId);
});
router.post('/tableOfContent', function (req, res) {
    var bookId = req.body.id;
    var bookDomain = req.cookies && req.cookies.BaseDomain;
    if (!bookId || !bookDomain) {
        res.status(500).json({
            error: "invalid parameter domain:" + bookDomain + " bookId:" + bookId,
        });
    }
    bookDomain = getBookUrl(bookDomain);
    var bookService = new bookService_1.BookService(bookDomain, new httpUtility_1.HttpAgent());
    bookService.getTableOfContent(bookId)
        .then(function (tableOfContent) { return res.json(tableOfContent); });
    console.info("POST " + routerName + ".tableOfContent:\n    get list of book " + bookId + ".");
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
router.get("/source/:id", function (req, res) {
    console.error(req.params["id"]);
    var paramId = utility_1.decodingStr(req.params["id"]);
    paramId = paramId.replace(/-/g, "/");
    var url = "";
    if (!paramId) {
        url = getBookUrl(req.cookies && req.cookies.BaseDomain);
    }
    else {
        url = "https://" + paramId;
        console.error(url);
    }
    var bookService = new bookService_1.BookService(url, new httpUtility_1.HttpAgent());
    bookService.getSource(url).then(function (source) { return res.send(source); }, function (err) {
        res.status(500);
        res.send();
    });
});
function getBookUrl(bookDomain) {
    return "https://www." + bookDomain + ".info";
}
module.exports = router;
