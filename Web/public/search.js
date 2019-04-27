var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Abe;
(function (Abe) {
    var Client;
    (function (Client) {
        var searchPage = (function (_super) {
            __extends(searchPage, _super);
            function searchPage() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.currentContent = [];
                _this.currentChapter = 0;
                _this.state = {
                    bookHost: "",
                    bookId: "",
                    bookContent: [],
                    chapterIndex: 0,
                    isTable: true,
                    tableOfContent: [],
                    bookMark: [],
                };
                _this.bookBuffer = 0;
                return _this;
            }
            searchPage.prototype.componentDidMount = function () {
            };
            searchPage.prototype.render = function () {
                var _this = this;
                var inputProp = {
                    style: { width: "60%" },
                    onChange: function (e) {
                        var parseResult = _this.parseUrl(e.target.value.replace(/ /g, ''));
                        _this.setState({ bookHost: parseResult.hostname, bookId: parseResult.bookId });
                    },
                };
                var btnProp = {
                    onClick: function () {
                        _this.getChapterList(_this.state.bookHost + "/" + _this.state.bookId + "/");
                    },
                };
                var bookMarkProp = {
                    onClick: function () {
                        var provider = new Abe.Client.dataProvider();
                        provider.getBookMark(_this.state.bookHost)
                            .then(function (books) { return _this.setState({ bookMark: books, bookId: "", tableOfContent: [] }); });
                    },
                };
                var tableContent = (React.createElement("div", null,
                    React.createElement("span", null,
                        React.createElement("input", __assign({}, inputProp))),
                    React.createElement("span", null,
                        React.createElement("button", __assign({}, btnProp), "Search")),
                    React.createElement("span", null,
                        React.createElement("button", __assign({}, bookMarkProp), "I'm feeling Lucky")),
                    React.createElement("span", null, this.latestChapter()),
                    React.createElement("div", null, this.bookMark(this.state.bookMark)),
                    React.createElement("div", null, this.tableOfContent(this.state.tableOfContent))));
                var backTableBtnProp = {
                    onClick: function () {
                        _this.setState({ isTable: !_this.state.isTable });
                    }
                };
                var nextChapter = {
                    disabled: this.state.chapterIndex >= this.state.tableOfContent.length,
                    onClick: function () {
                        if (_this.currentContent === null) {
                            _this.getBookContent([], _this.state.tableOfContent[_this.state.chapterIndex + 1].href, false)
                                .then(function () {
                                var chapterMark = _this.currentChapter;
                                _this.setState({ bookContent: _this.currentContent, isTable: false, chapterIndex: _this.currentChapter }, function () { return _this.putChapterMark(chapterMark)
                                    .then(function () { return _this.getBookContent([], _this.state.tableOfContent[_this.state.chapterIndex + 1].href, false); }); });
                            });
                        }
                        else {
                            var chapterMark_1 = _this.currentChapter;
                            _this.setState({ bookContent: _this.currentContent, isTable: false, chapterIndex: _this.currentChapter }, function () { return _this.putChapterMark(chapterMark_1)
                                .then(function () { return _this.getBookContent([], _this.state.tableOfContent[_this.state.chapterIndex + 1].href, false); }); });
                        }
                    }
                };
                var bookContent = (React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("button", __assign({}, backTableBtnProp), "Table Of Content"),
                        React.createElement("button", __assign({}, nextChapter), "Next Chapter")),
                    React.createElement("div", null, this.bookContent(this.state.bookContent))));
                return this.state.isTable ? tableContent : bookContent;
            };
            searchPage.prototype.bookContent = function (list) {
                return list.map(function (value) {
                    return React.createElement("p", null, value.p);
                });
            };
            searchPage.prototype.tableOfContent = function (list) {
                var _this = this;
                var content = list.map(function (value) {
                    var btnProp = {
                        onClick: function () {
                            _this.getContentFromTable(value.href);
                        }
                    };
                    return React.createElement("span", null,
                        React.createElement("button", __assign({}, btnProp), value.title));
                });
                return (React.createElement("div", null, content));
            };
            searchPage.prototype.latestChapter = function () {
                var _this = this;
                var chaptermark = this.state.chapterIndex == this.state.tableOfContent.length - 1
                    ? this.state.chapterIndex
                    : this.state.chapterIndex + 1;
                if (chaptermark == 1 || chaptermark > this.state.tableOfContent.length) {
                    return;
                }
                var latestChapterProp = {
                    onClick: function () {
                        _this.getContentFromTable(_this.state.tableOfContent[chaptermark].href);
                    },
                };
                return (React.createElement("button", __assign({}, latestChapterProp), this.state.tableOfContent[chaptermark].title));
            };
            searchPage.prototype.bookMark = function (bookMark) {
                var _this = this;
                var content = bookMark.map(function (value) {
                    var btnProp = {
                        onClick: function () {
                            _this.setState({ bookId: value.id }, function () {
                                _this.getChapterList(_this.state.bookHost + "/" + value.id + "/")
                                    .then(function () { return _this.setState({ bookMark: [] }); });
                            });
                        }
                    };
                    return React.createElement("span", null,
                        React.createElement("button", __assign({}, btnProp), value.name));
                });
                return (React.createElement("div", null, content));
            };
            searchPage.prototype.getChapterList = function (bookUrl) {
                var _this = this;
                var provider = new Abe.Client.dataProvider();
                return provider.getbookTableOfContent(bookUrl)
                    .then(function (c) { return _this.setState({ tableOfContent: c }, function () {
                    _this.getLatestChapter();
                }); });
            };
            searchPage.prototype.getContentFromTable = function (url) {
                var _this = this;
                this.getBookContent([], url, true)
                    .then(function () {
                    _this.setState({ bookContent: _this.currentContent, isTable: false, chapterIndex: _this.currentChapter }, function () {
                        $("body").scrollTop(0);
                        if (!!_this.state.tableOfContent[_this.state.chapterIndex + 1]) {
                            _this.getBookContent([], _this.state.tableOfContent[_this.state.chapterIndex + 1].href, false);
                        }
                    });
                });
            };
            searchPage.prototype.getLatestChapter = function () {
                var _this = this;
                var provider = new Abe.Client.dataProvider();
                provider.getLatestChapertNumber(this.state.bookId)
                    .then(function (v) { return _this.setState({
                    chapterIndex: parseInt(v.toString())
                }); });
            };
            searchPage.prototype.getBookContent = function (content, url, setToCache) {
                var _this = this;
                if (!this.getContentDeferred || !content || content.length === 0) {
                    this.getContentDeferred = $.Deferred();
                }
                var provider = new Abe.Client.dataProvider();
                var chapterIndex = this.state.tableOfContent.findIndex(function (v) { return v.href === url; });
                provider.getbookContent(this.state.bookHost + url, this.state.bookId, setToCache ? chapterIndex : -1)
                    .then(function (c) {
                    if (!content) {
                        content = [];
                    }
                    content = content.concat(c);
                    var index = _this.state.tableOfContent.findIndex(function (v) { return v.href === url; });
                    if (++index < _this.state.tableOfContent.length
                        && _this.bookBuffer++ < 6) {
                        _this.getBookContent(content, _this.state.tableOfContent[index].href, setToCache);
                    }
                    else {
                        _this.bookBuffer = 0;
                        content.forEach(function (v) { return _this.replaceGroup().forEach(function (r) {
                            v.p = v.p.replace(new RegExp(r.s, "gm"), r.t);
                        }); });
                        content.push({ p: _this.state.tableOfContent[index - 1].title + "完" });
                        _this.currentContent = content;
                        _this.currentChapter = index - 1;
                        console.log("current chapter is " + _this.currentChapter);
                        _this.getContentDeferred.resolve();
                    }
                }, function () {
                    _this.currentContent = null;
                    _this.getContentDeferred.reject();
                });
                return this.getContentDeferred.promise();
            };
            searchPage.prototype.putChapterMark = function (chapter) {
                var provider = new Abe.Client.dataProvider();
                return provider.putLastestChapterNumber(this.state.bookId, chapter);
            };
            searchPage.prototype.parseUrl = function (url) {
                var result = url.match(/(.*)\/(.*)\//);
                return { hostname: result[1], bookId: result[2] };
            };
            searchPage.prototype.replaceGroup = function () {
                return [
                    { s: "sè", t: "色" },
                    { s: "rì", t: "日" },
                    { s: "jīng", t: "精" },
                    { s: "xìng", t: "兴" },
                    { s: "()", t: "" },
                    { s: "cháo", t: "糙" },
                    { s: "jǐng", t: "景" },
                    { s: "yīn", t: "音" },
                    { s: "sāo", t: "瘙" },
                    { s: "yù", t: "域" },
                    { s: "レwww.siluke.com♠思♥路♣客レ", t: "" },
                    { s: "jiǔ", t: "酒" },
                    { s: "zì ", t: "字" },
                    { s: "yóu", t: "油" },
                    { s: "zhèng", t: "正" },
                    { s: "fǔ", t: "府" },
                    { s: "nǎi", t: "乃" },
                    { s: "jiān", t: "间" },
                    { s: "chūn", t: "春" },
                    { s: "shè", t: "社" },
                    { s: "cāo", t: "糙" },
                    { s: "dú", t: "队" },
                    { s: "lì", t: "丽" },
                    { s: "jǐng", t: "警" },
                    { s: "jǐng", t: "警" },
                    { s: "chéng", t: "城" },
                    { s: "rén", t: "人" },
                    { s: "zhèng ", t: "正" },
                    { s: "fǔ", t: "腹" },
                    { s: "nǎi", t: "奶" },
                    { s: "è", t: "色" },
                    { s: "jī", t: "基" },
                    { s: "méng", t: "萌" },
                    { s: "lù", t: "陆" },
                    { s: "mí", t: "弥" },
                    { s: "hún", t: "魂" },
                    { s: "dàng", t: "荡" },
                    { s: "bō", t: "波" },
                    { s: "shì", t: "市" },
                    { s: "nv", t: "女" },
                    { s: "『", t: "" },
                    { s: "』", t: "" },
                    { s: "mén", t: "门" },
                    { s: "máo", t: "毛" },
                    { s: "hòu", t: "后" },
                    { s: "huā", t: "花" },
                    { s: "jiāo", t: "交" },
                    { s: "ji", t: "基" },
                    { s: "dòng", t: "动" },
                    { s: "luàn", t: "换" },
                    { s: "fù", t: "付" },
                    { s: "xìn", t: "信" },
                    { s: "xiōng", t: "兄" },
                    { s: "yòu", t: "又" },
                    { s: "luǒ", t: "裸" },
                    { s: "sī", t: "私" },
                    { s: "readx", t: "" },
                    { s: "&nbsp;", t: "" },
                    { s: "nbsp;", t: "" },
                    { s: "A|a", t: "甲" },
                    { s: "B|b", t: "乙" },
                    { s: "C|c", t: "丙" },
                    { s: "D|d", t: "丁" },
                    { s: "[d-z]", t: "" },
                    { s: "[D-Z]", t: "" },
                    { s: "？", t: "." },
                    { s: "\\\?", t: "." },
                ];
            };
            return searchPage;
        }(React.Component));
        Client.searchPage = searchPage;
    })(Client = Abe.Client || (Abe.Client = {}));
})(Abe || (Abe = {}));
var sPageProp = {};
ReactDOM.render(React.createElement(Abe.Client.searchPage, __assign({}, sPageProp)), document.getElementById("content-root"));
//# sourceMappingURL=search.js.map
