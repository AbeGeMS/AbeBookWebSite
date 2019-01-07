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


/***/ }),

/***/ "./src/public/script/model/baseReducer.ts":
/*!************************************************!*\
  !*** ./src/public/script/model/baseReducer.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RequestStatus;
(function (RequestStatus) {
    RequestStatus[RequestStatus["Start"] = 0] = "Start";
    RequestStatus[RequestStatus["Success"] = 1] = "Success";
    RequestStatus[RequestStatus["Failed"] = 2] = "Failed";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
function reducerTemplate(state, action, handlers) {
    var handler = handlers[action.type];
    return handler ? handler(state, action) : state;
}
exports.reducerTemplate = reducerTemplate;


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

/***/ "./src/public/script/model/bookMarkReducer.ts":
/*!****************************************************!*\
  !*** ./src/public/script/model/bookMarkReducer.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bookMarkModel_1 = __webpack_require__(/*! ./bookMarkModel */ "./src/public/script/model/bookMarkModel.ts");
var baseReducer_1 = __webpack_require__(/*! ./baseReducer */ "./src/public/script/model/baseReducer.ts");
var Constants = __webpack_require__(/*! ./constants */ "./src/public/script/model/constants.ts");
var dataContainer_1 = __webpack_require__(/*! ./dataContainer */ "./src/public/script/model/dataContainer.ts");
var common_1 = __webpack_require__(/*! ./common */ "./src/public/script/model/common.ts");
var notificationReducer_1 = __webpack_require__(/*! ./notificationReducer */ "./src/public/script/model/notificationReducer.ts");
// Reducer
exports.bookMarkReducer = function (state, action) {
    if (state === void 0) { state = { books: [] }; }
    return baseReducer_1.reducerTemplate(state, action, BookMark_HandlerMap);
};
function requestGetBooks(state, action) {
    if (action.type !== Constants.GetBooks_Request) {
        return state;
    }
    var bookMark = new bookMarkModel_1.BookMark();
    notificationReducer_1.NotifyAsync("Start to get books", common_1.DingamStyle.Secondary, true);
    bookMark.getBooks().then(function (books) {
        dataContainer_1.default().dispatch({
            type: Constants.GetBooks_Response,
            status: baseReducer_1.RequestStatus.Success,
            books: books,
        });
        notificationReducer_1.NotifyAsync("get books success", common_1.DingamStyle.Success, true);
    }, function (error) {
        notificationReducer_1.NotifyAsync("Failed to get books " + error.message, common_1.DingamStyle.Alert, true);
    });
    return __assign({}, state, { status: baseReducer_1.RequestStatus.Start });
}
function responseGetBooks(state, action) {
    if (action.type === Constants.GetBooks_Response) {
        var newState = __assign({}, state, { books: action.books, status: action.status });
        return newState;
    }
    return __assign({}, state);
}
var BookMark_HandlerMap = (_a = {},
    _a[Constants.GetBooks_Request] = requestGetBooks,
    _a[Constants.GetBooks_Response] = responseGetBooks,
    _a);
var _a;


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
        return $.when.apply($, chapter.map(function (value, index) { return _this.provider.getbookContent(bookId, value, index); })).then(function () {
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
    return BookModel;
}());
exports.BookModel = BookModel;


/***/ }),

/***/ "./src/public/script/model/bookReducer.ts":
/*!************************************************!*\
  !*** ./src/public/script/model/bookReducer.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseReducer_1 = __webpack_require__(/*! ./baseReducer */ "./src/public/script/model/baseReducer.ts");
