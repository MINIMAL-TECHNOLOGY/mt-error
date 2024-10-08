"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.device = void 0;
//------------------------------------------------------------------------------------
const device = () => {
    const rs = {};
    if (navigator) {
        rs.language = navigator.language;
        rs.userAgent = navigator.userAgent;
    }
    if (document) {
        rs.title = document.title;
        rs.referrer = document.referrer;
    }
    if (window.location) {
        rs.url = window.location.href;
    }
    return rs;
};
exports.device = device;
