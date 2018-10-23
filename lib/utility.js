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