var CONST = __webpack_require__(/*! ./constants */ "./src/public/script/model/constants.ts");
var bookModel_1 = __webpack_require__(/*! ./bookModel */ "./src/public/script/model/bookModel.ts");
var dataContainer_1 = __webpack_require__(/*! ./dataContainer */ "./src/public/script/model/dataContainer.ts");
var notificationReducer_1 = __webpack_require__(/*! ./notificationReducer */ "./src/public/script/model/notificationReducer.ts");
var common_1 = __webpack_require__(/*! ./common */ "./src/public/script/model/common.ts");
var bookMarkModel_1 = __webpack_require__(/*! ./bookMarkModel */ "./src/public/script/model/bookMarkModel.ts");
exports.bookReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    return baseReducer_1.reducerTemplate(state, action, Book_HandlerMap);
};
function getTableOfContent_Request_Handler(state, action) {
    if (action.type === CONST.GetTableOfContents_Request) {
        var book = new bookModel_1.BookModel();
        var bookMark = new bookMarkModel_1.BookMark();
        notificationReducer_1.NotifyAsync("Start to get book " + action.bookId + "...", common_1.DingamStyle.Secondary, true);
        $.when(book.getTableOfContents(action.bookId), bookMark.getLatestChapter(action.bookId))
            .then(function (table, chapterIndex) {
            notificationReducer_1.NotifyAsync("succes get the table of content for book " + action.bookId, common_1.DingamStyle.Success);
            setTimeout(function () {
                var newaction = {
                    type: CONST.GetTableOfContents_Response,
                    status: baseReducer_1.RequestStatus.Success,
                    table: table[0],
                    bookId: action.bookId,
                    latestCharpter: chapterIndex[0].latestChapter,
                };
                dataContainer_1.default().dispatch(newaction);
            }, 0);
        }, function (err) { return notificationReducer_1.NotifyAsync("Failed to get the table of content casue: " + JSON.stringify(err), common_1.DingamStyle.Alert); });
    }
    return __assign({}, state, { status: baseReducer_1.RequestStatus.Start });
}
function getTableOfContent_Response_Handler(state, action) {
    if (action.type === CONST.GetTableOfContents_Response) {
        return __assign({}, state, { bookId: action.bookId, table: action.table, latestCharpter: action.latestCharpter, status: action.status });
    }
    return __assign({}, state);
}
function getContent_Request_Handler(state, action) {
    if (action.type === CONST.GetContent_Request) {
        var book = new bookModel_1.BookModel();
        var startIndex = state.table.findIndex(function (v) { return v.Href === action.chapterId; });
        var list = state.table.slice(startIndex, startIndex + 5).map(function (v) { return v.Href; });
        notificationReducer_1.NotifyAsync("Start to loading content of chapter " + action.chapterId, common_1.DingamStyle.Secondary);
        book.getBookContent(action.bookId, list).then(function (contents) {
            notificationReducer_1.NotifyAsync("Success get the book content of chapter " + action.type, common_1.DingamStyle.Success);
            setTimeout(function () {
                var newAction = {
                    type: CONST.GetContent_Response,
                    status: baseReducer_1.RequestStatus.Success,
                    contents: contents,
                };
                dataContainer_1.default().dispatch(newAction);
            }, 0);
        }, function (err) { return notificationReducer_1.NotifyAsync("Failed to get content by " + err, common_1.DingamStyle.Alert); });
    }
    return __assign({}, state, { status: baseReducer_1.RequestStatus.Start });
}
function getContent_Response_Handler(state, action) {
    if (action.type === CONST.GetContent_Response)
        return __assign({}, state, { contents: action.contents, status: action.status });
    return __assign({}, state);
}
var Book_HandlerMap = (_a = {},
    _a[CONST.GetTableOfContents_Request] = getTableOfContent_Request_Handler,
    _a[CONST.GetTableOfContents_Response] = getTableOfContent_Response_Handler,
    _a[CONST.GetContent_Request] = getContent_Request_Handler,
    _a[CONST.GetContent_Response] = getContent_Response_Handler,
    _a);
var _a;


/***/ }),

/***/ "./src/public/script/model/common.ts":
/*!*******************************************!*\
  !*** ./src/public/script/model/common.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DingamStyle;
(function (DingamStyle) {
    DingamStyle["Alert"] = "alert";
    DingamStyle["Primary"] = "primary";
    DingamStyle["Secondary"] = "secondary";
    DingamStyle["Success"] = "success";
    DingamStyle["Warning"] = "warning";
    DingamStyle["Dark"] = "dark";
})(DingamStyle = exports.DingamStyle || (exports.DingamStyle = {}));
var ListItemRole;
(function (ListItemRole) {
    ListItemRole["Header"] = "header";
    ListItemRole["Item"] = "item";
})(ListItemRole = exports.ListItemRole || (exports.ListItemRole = {}));


/***/ }),

/***/ "./src/public/script/model/constants.ts":
/*!**********************************************!*\
  !*** ./src/public/script/model/constants.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBooks_Request = "GetBooks_Request";
exports.GetBooks_Response = "GetBooks_Response";
exports.SetBookDomain_Request = "SetBookDomain_Request";
exports.SetBookDomain_Response = "SetBookDomain_Response";
exports.ChangeNotification = "ChangeNotification";
exports.GetTableOfContents_Request = "GetTableOfContents_Request";
exports.GetTableOfContents_Response = "GetTableOfContetns_Response";
exports.GetContent_Request = "GetContent_Request";
exports.GetContent_Response = "GetContent_Response";
exports.SetCorrectionList = "SetCorrectionList";
exports.CorrectionList = [
    { pattern: "sè", value: "色" },
    { pattern: "rì", value: "日" },
    { pattern: "jīng", value: "精" },
    { pattern: "xìng", value: "兴" },
    { pattern: "()", value: "" },
    { pattern: "cháo", value: "糙" },
    { pattern: "jǐng", value: "景" },
    { pattern: "yīn", value: "音" },
    { pattern: "sāo", value: "瘙" },
    { pattern: "yù", value: "域" },
    { pattern: "レwww.siluke.com♠思♥路♣客レ", value: "" },
    { pattern: "jiǔ", value: "酒" },
    { pattern: "zì ", value: "字" },
    { pattern: "yóu", value: "油" },
    { pattern: "zhèng", value: "正" },
    { pattern: "fǔ", value: "府" },
    { pattern: "nǎi", value: "乃" },
    { pattern: "jiān", value: "间" },
    { pattern: "chūn", value: "春" },
    { pattern: "shè", value: "社" },
    { pattern: "cāo", value: "糙" },
    { pattern: "dú", value: "队" },
    { pattern: "lì", value: "丽" },
    { pattern: "jǐng", value: "警" },
    { pattern: "jǐng", value: "警" },
    { pattern: "chéng", value: "城" },
    { pattern: "rén", value: "人" },
    { pattern: "zhèng ", value: "正" },
    { pattern: "fǔ", value: "腹" },
    { pattern: "nǎi", value: "奶" },
    { pattern: "è", value: "色" },
    { pattern: "jī", value: "基" },
    { pattern: "méng", value: "萌" },
    { pattern: "lù", value: "陆" },
    { pattern: "mí", value: "弥" },
    { pattern: "hún", value: "魂" },
    { pattern: "dàng", value: "荡" },
    { pattern: "bō", value: "波" },
    { pattern: "shì", value: "市" },
    { pattern: "nv", value: "女" },
    { pattern: "『", value: "" },
    { pattern: "』", value: "" },
    { pattern: "mén", value: "门" },
    { pattern: "máo", value: "毛" },
    { pattern: "hòu", value: "后" },
    { pattern: "huā", value: "花" },
    { pattern: "jiāo", value: "交" },
    { pattern: "ji", value: "基" },
    { pattern: "dòng", value: "动" },
    { pattern: "luàn", value: "换" },
    { pattern: "fù", value: "付" },
    { pattern: "xìn", value: "信" },
    { pattern: "xiōng", value: "兄" },
    { pattern: "yòu", value: "又" },
    { pattern: "luǒ", value: "裸" },
    { pattern: "sī", value: "私" },
    { pattern: "readx", value: "" },
    { pattern: "&nbsp;", value: "" },
    { pattern: "nbsp;", value: "" },
    { pattern: "[a-z]", value: "" },
    { pattern: "[A-Z]", value: "" },
    { pattern: "？", value: "." },
    { pattern: "\\\?", value: "." },
];


/***/ }),

