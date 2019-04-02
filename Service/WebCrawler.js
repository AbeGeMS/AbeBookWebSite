"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require("https");
var cheerio = require("cheerio");
var b = require("bluebird");
var redis = require("redis");
var Abe;
(function (Abe) {
    var Service;
    (function (Service) {
        var WebCrawler = (function () {
            function WebCrawler() {
                this.redisClient = redis.createClient(6380, 'myBookmark.redis.cache.windows.net', {
                    auth_pass: 'u93X6QKxkPtUae0XZ6eWE2HwFrl0xjP4PADkgOMei9M=',
                    tls: {
                        servername: 'myBookmark.redis.cache.windows.net'
                    },
                });
            }
            WebCrawler.prototype.downloadPage = function (url) {
                var _this = this;
                var defer = b.defer();
                https.get(url, function (res) {
                    res.setEncoding("utf-8");
                    return _this.getConent(res)
                        .then(function (message) { return defer.resolve(message); });
                });
                return defer.promise;
            };
            WebCrawler.prototype.getConent = function (response) {
                var defer = b.defer();
                var message = "";
                response.on("data", function (chunk) {
                    message += chunk;
                });
                response.on("end", function () {
                    defer.resolve(message);
                });
                response.on("errr", function (err) { console.log(err); });
                return defer.promise;
            };
            WebCrawler.prototype.getLatestChapterNumber = function (bookId) {
                var _this = this;
                var defer = b.defer();
                if (bookId == null) {
                    console.log("[err] latestChapter.latestChapter parameter incorrect");
                }
                this.redisClient.get(bookId, function (err, value) {
                    if (!value) {
                        _this.redisClient.set(bookId, "0", function (err, value) {
                            console.log('[info] set initial chapter 0, status is' + value);
                        });
                        defer.resolve("0");
                    }
                    else {
                        console.log("[log] bookId " + bookId + " last charpter " + value);
                        defer.resolve(value);
                    }
                });
                return defer.promise;
            };
            WebCrawler.prototype.putLatestChapterNumber = function (bookId, chapter) {
                var _this = this;
                var defer = b.defer();
                this.redisClient.get(bookId, function (err, value) {
                    if (parseInt(chapter) > parseInt(value)) {
                        _this.redisClient.set(bookId, chapter.toString(), function (err, value) {
                            defer.resolve(value);
                            console.log("[log] set chapter success");
                        });
                    }
                    else {
                        defer.reject("small chapter,input " + chapter + "latest " + value);
                    }
                });
                return defer.promise;
            };
            WebCrawler.prototype.deleteCache = function (key) {
                var defer = b.defer();
                this.redisClient.DEL(key, function (err, value) { return defer.resolve(value.toString()); });
                return defer.promise;
            };
            WebCrawler.prototype.getBookList = function (rootUrl) {
                var _this = this;
                var defer = b.defer();
                this.redisClient.scan('0', 'COUNT', '20', function (err, reply) {
                    if (!!err) {
                        defer.reject("scan resdis failed");
                        console.log("WebCrawler.getBookList: scan redis Error is " + err);
                    }
                    if (reply.length == 2) {
                        var queue_1 = [];
                        var bookIds = reply[1];
                        bookIds.forEach(function (v) {
                            return queue_1.push(_this.downloadPage(rootUrl + "/" + v + "/")
                                .then(function (html) {
                                var title = _this.parsTile(html);
                                console.log("get id " + v + ", name " + title);
                                return { id: v, name: title };
                            }));
                        });
                        b.all(queue_1).then(function (values) {
                            defer.resolve(values.filter(function (v) { return v.name != ""; }));
                        });
                    }
                });
                return defer.promise;
            };
            WebCrawler.prototype.parseContent = function (html) {
                var _$ = cheerio.load(html);
                var contentList = _$("#content");
                var result = contentList.contents().toArray()
                    .filter(function (elem) { return !_$(elem).is('br'); })
                    .map(function (element) {
                    return { p: _$(element).text().trim() };
                });
                return result;
            };
            WebCrawler.prototype.parsTable = function (html) {
                var _$ = cheerio.load(html);
                var tableList = _$("#list dd").toArray();
                return tableList.map(function (caption) {
                    var aElem = _$(caption).children().first();
                    return { href: aElem.attr("href"), title: aElem.text() };
                });
            };
            WebCrawler.prototype.parsTile = function (html) {
                var _$ = cheerio.load(html);
                return _$("#info h1").text();
            };
            return WebCrawler;
        }());
        Service.WebCrawler = WebCrawler;
    })(Service = Abe.Service || (Abe.Service = {}));
})(Abe = exports.Abe || (exports.Abe = {}));
//# sourceMappingURL=WebCrawler.js.map