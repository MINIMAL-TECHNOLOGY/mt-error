"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMTErrorObject = exports.getGlobal = void 0;
//------------------------------------------------------------------------------------
const getGlobal = () => {
    return (typeof window !== 'undefined'
        ? window
        : typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
                ? self
                : {});
};
exports.getGlobal = getGlobal;
//------------------------------------------------------------------------------------
const getMTErrorObject = () => {
    const global = (0, exports.getGlobal)();
    if (!global.__MT_ERROR__) {
        throw new Error('Failed to get `MTErrorObject`');
    }
    return global.__MT_ERROR__;
};
exports.getMTErrorObject = getMTErrorObject;