/***/ "./src/public/script/model/dataContainer.ts":
/*!**************************************************!*\
  !*** ./src/public/script/model/dataContainer.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(/*! redux */ "redux");
var common_1 = __webpack_require__(/*! ./common */ "./src/public/script/model/common.ts");
var bookMarkReducer_1 = __webpack_require__(/*! ./bookMarkReducer */ "./src/public/script/model/bookMarkReducer.ts");
var notificationReducer_1 = __webpack_require__(/*! ./notificationReducer */ "./src/public/script/model/notificationReducer.ts");
var bookReducer_1 = __webpack_require__(/*! ./bookReducer */ "./src/public/script/model/bookReducer.ts");
var settingsReducer_1 = __webpack_require__(/*! ./settingsReducer */ "./src/public/script/model/settingsReducer.ts");
var Constants = __webpack_require__(/*! ./constants */ "./src/public/script/model/constants.ts");
var _store;
var reduxStore = function () {
    if (!_store) {
        _store = redux_1.createStore(reducer, defaultState);
    }
    return _store;
};
exports.default = reduxStore;
var defaultState = {
    bookMark: { books: [] },
    book: { table: [], contents: [] },
    notification: { NotifyMessage: null, NotifyStyle: common_1.DingamStyle.Primary, IsVissible: false },
    setting: { bookDomain: "", corrections: Constants.CorrectionList },
};
// Reducec
var reducerMap = {
    bookMark: bookMarkReducer_1.bookMarkReducer,
    book: bookReducer_1.bookReducer,
    notification: notificationReducer_1.notificationReducer,
    setting: settingsReducer_1.settingsReducer,
};
var reducer = redux_1.combineReducers(reducerMap);


/***/ }),

/***/ "./src/public/script/model/notificationReducer.ts":
/*!********************************************************!*\
  !*** ./src/public/script/model/notificationReducer.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(/*! ./common */ "./src/public/script/model/common.ts");
var baseReducer_1 = __webpack_require__(/*! ./baseReducer */ "./src/public/script/model/baseReducer.ts");
var Constants = __webpack_require__(/*! ./constants */ "./src/public/script/model/constants.ts");
var dataContainer_1 = __webpack_require__(/*! ./dataContainer */ "./src/public/script/model/dataContainer.ts");
function Notify(message, style, vissible) {
    if (vissible === void 0) { vissible = true; }
    var newNotify = {
        Message: message,
        Style: style,
        IsVissible: vissible,
        type: Constants.ChangeNotification,
    };
    dataContainer_1.default().dispatch(newNotify);
}
exports.Notify = Notify;
function NotifyAsync(message, style, vissible) {
    if (vissible === void 0) { vissible = true; }
    setTimeout(function () {
        Notify(message, style, vissible);
    }, 0);
}
exports.NotifyAsync = NotifyAsync;
var Notification_HandlerMap = (_a = {},
    _a[Constants.ChangeNotification] = changeNotification,
    _a);
exports.notificationReducer = function (state, action) {
    if (state === void 0) { state = {
        NotifyMessage: null,
        NotifyStyle: common_1.DingamStyle.Primary,
        IsVissible: false
    }; }
    return baseReducer_1.reducerTemplate(state, action, Notification_HandlerMap);
};
function changeNotification(state, action) {
    if (action.type == Constants.ChangeNotification) {
        state.NotifyMessage = action.Message;
        state.NotifyStyle = action.Style;
        state.IsVissible = action.IsVissible;
    }
    return state;
}
var _a;


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
    SettingsModel.prototype.setBookDomain = function (domain) {
        return this.provider.putBookDomain(domain).then(function (value) { return "document.cookie.BaseDomain is " + JSON.stringify(document.cookie); }, function (error) { return "set " + domain + " Failed"; });
    };
    return SettingsModel;
}());
exports.SettingsModel = SettingsModel;


