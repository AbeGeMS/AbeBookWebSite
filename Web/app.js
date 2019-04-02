"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var __ = require("./../Service/WebCrawler");
var bodyParser = require("body-parser");
var path = require("path");
var Abe;
(function (Abe) {
    var Web;
    (function (Web) {
        var WebSite = (function () {
            function WebSite() {
            }
            WebSite.start = function () {
                var app = express();
                app.use(express.static(path.join(__dirname, "public")));
                app.use(bodyParser());
                app.post("/book", function (req, res) {
                    WebSite.crawlerContent(req.body.url, req.body.bookId, req.body.chapterId)
                        .then(function (bookContent) {
                        res.json(bookContent);
                    });
                });
                app.post("/tableOfContent", function (req, res) {
                    WebSite.crawlerTableOfContent(req.body.url)
                        .then(function (tableOfContentArray) {
                        res.json(tableOfContentArray);
                    });
                });
                app.get("/latestChapter", function (req, res) {
                    WebSite.getCrawlerLateastChapter(req.query.id)
                        .then(function (latestChapter) {
                        console.log('[log] latestChapter is ' + parseInt(latestChapter));
                        res.send(latestChapter);
                    });
                });
                app.get("/putChapter", function (req, res) {
                    WebSite.putCrawlerLateastChapter(req.query.id, req.query.chapter)
                        .then(function (value) {
                        res.send(value);
                    });
                });
                app.get("/delCache", function (req, res) {
                    WebSite.delCache(req.query.id)
                        .then(function (value) { return res.send(value); });
                });
                app.get("/books", function (req, res) {
                    console.log(req.query.id);
                    WebSite.getBookList(req.query.id)
                        .then(function (v) { return res.send(v); });
                });
                var server = app.listen(3000, function () {
                    console.log("server is listen port: %s", server.address().port);
                });
            };
            WebSite.crawlerTableOfContent = function (bookUrl) {
                var webCrawler = new __.Abe.Service.WebCrawler();
                return webCrawler.downloadPage(bookUrl)
                    .then(function (html) {
                    return webCrawler.parsTable(html);
                });
            };
            WebSite.crawlerContent = function (bookurl, bookId, chapter) {
                var webCrawler = new __.Abe.Service.WebCrawler();
                return webCrawler.downloadPage(bookurl)
                    .then(function (html) {
                    webCrawler.putLatestChapterNumber(bookId, chapter.toString());
                    var result = webCrawler.parseContent(html);
                    return result;
                });
            };
            WebSite.getCrawlerLateastChapter = function (bookId) {
                var webCrawler = new __.Abe.Service.WebCrawler();
                return webCrawler.getLatestChapterNumber(bookId);
            };
            WebSite.putCrawlerLateastChapter = function (bookId, chapterNum) {
                var webCrawler = new __.Abe.Service.WebCrawler();
                return webCrawler.putLatestChapterNumber(bookId, chapterNum);
            };
            WebSite.delCache = function (key) {
                var webCrawler = new __.Abe.Service.WebCrawler();
                return webCrawler.deleteCache(key);
            };
            WebSite.getBookList = function (rootUrl) {
                var webCrawler = new __.Abe.Service.WebCrawler();
                return webCrawler.getBookList(rootUrl);
            };
            return WebSite;
        }());
        Web.WebSite = WebSite;
    })(Web = Abe.Web || (Abe.Web = {}));
})(Abe || (Abe = {}));
Abe.Web.WebSite.start();
//# sourceMappingURL=app.js.map