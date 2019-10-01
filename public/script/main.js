/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/script/view/mainPage.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib/utility.ts":
/*!****************************!*\
  !*** ./src/lib/utility.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function encodingStr(value) {
    return encodeURIComponent(value || "").replace(/'/g, "%27").replace(/"/g, "%22");
}
exports.encodingStr = encodingStr;
function decodingStr(value) {
    return decodeURIComponent(value && value.replace(/\+/g, " "));
}
exports.decodingStr = decodingStr;
function guid() {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
exports.guid = guid;
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}


/***/ }),

/***/ "./src/public/script/model/bookMarkModel.ts":
/*!**************************************************!*\
  !*** ./src/public/script/model/bookMarkModel.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataProvider_1 = __webpack_require__(/*! ../provider/dataProvider */ "./src/public/script/provider/dataProvider.ts");
var BookMark = /** @class */ (function () {
    function BookMark() {
        this.provider = new dataProvider_1.DataProvider();
    }
    Object.defineProperty(BookMark.prototype, "Provider", {
        set: function (provider) {
            this.provider = provider;
        },
        enumerable: true,
        configurable: true
    });
    BookMark.prototype.deleteBook = function (bookId) {
        return this.provider.deleteBookMark(bookId)
            .then(function (value) {
            if (value) {
                return bookId + " was deleted";
            }
            else {
                return bookId + " wasn't deleted";
            }
        }, function (err) {
            return "failed to delete " + JSON.stringify(err);
        });
    };
    BookMark.prototype.getBooks = function () {
        return this.provider.getBookMarks()
            .then(function (b) { return b.filter(function (v) { return v.BookId.trim() !== "" || v.Name.trim() !== ""; }); });
    };
    BookMark.prototype.getLatestChapter = function (bookId) {
        return this.provider.getLatestChapterNumber(bookId);
    };
    return BookMark;
}());
exports.BookMark = BookMark;


/***/ }),

/***/ "./src/public/script/model/bookModel.ts":
/*!**********************************************!*\
  !*** ./src/public/script/model/bookModel.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataProvider_1 = __webpack_require__(/*! ../provider/dataProvider */ "./src/public/script/provider/dataProvider.ts");
