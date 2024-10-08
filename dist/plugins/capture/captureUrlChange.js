"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCaptureUrlChange = exports.captureUrlChange = void 0;
const utils_1 = require("../../utils");
const global = (0, utils_1.getGlobal)();
let lastHref;
//------------------------------------------------------------------------------------
const handleUrlChange = (from, to) => {
    const { client } = (0, utils_1.getMTErrorObject)();
    const parsedHref = (0, utils_1.parseUrl)(global?.location?.href);
    let parsedFrom = (0, utils_1.parseUrl)(from);
    const parsedTo = (0, utils_1.parseUrl)(to);
    if (!parsedFrom.path) {
        parsedFrom = parsedHref;
    }
    lastHref = to;
    let targetFrom = from;
    let targetTo = to;
    if (parsedHref.protocol === parsedTo.protocol &&
        parsedHref.host === parsedTo.host) {
        targetTo = parsedTo.relative;
    }
    if (parsedHref.protocol === parsedFrom.protocol &&
        parsedHref.host === parsedFrom.host) {
        targetFrom = parsedFrom.relative;
    }
    if (targetFrom === targetTo) {
        return;
    }
    client.addAction({
        message: `Navigation to ${to}`,
        data: { from, to },
        type: 'navigation',
    });
};
//------------------------------------------------------------------------------------
const historyReplacement = (original) => {
    return function call(data, title, url) {
        if (url) {
            handleUrlChange(lastHref, String(url));
        }
        return original.apply(this, [data, title, url]);
    };
};
//------------------------------------------------------------------------------------
const historyOriginal = {
    pushState: global?.history?.pushState,
    replaceState: global?.history?.replaceState,
    onpopstate: global?.onpopstate,
};
//------------------------------------------------------------------------------------
const historyListener = () => {
    historyOriginal.pushState = (0, utils_1.replace)(global?.history, 'pushState', historyReplacement);
    historyOriginal.replaceState = (0, utils_1.replace)(global?.history, 'replaceState', historyReplacement);
    historyOriginal.onpopstate = (0, utils_1.replace)(global, 'onpopstate', (origin) => function call(...args) {
        const current = global?.location?.href;
        handleUrlChange(lastHref, current);
        return origin?.apply(this, args);
    });
};
//------------------------------------------------------------------------------------
const hashListener = (e) => {
    const { oldURL, newURL } = e;
    handleUrlChange(oldURL, newURL);
};
//------------------------------------------------------------------------------------
const captureUrlChange = () => {
    historyListener();
    global?.addEventListener?.('hashchange', hashListener, true);
};
exports.captureUrlChange = captureUrlChange;
//------------------------------------------------------------------------------------
const removeCaptureUrlChange = () => {
    global.history.pushState = historyOriginal.pushState;
    global.history.replaceState = historyOriginal.replaceState;
    global.onpopstate = historyOriginal.onpopstate;
    global?.removeEventListener?.('hashchange', hashListener, true);
};
exports.removeCaptureUrlChange = removeCaptureUrlChange;