/***/ }),

/***/ "./src/public/script/model/settingsReducer.ts":
/*!****************************************************!*\
  !*** ./src/public/script/model/settingsReducer.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseReducer_1 = __webpack_require__(/*! ./baseReducer */ "./src/public/script/model/baseReducer.ts");
var notificationReducer_1 = __webpack_require__(/*! ./notificationReducer */ "./src/public/script/model/notificationReducer.ts");
var common_1 = __webpack_require__(/*! ./common */ "./src/public/script/model/common.ts");
var settingsModel_1 = __webpack_require__(/*! ./settingsModel */ "./src/public/script/model/settingsModel.ts");
var Constants = __webpack_require__(/*! ./constants */ "./src/public/script/model/constants.ts");
var dataContainer_1 = __webpack_require__(/*! ./dataContainer */ "./src/public/script/model/dataContainer.ts");
var Settings_HandlerMap = (_a = {},
    _a[Constants.SetBookDomain_Request] = setBookDomain_Request,
    _a[Constants.SetBookDomain_Response] = setBookDomain_Response,
    _a[Constants.SetCorrectionList] = setCorrectionList,
    _a);
exports.settingsReducer = function (state, action) {
    if (state === void 0) { state = { bookDomain: null, corrections: Constants.CorrectionList }; }
    return baseReducer_1.reducerTemplate(state, action, Settings_HandlerMap);
};
function setBookDomain_Request(state, action) {
    if (action.type == Constants.SetBookDomain_Request) {
        var settings = new settingsModel_1.SettingsModel();
        settings.setBookDomain(action.bookDomain).then(function (message) {
            dataContainer_1.default().dispatch({
                type: Constants.SetBookDomain_Response,
                message: message,
                status: baseReducer_1.RequestStatus.Success
            });
        });
        notificationReducer_1.NotifyAsync("Load " + action.bookDomain + " starting...", common_1.DingamStyle.Secondary, true);
    }
    return __assign({}, state, { status: baseReducer_1.RequestStatus.Start });
}
function setBookDomain_Response(state, action) {
    if (action.type == Constants.SetBookDomain_Response) {
        notificationReducer_1.NotifyAsync("BookDomain: " + action.message + " was set into cookie.", common_1.DingamStyle.Success, true);
        return __assign({}, state, { status: action.status });
    }
    return __assign({}, state);
}
function setCorrectionList(state, action) {
    if (action.type !== Constants.SetCorrectionList) {
        return __assign({}, state);
    }
    if (action.addRule && action.addRule.length > 0) {
        (_a = state.corrections).push.apply(_a, action.addRule);
        return __assign({}, state);
    }
    if (!!action.deleteRuleIndex && action.deleteRuleIndex > -1) {
        state.corrections.splice(action.deleteRuleIndex, 1);
        return __assign({}, state);
    }
    return __assign({}, state);
    var _a;
}
var _a;


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
var DataProvider = /** @class */ (function () {
    function DataProvider() {
    }
    DataProvider.prototype.getSayHi = function (name) {
        return $.ajax({
            "method": "GET",
            "url": "hi?id=" + name,
            success: function (msg) { return msg; },
            error: function (e) { return "Service error " + JSON.stringify(e); },
        });
    };
    DataProvider.prototype.getbookTableOfContent = function (bookId) {
        return $.ajax({
            type: "POST",
            data: JSON.stringify({ "id": bookId }),
            contentType: "application/json",
            url: "tableOfContent",
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
            url: "book",
            success: function (data) {
                return data;
            },
        });
    };
    DataProvider.prototype.getLatestChapterNumber = function (bookId) {
        return $.ajax({
            type: "GET",
            url: "latestChapter?id=" + bookId,
            success: function (chapterNumber) { return chapterNumber.latestChapter; },
        });
    };
    DataProvider.prototype.putLastestChapterNumber = function (bookId, chapterId) {
        return $.ajax({
            type: "GET",
            url: "putChapter?id=" + bookId + "&chapter=" + chapterId,
        });
    };
    DataProvider.prototype.putBookDomain = function (bookDomain) {
        return $.ajax({
            type: "PUT",
            url: "BookDomain/" + utility_1.encodingStr(bookDomain),
            success: function () { return true; },
            error: function (err) { return false; },
        });
    };
    DataProvider.prototype.getBookMarks = function () {
        return $.ajax({
            type: "GET",
            url: "books",
        });
    };
    DataProvider.prototype.deleteBookMark = function (bookId) {
        return $.ajax({
            type: "DELETE",
            url: "bookMark\\" + bookId,
        });
    };
    return DataProvider;
}());
exports.DataProvider = DataProvider;


/***/ }),