var BookModel = /** @class */ (function () {
    function BookModel() {
        this.bookId = null;
        this.tableOfContent = [];
        this.provider = new dataProvider_1.DataProvider();
    }
    Object.defineProperty(BookModel.prototype, "Provider", {
        get: function () { return this.provider; },
        set: function (provider) {
            this.provider = provider;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(BookModel.prototype, "TableOfContent", {
        get: function () { return this.tableOfContent; },
        set: function (tableOfContent) { this.tableOfContent = tableOfContent; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(BookModel.prototype, "BookId", {
        get: function () {
            return this.bookId;
        },
        set: function (bookId) {
            this.bookId = bookId;
        },
        enumerable: true,
        configurable: true
    });
    BookModel.prototype.getBookContent = function (bookId, chapter) {
        var _this = this;
        var charpters = this.downloadCharpters(chapter);
        return $.when.apply($, charpters.map(function (value, index) { return _this.provider.getbookContent(bookId, value, index); })).then(function () {
            var contents = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                contents[_i] = arguments[_i];
            }
            if (contents.length === 3 && !contents[1].Title) {
                var result = [];
                result.push(contents[0]);
                return result;
            }
            return contents.map(function (c) { return c[0]; });
        }, function (err) { return err; });
    };
    BookModel.prototype.getTableOfContents = function (bookId) {
        return this.provider.getbookTableOfContent(bookId);
    };
    BookModel.prototype.downloadCharpters = function (startChapter) {
        var index = this.tableOfContent.indexOf(startChapter);
        return this.tableOfContent.slice(index, 5);
    };
    return BookModel;
}());
exports.BookModel = BookModel;


/***/ }),

/***/ "./src/public/script/model/model.ts":
/*!******************************************!*\
  !*** ./src/public/script/model/model.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bookMarkModel_1 = __webpack_require__(/*! ./bookMarkModel */ "./src/public/script/model/bookMarkModel.ts");
var bookModel_1 = __webpack_require__(/*! ./bookModel */ "./src/public/script/model/bookModel.ts");
var settingsModel_1 = __webpack_require__(/*! ./settingsModel */ "./src/public/script/model/settingsModel.ts");
var stateModel_1 = __webpack_require__(/*! ./stateModel */ "./src/public/script/model/stateModel.ts");
var ModelFactory = /** @class */ (function () {
    function ModelFactory() {
        this.settings = new settingsModel_1.SettingsModel();
        this.bookMark = new bookMarkModel_1.BookMark();
        this.book = new bookModel_1.BookModel();
        this.state = new stateModel_1.StateModel();
    }
    Object.defineProperty(ModelFactory.prototype, "Setting", {
        get: function () {
            return this.settings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelFactory.prototype, "BookMark", {
        get: function () {
            return this.bookMark;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelFactory.prototype, "Book", {
        get: function () {
            return this.book;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelFactory.prototype, "State", {
        get: function () {
            return this.state;
        },
        enumerable: true,
        configurable: true
    });
    return ModelFactory;
}());
exports.ModelFactory = ModelFactory;


/***/ }),

/***/ "./src/public/script/model/settingsModel.ts":
/*!**************************************************!*\
  !*** ./src/public/script/model/settingsModel.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataProvider_1 = __webpack_require__(/*! ../provider/dataProvider */ "./src/public/script/provider/dataProvider.ts");
var SettingsModel = /** @class */ (function () {
    function SettingsModel() {
        this.provider = new dataProvider_1.DataProvider();
    }
    SettingsModel.prototype.parseDomainUrl = function (input) {
        var domainParser = input.split('.');
        return "www." + (domainParser.length > 1 ? domainParser[1] : domainParser);
    };
    SettingsModel.prototype.getBookId = function (input) {
        var result = input.match(/\d+_\d+/g);
        return result && result.length > 0 ? result[0] : "";
    };
    SettingsModel.prototype.setBookDomain = function (domain) {
        return this.provider.putBookDomain(this.parseDomainUrl(domain)).then(function (value) { return "document.cookie.BaseDomain is " + JSON.stringify(document.cookie); }, function (error) { return "set " + domain + " Failed"; });
    };
    return SettingsModel;
}());
exports.SettingsModel = SettingsModel;


/***/ }),

/***/ "./src/public/script/model/stateModel.ts":
/*!***********************************************!*\
  !*** ./src/public/script/model/stateModel.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StateModel = /** @class */ (function () {
    function StateModel() {
    }
    return StateModel;
}());
exports.StateModel = StateModel;


/***/ }),

/***/ "./src/public/script/provider/dataProvider.ts":
/*!****************************************************!*\
  !*** ./src/public/script/provider/dataProvider.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = __webpack_require__(/*! ../../../lib/utility */ "./src/lib/utility.ts");
var root = "";
var DataProvider = /** @class */ (function () {
    function DataProvider() {
    }
    DataProvider.prototype.getbookTableOfContent = function (bookId) {
        return $.ajax({
            type: "POST",
            data: JSON.stringify({ "id": bookId }),
            contentType: "application/json",
            url: root + "tableOfContent",
            success: function (data) {
                return data;
            },
        });
    };
    DataProvider.prototype.getbookContent = function (bookId, chapterId, index) {
        return $.ajax({
            type: "POST",
            data: JSON.stringify({ "bookId": bookId, "chapterId": chapterId, "index": index }),
            contentType: "application/json",
            url: root + "book",
            success: function (data) {
                return data;
            },
        });
    };
    DataProvider.prototype.getLatestChapterNumber = function (bookId) {
        return $.ajax({
            type: "GET",
            url: root + "latestChapter?id=" + bookId,
            success: function (chapterNumber) { return chapterNumber.latestChapter; },
        });
    };
    DataProvider.prototype.putLastestChapterNumber = function (bookId, chapterId) {
        return $.ajax({
            type: "GET",
            url: root + "putChapter?id=" + bookId + "&chapter=" + chapterId,
        });
    };
    DataProvider.prototype.putBookDomain = function (bookDomain) {
        return $.ajax({
            type: "PUT",
            url: root + "BookDomain/" + utility_1.encodingStr(bookDomain),
            success: function () { return true; },
            error: function (err) { return false; },
        });
    };
    DataProvider.prototype.getBookMarks = function () {
        return $.ajax({
            type: "GET",
            url: root + "books",
        });
    };
    DataProvider.prototype.deleteBookMark = function (bookId) {
        return $.ajax({
            type: "DELETE",
            url: root + "bookMark/" + bookId,
        });
    };
    return DataProvider;
}());
exports.DataProvider = DataProvider;


