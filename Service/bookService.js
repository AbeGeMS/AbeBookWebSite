"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var Promise = require("bluebird");
var BookService = /** @class */ (function () {
    function BookService(bookDomain, agent) {
        this._http = agent;
        this.bookDomain = bookDomain;
    }
    BookService.prototype.getContent = function (bookId, chapterId, index) {
        var _this = this;
        try {
            var url = "" + this.bookDomain + chapterId;
            return this._http.get(url).then(function (html) {
                var result = _this.parseContent(html);
                result.Index = index;
                return result;
            });
        }
        catch (ex) {
            return new Promise(function (resolve, reject) {
                reject(JSON.stringify(ex));
            });
        }
    };
    BookService.prototype.getTableOfContent = function (bookId) {
        try {
            var url = "" + this.bookDomain + bookId + "/";
            return this._http.get(url)
                .then(function (html) {
                var _$ = cheerio.load(html);
                var tableList = _$("#list dd").toArray();
                return tableList.map(function (caption) {
                    var aElem = _$(caption).children().first();
                    return { Href: aElem.attr("href"), Title: aElem.text() };
                });
            });
        }
        catch (ex) {
            return new Promise(function (resolve, reject) { return reject(JSON.stringify(ex)); });
        }
    };
    BookService.prototype.getTitle = function (bookId) {
        var _this = this;
        try {
            var url = "" + this.bookDomain + bookId + "/";
            return this._http.get(url).then(function (html) {
                return _this.parsTile(html);
            }, function (err) { return JSON.stringify(err); });
        }
        catch (ex) {
            return new Promise(function (resolve, reject) { return reject(JSON.stringify(ex)); });
        }
    };
    BookService.prototype.parseContent = function (html) {
        var _$ = cheerio.load(html);
        var contentList = _$("#content");
        var title = _$(".bookname h1").text().trim().replace(/\n/g, "");
        var content = contentList.contents().toArray()
            .filter(function (elem) { return !_$(elem).is('br') && _$(elem).text().trim() !== ""; })
            .map(function (element) {
            return _$(element).text().trim();
        });
        return { Index: -1, Title: title, Content: content };
    };
    BookService.prototype.parsTile = function (html) {
        var _$ = cheerio.load(html);
        return _$("#info h1").text().trim().replace(/\n/g, '');
    };
    return BookService;
}());
exports.BookService = BookService;