/***/ "./src/public/script/view/NavTitle.tsx":
/*!*********************************************!*\
  !*** ./src/public/script/view/NavTitle.tsx ***!
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
Object.defineProperty(exports, "__esModule", { value: true });
var amazeui_dingtalk_1 = __webpack_require__(/*! amazeui-dingtalk */ "amazeui-dingtalk");
var React = __webpack_require__(/*! react */ "react");
var CONST = __webpack_require__(/*! ../model/constants */ "./src/public/script/model/constants.ts");
var dataContainer_1 = __webpack_require__(/*! ../model/dataContainer */ "./src/public/script/model/dataContainer.ts");
var NavTitle = /** @class */ (function (_super) {
    __extends(NavTitle, _super);
    function NavTitle(prop) {
        var _this = _super.call(this, prop) || this;
        _this.state = {
            SearchValue: "",
            showsearBar: false,
        };
        _this.onNavBarAction = _this.onNavBarAction.bind(_this);
        _this.onSearchSubmit = _this.onSearchSubmit.bind(_this);
        _this.onSearchValueChange = _this.onSearchValueChange.bind(_this);
        return _this;
    }
    NavTitle.prototype.render = function () {
        var rightNav = [{ icon: "search" }];
        return this.state.showsearBar ?
            this.createSearchBar() :
            React.createElement(amazeui_dingtalk_1.NavBar, { rightNav: rightNav, onAction: this.onNavBarAction });
    };
    NavTitle.prototype.createSearchBar = function () {
        return React.createElement(amazeui_dingtalk_1.SearchBar, { placeholder: "https://www.book.com/", cancelText: "Search", onChange: this.onSearchValueChange, onReset: this.onSearchSubmit });
    };
    NavTitle.prototype.onSearchValueChange = function (e) {
        this.setState({ SearchValue: e.target.value.trim() });
    };
    NavTitle.prototype.onSearchSubmit = function () {
        var action = {
            type: CONST.SetBookDomain_Request,
            bookDomain: this.state.SearchValue,
        };
        dataContainer_1.default().dispatch(action);
        this.setState({ showsearBar: false });
    };
    NavTitle.prototype.onNavBarAction = function (item, e) {
        this.setState({ showsearBar: true });
    };
    return NavTitle;
}(React.Component));
exports.NavTitle = NavTitle;


/***/ }),

/***/ "./src/public/script/view/SettingPage.tsx":
/*!************************************************!*\
  !*** ./src/public/script/view/SettingPage.tsx ***!
  \************************************************/
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
var baseComponent_1 = __webpack_require__(/*! ./baseComponent */ "./src/public/script/view/baseComponent.tsx");
var Constants = __webpack_require__(/*! ../model/constants */ "./src/public/script/model/constants.ts");
var amazeui_dingtalk_1 = __webpack_require__(/*! amazeui-dingtalk */ "amazeui-dingtalk");
var SettingPage = /** @class */ (function (_super) {
    __extends(SettingPage, _super);
    function SettingPage(prop) {
        var _this = _super.call(this, prop) || this;
        _this.OnContentChange = _this.OnContentChange.bind(_this);
        _this.ChangeContent = _this.ChangeContent.bind(_this);
        return _this;
    }
    SettingPage.prototype.render = function () {
        if (this.state && this.state.Corrected) {
            return React.createElement("div", null, this.state.Content);
        }
        else {
            return (React.createElement("div", null,
                React.createElement("textarea", { onChange: this.OnContentChange }),
                React.createElement(amazeui_dingtalk_1.Button, { onClick: this.ChangeContent }, "Change")));
        }
    };
    SettingPage.prototype.OnContentChange = function (e) {
        this.setState({ Content: e.target.value });
    };
    SettingPage.prototype.ChangeContent = function () {
        var result = this.state.Content;
        result = Constants.CorrectionList.reduce(function (pre, curr) {
            return pre.replace(new RegExp(curr.pattern, "gm"), curr.value);
        }, result);
        this.setState({ Content: result, Corrected: true });
    };
    return SettingPage;
}(baseComponent_1.BaseComponent));
exports.SettingPage = SettingPage;


/***/ }),

