var Abe;
(function (Abe) {
    var Client;
    (function (Client) {
        var dataProvider = (function () {
            function dataProvider() {
            }
            dataProvider.prototype.getbookTableOfContent = function (bookUrl) {
                return $.ajax({
                    type: "POST",
                    data: JSON.stringify({ "url": bookUrl }),
                    contentType: "application/json",
                    url: "tableOfContent",
                    success: function (data) {
                        return data;
                    },
                });
            };
            dataProvider.prototype.getbookContent = function (bookUrl, bookId, chapterId) {
                return $.ajax({
                    type: "POST",
                    data: JSON.stringify({ "url": bookUrl, "bookId": bookId, "chapterId": chapterId }),
                    contentType: "application/json",
                    url: "book",
                    success: function (data) {
                        return data;
                    },
                });
            };
            dataProvider.prototype.getLatestChapertNumber = function (bookId) {
                return $.ajax({
                    type: "GET",
                    url: "latestChapter?id=" + bookId,
                    success: function (chapterNumber) { return chapterNumber; },
                });
            };
            dataProvider.prototype.putLastestChapterNumber = function (bookId, chapterId) {
                return $.ajax({
                    type: "GET",
                    url: "putChapter?id=" + bookId + "&chapter=" + chapterId,
                });
            };
            dataProvider.prototype.getBookMark = function (rootUrl) {
                return $.ajax({
                    type: "GET",
                    url: "books?id=" + encodeURIComponent(rootUrl),
                });
            };
            return dataProvider;
        }());
        Client.dataProvider = dataProvider;
    })(Client = Abe.Client || (Abe.Client = {}));
})(Abe || (Abe = {}));
//# sourceMappingURL=DataProvider.js.map