/***/ }),

/***/ "./src/public/script/view/bookLib.tsx":
/*!********************************************!*\
  !*** ./src/public/script/view/bookLib.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var utility_1 = __webpack_require__(/*! ../../../lib/utility */ "./src/lib/utility.ts");
var BookLib = /** @class */ (function (_super) {
    __extends(BookLib, _super);
    function BookLib(prop) {
        var _this = _super.call(this, prop) || this;
        _this.onBookClick = _this.onBookClick.bind(_this);
        return _this;
    }
    BookLib.prototype.componentWillMount = function () {
        var _this = this;
        this.props.bookMark.getBooks().then(function (v) { _this.setState({ books: v }); });
    };
    BookLib.prototype.render = function () {
        var _this = this;
        if (this.state && this.state.books) {
            var bookList = this.state.books.map(function (b) {
                return React.createElement("button", { key: utility_1.guid(), className: "primary-btn bg-dark text-white", name: b.BookId, onClick: _this.onBookClick }, b.Name);
            });
            return bookList;
        }
        return React.createElement("div", { className: "spinner text-secondary" }, "Loading...");
    };
    BookLib.prototype.onBookClick = function (e) {
        this.props.selectedBook.BookId = e.target.name;
        this.props.onBookSelect();
    };
    return BookLib;
}(React.Component));
exports.BookLib = BookLib;


/***/ }),

/***/ "./src/public/script/view/content.tsx":
/*!********************************************!*\
  !*** ./src/public/script/view/content.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var utility_1 = __webpack_require__(/*! ../../../lib/utility */ "./src/lib/utility.ts");
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content(prop) {
        return _super.call(this, prop) || this;
    }
    Content.prototype.componentWillMount = function () {
        var _this = this;
        this.props.book.getBookContent(this.props.book.BookId, this.props.charpter)
            .then(function (v) { return _this.setState({ contents: v }); });
    };
    Content.prototype.render = function () {
        var _this = this;
        if (this.state && this.state.contents) {
            return this.state.contents.map(function (v) {
                return ([React.createElement("h3", { key: utility_1.guid() }, v.Title)].concat(_this.oneCharter(v.Content)));
            });
        }
        return React.createElement("div", { className: "spinner text-secondary" }, "Loading...");
    };
    Content.prototype.oneCharter = function (content) {
        //TODO: modify content
        return content.map(function (pp) { return React.createElement("p", { key: utility_1.guid() }, pp); });
    };
    return Content;
}(React.Component));
exports.Content = Content;


/***/ }),

/***/ "./src/public/script/view/footer.tsx":
/*!*******************************************!*\
  !*** ./src/public/script/view/footer.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer(prop) {
        var _this = _super.call(this, prop) || this;
        _this.onSearchClick = _this.onSearchClick.bind(_this);
        _this.onSettingsClick = _this.onSettingsClick.bind(_this);
        return _this;
    }
    Footer.prototype.render = function () {
        return (React.createElement("div", { className: "footer-root" },
            React.createElement("div", { className: "footer-left", onClick: this.onSearchClick }, "Search"),
            React.createElement("div", { className: "footer-right", onClick: this.onSettingsClick }, "Settings")));
    };
    Footer.prototype.onSearchClick = function () {
        this.props.onSearchClick();
    };
    Footer.prototype.onSettingsClick = function () {
        this.props.onSettingClick();
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;


/***/ }),