/***/ "./src/public/script/view/TableOfContents.tsx":
/*!****************************************************!*\
  !*** ./src/public/script/view/TableOfContents.tsx ***!
  \****************************************************/
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
var amazeui_dingtalk_1 = __webpack_require__(/*! amazeui-dingtalk */ "amazeui-dingtalk");
var dataContainer_1 = __webpack_require__(/*! ../model/dataContainer */ "./src/public/script/model/dataContainer.ts");
var CONST = __webpack_require__(/*! ../model/constants */ "./src/public/script/model/constants.ts");
var baseComponent_1 = __webpack_require__(/*! ./baseComponent */ "./src/public/script/view/baseComponent.tsx");
var baseReducer_1 = __webpack_require__(/*! ../model/baseReducer */ "./src/public/script/model/baseReducer.ts");
var TableOfContents = /** @class */ (function (_super) {
    __extends(TableOfContents, _super);
    function TableOfContents(prop) {
        var _this = _super.call(this, prop) || this;
        var book = dataContainer_1.default().getState().book;
        var bookId = book.bookId, table = book.table, status = book.status;
        _this.state = {
            list: status == baseReducer_1.RequestStatus.Success ? table : [],
            bookId: bookId,
        };
        _this.onListChange = _this.onListChange.bind(_this);
        return _this;
    }
    TableOfContents.prototype.componentDidMount = function () {
        this.unSubscribe.push(dataContainer_1.default().subscribe(this.onListChange));
    };
    TableOfContents.prototype.render = function () {
        var _this = this;
        var list = this.state.list &&
            this.state.list.map(function (chapter, index) {
                return React.createElement(amazeui_dingtalk_1.List.Item, { key: index, href: "#/" + chapter.Title, title: chapter.Title, onClick: _this.onTitleClick.bind(_this, chapter.Href) });
            });
        return (React.createElement("div", { className: "show-scroll-y" },
            React.createElement(amazeui_dingtalk_1.List, null, list)));
    };
    TableOfContents.prototype.onTitleClick = function (id) {
        var action = {
            type: CONST.GetContent_Request,
            chapterId: id,
            bookId: dataContainer_1.default().getState().book.bookId,
        };
        dataContainer_1.default().dispatch(action);
        this.props.onTitleClick && this.props.onTitleClick();
    };
    TableOfContents.prototype.onListChange = function () {
        var book = dataContainer_1.default().getState().book;
        var table = book.table, latestCharpter = book.latestCharpter, bookId = book.bookId, status = book.status;
        if (status == baseReducer_1.RequestStatus.Success) {
            var latest = table[latestCharpter];
            var reverseTable = table.slice().reverse();
            this.setState({
                list: latest ? [latest].concat(reverseTable) : reverseTable,
                bookId: bookId
            });
        }
    };
    return TableOfContents;
}(baseComponent_1.BaseComponent));
exports.TableOfContents = TableOfContents;


/***/ }),

/***/ "./src/public/script/view/baseComponent.tsx":
/*!**************************************************!*\
  !*** ./src/public/script/view/baseComponent.tsx ***!
  \**************************************************/
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
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.unSubscribe = [];
        return _this;
    }
    BaseComponent.prototype.componentWillUnmount = function () {
        if (this.unSubscribe) {
            this.unSubscribe.forEach(function (unSub) { return unSub(); });
        }
    };
    return BaseComponent;
}(React.Component));
exports.BaseComponent = BaseComponent;


/***/ }),

/***/ "./src/public/script/view/bookList.tsx":
/*!*********************************************!*\
  !*** ./src/public/script/view/bookList.tsx ***!
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var amazeui_dingtalk_1 = __webpack_require__(/*! amazeui-dingtalk */ "amazeui-dingtalk");
var dataContainer_1 = __webpack_require__(/*! ../model/dataContainer */ "./src/public/script/model/dataContainer.ts");
var CONST = __webpack_require__(/*! ../model/constants */ "./src/public/script/model/constants.ts");
var NavTitle_1 = __webpack_require__(/*! ./NavTitle */ "./src/public/script/view/NavTitle.tsx");
var baseComponent_1 = __webpack_require__(/*! ./baseComponent */ "./src/public/script/view/baseComponent.tsx");
var BookList = /** @class */ (function (_super) {
    __extends(BookList, _super);
    function BookList(prop) {
        var _this = _super.call(this, prop) || this;
        var bookmark = dataContainer_1.default().getState().bookMark;
        _this.state = { books: bookmark && bookmark.books };
        _this.onBookListChange = _this.onBookListChange.bind(_this);
        return _this;
    }
    BookList.prototype.componentWillMount = function () {
        this.unSubscribe.push(dataContainer_1.default().subscribe(this.onBookListChange));
    };
    BookList.prototype.componentDidMount = function () {
    };
    BookList.prototype.render = function () {
        var _this = this;
        var list = this.state.books &&
            this.state.books.map(function (book) {
                return React.createElement(amazeui_dingtalk_1.List.Item, { key: book.BookId, href: "#/" + book.BookId, title: book.Name, onClick: _this.onItemClick.bind(_this, book.BookId) });
            });
        return React.createElement("div", { className: "show-scroll-y" },
            React.createElement(amazeui_dingtalk_1.List, null,
                React.createElement(NavTitle_1.NavTitle, null),
                list,
                React.createElement(amazeui_dingtalk_1.Button, { hollow: true, noHb: true, block: true, onClick: this.refreshBookList },
                    React.createElement(amazeui_dingtalk_1.Icon, { name: "refresh" }),
                    "Refresh")));
    };
    BookList.prototype.refreshBookList = function () {
        var action = {
            type: CONST.GetBooks_Request,
        };
        dataContainer_1.default().dispatch(action);
    };
    BookList.prototype.onBookListChange = function () {
        var bookMark = dataContainer_1.default().getState().bookMark;
        var newBooks = bookMark && bookMark.books;
        if (this.state.books !== newBooks) {
            this.setState({ books: newBooks });
        }
    };
    BookList.prototype.onItemClick = function (id) {
        var action = {
            type: CONST.GetTableOfContents_Request,
            bookId: id,
        };
        dataContainer_1.default().dispatch(action);
        if (this.props.onItemClick) {
            this.props.onItemClick();
        }
    };
    return BookList;
}(baseComponent_1.BaseComponent));
exports.BookList = BookList;


