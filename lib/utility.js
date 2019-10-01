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