/***/ "./src/public/script/view/homePage.tsx":
/*!*********************************************!*\
  !*** ./src/public/script/view/homePage.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var footer_1 = __webpack_require__(/*! ./footer */ "./src/public/script/view/footer.tsx");
var search_1 = __webpack_require__(/*! ./search */ "./src/public/script/view/search.tsx");
var model_1 = __webpack_require__(/*! ../model/model */ "./src/public/script/model/model.ts");
var bookLib_1 = __webpack_require__(/*! ./bookLib */ "./src/public/script/view/bookLib.tsx");
var tableOfContent_1 = __webpack_require__(/*! ./tableOfContent */ "./src/public/script/view/tableOfContent.tsx");
var content_1 = __webpack_require__(/*! ./content */ "./src/public/script/view/content.tsx");
var ContentComponent;
(function (ContentComponent) {
    ContentComponent[ContentComponent["BookLib"] = 1] = "BookLib";
    ContentComponent[ContentComponent["Search"] = 2] = "Search";
    ContentComponent[ContentComponent["TableOfContent"] = 3] = "TableOfContent";
    ContentComponent[ContentComponent["Content"] = 4] = "Content";
    ContentComponent[ContentComponent["Settings"] = 5] = "Settings";
})(ContentComponent || (ContentComponent = {}));
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage(prop) {
        var _this = _super.call(this, prop) || this;
        _this.setComponentState = _this.setComponentState.bind(_this);
        _this.renderContent = _this.renderContent.bind(_this);
        _this.modelFac = new model_1.ModelFactory();
        return _this;
    }
    HomePage.prototype.componentDidMount = function () {
    };
    HomePage.prototype.render = function () {
        var _this = this;
        var footerProp = {
            onSearchClick: function () { _this.setComponentState(ContentComponent.Search); },
            onSettingClick: function () { _this.setComponentState(ContentComponent.Settings); },
        };
        return (React.createElement("div", { className: "home-page-container" },
            React.createElement("div", { className: "home-page-content show-scroll-y" }, this.renderContent()),
            React.createElement("div", { className: "home-page-footer bg-dark" },
                React.createElement(footer_1.Footer, __assign({}, footerProp)))));
    };
    HomePage.prototype.renderContent = function () {
        var _this = this;
        if (!this.state || !this.state.currentContent) {
            return React.createElement("div", null);
        }
        var bookLibProp = {
            bookMark: this.modelFac.BookMark,
            selectedBook: this.modelFac.Book,
            onBookSelect: function () { return _this.setComponentState(ContentComponent.TableOfContent); },
        };
        var tableOfContent = {
            book: this.modelFac.Book,
            bookMark: this.modelFac.BookMark,
            state: this.modelFac.State,
            onCharpterSelected: function () { return _this.setComponentState(ContentComponent.Content); },
        };
        var contentProp = {
            book: this.modelFac.Book,
            charpter: this.modelFac.State.SelectedCharpter,
        };
        var result;
        switch (this.state.currentContent) {
            case ContentComponent.Search:
                var searchProp = {
                    settingModel: this.modelFac.Setting,
                    searchedBook: this.modelFac.Book,
                    onSearchDone: function () { _this.setComponentState(ContentComponent.TableOfContent); },
                    onGoLibDone: function () { _this.setComponentState(ContentComponent.BookLib); },
                };
                result = React.createElement(search_1.Search, __assign({}, searchProp));
                break;
            case ContentComponent.BookLib:
                result = React.createElement(bookLib_1.BookLib, __assign({}, bookLibProp));
                break;
            case ContentComponent.Content:
                result = React.createElement(content_1.Content, __assign({}, contentProp));
                break;
            case ContentComponent.TableOfContent:
                result = React.createElement(tableOfContent_1.TableOfContent, __assign({}, tableOfContent));
                break;
            case ContentComponent.Settings:
                break;
            default:
                break;
        }
        return result;
    };
    HomePage.prototype.setComponentState = function (target) {
        this.setState({ currentContent: target });
    };
    return HomePage;
}(React.Component));
exports.HomePage = HomePage;