/***/ }),

/***/ "./src/public/script/view/contents.tsx":
/*!*********************************************!*\
  !*** ./src/public/script/view/contents.tsx ***!
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
var dataContainer_1 = __webpack_require__(/*! ../model/dataContainer */ "./src/public/script/model/dataContainer.ts");
var baseComponent_1 = __webpack_require__(/*! ./baseComponent */ "./src/public/script/view/baseComponent.tsx");
var Contents = /** @class */ (function (_super) {
    __extends(Contents, _super);
    function Contents(prop) {
        var _this = _super.call(this, prop) || this;
        _this.state = { contents: [] };
        _this.onContentChange = _this.onContentChange.bind(_this);
        return _this;
    }
    Contents.prototype.componentWillMount = function () {
        this.unSubscribe.push(dataContainer_1.default().subscribe(this.onContentChange));
    };
    Contents.prototype.render = function () {
        var content = !this.state.contents
            && this.state.contents.length > 0 ?
            React.createElement("dt", null, "loading...")
            : this.state.contents.map(function (c, index) {
                return React.createElement("div", { key: index },
                    React.createElement("h4", null, c.Title),
                    c.Content && c.Content.map(function (p, pIndex) { return React.createElement("p", { key: pIndex }, p); }));
            });
        return React.createElement("div", { className: "test-24 show-scroll-y" }, content);
    };
    Contents.prototype.onContentChange = function () {
        var _a = dataContainer_1.default().getState(), book = _a.book, setting = _a.setting;
        var contents = book.contents;
        var corrections = setting.corrections;
        var stateFirstTitle = this.state.contents && this.state.contents[0] && this.state.contents[0].Title;
        var firstTitle = contents && contents[0] && contents[0].Title;
        if (stateFirstTitle === firstTitle) {
            return;
        }
        // relace words which in the rule list
        var result = contents.map(function (book) {
            var adjustContent = book.Content &&
                book.Content.map(function (p) { return corrections.reduce(function (pre, curr) { return pre.replace(new RegExp(curr.pattern, "gm"), curr.value); }, p); });
            return __assign({}, book, { Content: adjustContent || [] });
        });
        this.setState({ contents: result });
    };
    return Contents;
}(baseComponent_1.BaseComponent));
exports.Contents = Contents;


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
Object.defineProperty(exports, "__esModule", { value: true });
var CONST = __webpack_require__(/*! ../model/constants */ "./src/public/script/model/constants.ts");
var React = __webpack_require__(/*! react */ "react");
var notificationControl_1 = __webpack_require__(/*! ./notificationControl */ "./src/public/script/view/notificationControl.tsx");
var tabBarControl_1 = __webpack_require__(/*! ./tabBarControl */ "./src/public/script/view/tabBarControl.tsx");
var bookList_1 = __webpack_require__(/*! ./bookList */ "./src/public/script/view/bookList.tsx");
var TableOfContents_1 = __webpack_require__(/*! ./TableOfContents */ "./src/public/script/view/TableOfContents.tsx");
var dataContainer_1 = __webpack_require__(/*! ../model/dataContainer */ "./src/public/script/model/dataContainer.ts");
var contents_1 = __webpack_require__(/*! ./contents */ "./src/public/script/view/contents.tsx");
var baseComponent_1 = __webpack_require__(/*! ./baseComponent */ "./src/public/script/view/baseComponent.tsx");
var SettingPage_1 = __webpack_require__(/*! ./SettingPage */ "./src/public/script/view/SettingPage.tsx");
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage(prop) {
        var _this = _super.call(this, prop) || this;
        _this.state = {
            SearchValue: "",
        };
        _this.onTabBarClick = _this.onTabBarClick.bind(_this);
        _this.createContents = _this.createContents.bind(_this);
        _this.createTableOfContents = _this.createTableOfContents.bind(_this);
        return _this;
    }
    HomePage.prototype.componentDidMount = function () {
        var getBookAction = {
            type: CONST.GetBooks_Request,
        };
        dataContainer_1.default().dispatch(getBookAction);
    };
    HomePage.prototype.render = function () {
        return (React.createElement("div", { className: "home-page-container" },
            React.createElement(notificationControl_1.NotificationControl, null),
            React.createElement("div", { className: "home-page-content" }, this.state.Contents),
            React.createElement("div", { className: "home-page-footer" },
                React.createElement(tabBarControl_1.TabBarControl, { onClick: this.onTabBarClick }))));
    };
    HomePage.prototype.onTabBarClick = function (key) {
        switch (key) {
            case tabBarControl_1.TabCategory.Home:
                this.setState({ Contents: React.createElement(bookList_1.BookList, { onItemClick: this.createTableOfContents }) });
                break;
            case tabBarControl_1.TabCategory.Gear:
                this.setState({
                    Contents: React.createElement(SettingPage_1.SettingPage, null)
                });
                break;
            case tabBarControl_1.TabCategory.Next:
                this.setState({ Contents: undefined });
                break;
        }
    };
    HomePage.prototype.createTableOfContents = function () {
        this.setState({ Contents: React.createElement(TableOfContents_1.TableOfContents, { onTitleClick: this.createContents }) });
    };
    HomePage.prototype.createContents = function () {
        this.setState({ Contents: React.createElement(contents_1.Contents, null) });
    };
    return HomePage;
}(baseComponent_1.BaseComponent));
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

