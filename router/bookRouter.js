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
    bookDomain = "https://" + bookDomain + ".com/";
    var bookService = new bookService_1.BookService(bookDomain, new httpUtility_1.HttpAgent());
    bookService.getContent(bookId, chapterId, index)
        .then(function (content) { return res.json(content); });
    console.info(routerName + ".book:\n        Search book " + bookId + " chapter " + chapterId);
});
router.post('/tableOfContent', function (req, res) {
    var bookId = req.body.id;
    var bookDomain = req.cookies && req.cookies.BaseDomain;
    if (!bookId || !bookDomain) {
        res.status(500).json({
            error: "invalid parameter domain:" + bookDomain + " bookId:" + bookId,
        });
    }
    bookDomain = "https://" + bookDomain + ".com/";
    var bookService = new bookService_1.BookService(bookDomain, new httpUtility_1.HttpAgent());
    bookService.getTableOfContent(bookId)
        .then(function (tableOfContent) { return res.json(tableOfContent); });
    console.info(routerName + ".tableOfContent:\n    get list of book " + bookId + ".");
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
