"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrl = exports.replace = void 0;
//------------------------------------------------------------------------------------
const replace = (source, name, behavior) => {
    if (!(name in source)) {
        return;
    }
    const original = source[name];
    const wrapped = behavior(original);
    source[name] = wrapped;
    return original;
};
exports.replace = replace;
//------------------------------------------------------------------------------------
const parseUrl = (url) => {
    if (typeof url !== 'string') {
        return {};
    }
    const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!match) {
        return {};
    }
    const query = match[6] || '';
    const fragment = match[8] || '';
    return {
        host: match[4],
        path: match[5],
        protocol: match[2],
        relative: match[5] + query + fragment,
    };
};
exports.parseUrl = parseUrl;