/***/ "./src/public/script/view/notificationControl.tsx":
/*!********************************************************!*\
  !*** ./src/public/script/view/notificationControl.tsx ***!
  \********************************************************/
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
var amazeui_dingtalk_1 = __webpack_require__(/*! amazeui-dingtalk */ "amazeui-dingtalk");
var common_1 = __webpack_require__(/*! ../model/common */ "./src/public/script/model/common.ts");
var dataContainer_1 = __webpack_require__(/*! ../model/dataContainer */ "./src/public/script/model/dataContainer.ts");
var constants_1 = __webpack_require__(/*! ../model/constants */ "./src/public/script/model/constants.ts");
var baseComponent_1 = __webpack_require__(/*! ./baseComponent */ "./src/public/script/view/baseComponent.tsx");
var NotificationControl = /** @class */ (function (_super) {
    __extends(NotificationControl, _super);
    function NotificationControl(prop) {
        var _this = _super.call(this, prop) || this;
        _this.state = {
            Message: _this.props.Message,
            Style: _this.props.Style || common_1.DingamStyle.Primary,
            Visible: _this.props.Message != null,
        };
        _this.onMessageChange = _this.onMessageChange.bind(_this);
        _this.closeNotification = _this.closeNotification.bind(_this);
        return _this;
    }
    NotificationControl.prototype.componentDidMount = function () {
        this.unSubscribe.push(dataContainer_1.default().subscribe(this.onMessageChange));
    };
    NotificationControl.prototype.componentWillUpdate = function () {
        var _this = this;
        if (this.state.Visible && this.props.autoDismiss === undefined || this.props.autoDismiss) {
            setTimeout(function () {
                _this.closeNotification();
            }, 3000);
        }
    };
    NotificationControl.prototype.render = function () {
        return React.createElement(amazeui_dingtalk_1.Notification, { title: this.state.Message, amStyle: this.state.Style, visible: this.state.Visible, animated: true, onDismiss: this.closeNotification });
    };
    NotificationControl.prototype.closeNotification = function () {
        var action = {
            type: constants_1.ChangeNotification,
            Message: null,
            IsVissible: false,
            Style: common_1.DingamStyle.Primary,
        };
        this.setState({ Visible: false }, function () { dataContainer_1.default().dispatch(action); });
    };
    NotificationControl.prototype.onMessageChange = function () {
        var notification = dataContainer_1.default().getState().notification;
        var NotifyMessage = notification.NotifyMessage, NotifyStyle = notification.NotifyStyle, IsVissible = notification.IsVissible;
        if (IsVissible && this.state.Message !== NotifyMessage) {
            this.setState({ Message: NotifyMessage || "", Style: NotifyStyle, Visible: !!NotifyMessage && IsVissible });
        }
    };
    return NotificationControl;
}(baseComponent_1.BaseComponent));
exports.NotificationControl = NotificationControl;


/***/ }),

/***/ "./src/public/script/view/tabBarControl.tsx":
/*!**************************************************!*\
  !*** ./src/public/script/view/tabBarControl.tsx ***!
  \**************************************************/
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
var amazeui_dingtalk_1 = __webpack_require__(/*! amazeui-dingtalk */ "amazeui-dingtalk");
var common_1 = __webpack_require__(/*! ../model/common */ "./src/public/script/model/common.ts");
var TabCategory;
(function (TabCategory) {
    TabCategory["Home"] = "home";
    TabCategory["Gear"] = "gear";
    TabCategory["Next"] = "next";
})(TabCategory = exports.TabCategory || (exports.TabCategory = {}));
var TabBarControl = /** @class */ (function (_super) {
    __extends(TabBarControl, _super);
    function TabBarControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selected: "",
        };
        _this.onClick = function (key) {
            _this.props.onClick(key);
        };
        return _this;
    }
    TabBarControl.prototype.componentWillMount = function () {
    };
    TabBarControl.prototype.render = function () {
        return (React.createElement(amazeui_dingtalk_1.TabBar, { amStyle: common_1.DingamStyle.Dark, onAction: this.onClick },
            React.createElement(amazeui_dingtalk_1.TabBar.Item, { eventKey: "home", selected: this.state.selected === "home", icon: "home", title: "home" }),
            React.createElement(amazeui_dingtalk_1.TabBar.Item, { eventKey: "gear", selected: this.state.selected === "gear", icon: "gear", title: "Settings" }),
            React.createElement(amazeui_dingtalk_1.TabBar.Item, { eventKey: "next", selected: this.state.selected === "next", icon: "pages", title: "Next" })));
    };
    return TabBarControl;
}(React.Component));
exports.TabBarControl = TabBarControl;


/***/ }),

/***/ "amazeui-dingtalk":
/*!*******************************!*\
  !*** external "AMUIDingTalk" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = AMUIDingTalk;

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

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "Redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Redux;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map