/***/ }),

/***/ "./src/public/script/view/mainPage.tsx":
/*!*********************************************!*\
  !*** ./src/public/script/view/mainPage.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
var homePage_1 = __webpack_require__(/*! ./homePage */ "./src/public/script/view/homePage.tsx");
ReactDOM.render(React.createElement(homePage_1.HomePage, null), document.getElementById("content-root"));


/***/ }),

/***/ "./src/public/script/view/search.tsx":
/*!*******************************************!*\
  !*** ./src/public/script/view/search.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search(prop) {
        var _this = _super.call(this, prop) || this;
        _this.onSearchClick = _this.onSearchClick.bind(_this);
        _this.onGoLibClick = _this.onGoLibClick.bind(_this);
        _this.searchElement = React.createRef();
        return _this;
    }
    Search.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("input", { className: "search-bar", ref: this.searchElement }),
            React.createElement("button", { className: "search-btn bg-info", onClick: this.onSearchClick }, "Search"),
            React.createElement("button", { className: "get-lib-btn bg-primary", onClick: this.onGoLibClick }, "Go Book Lib")));
    };
    Search.prototype.onSearchClick = function () {
        var _this = this;
        var bookLib;
        if (this.searchElement.current) {
            this.props.settingModel.setBookDomain(this.searchElement.current.value)
                .then(function (v) {
                _this.props.searchedBook.BookId =
                    _this.props.settingModel.getBookId(_this.searchElement.current.value);
                _this.props.onSearchDone();
            });
        }
    };
    Search.prototype.onGoLibClick = function () {
        var _this = this;
        if (this.searchElement.current) {
            this.props.settingModel.setBookDomain(this.searchElement.current.value)
                .then(function (v) { return _this.props.onGoLibDone(); });
        }
    };
    return Search;
}(React.Component));
exports.Search = Search;


/***/ }),

/***/ "./src/public/script/view/tableOfContent.tsx":
/*!***************************************************!*\
  !*** ./src/public/script/view/tableOfContent.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var utility_1 = __webpack_require__(/*! ../../../lib/utility */ "./src/lib/utility.ts");
var TableOfContent = /** @class */ (function (_super) {
    __extends(TableOfContent, _super);
    function TableOfContent(prop) {
        var _this = _super.call(this, prop) || this;
        _this.onCharpterButtonClick = _this.onCharpterButtonClick.bind(_this);
        return _this;
    }
    TableOfContent.prototype.componentWillMount = function () {
        var _this = this;
        var bookId = this.props.book.BookId;
        this.props.book.getTableOfContents(bookId)
            .then(function (list) { return _this.setState({ lists: list }); })
            .then(function () { return _this.props.bookMark.getLatestChapter(bookId).then(function (l) {
            return _this.setState({ latestCharpter: l });
        }); });
    };
    TableOfContent.prototype.render = function () {
        var _this = this;
        if (this.state && this.state.lists) {
            var lastCharpter = this.state.latestCharpter ? this.state.lists[this.state.latestCharpter] : this.state.lists[0];
            var tableOfContent = this.state.lists.map(function (charpter) { return React.createElement("button", { key: utility_1.guid(), className: "primary-btn bg-dak text-white", name: charpter.Href, onClick: _this.onCharpterButtonClick }, charpter.Title); });
            return (React.createElement("div", null,
                React.createElement("button", { className: "primary-btn bg-dak text-white", name: lastCharpter.Href, onClick: this.onCharpterButtonClick }, lastCharpter.Title),
                tableOfContent));
        }
        return React.createElement("div", { className: "spinner text-secondary" }, "Loading...");
    };
    TableOfContent.prototype.onCharpterButtonClick = function (e) {
        this.props.book.TableOfContent = this.state.lists.map(function (t) { return t.Href; });
        this.props.state.SelectedCharpter = e.target.name;
        this.props.onCharpterSelected();
    };
    return TableOfContent;
}(React.Component));
exports.TableOfContent = TableOfContent;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map