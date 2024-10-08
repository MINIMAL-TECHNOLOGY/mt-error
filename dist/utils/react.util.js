"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorBoundaryTrace = exports.regexFilterUrl = void 0;
//------------------------------------------------------------------------------------
exports.regexFilterUrl = /http[^\n]*/;
//------------------------------------------------------------------------------------
const getErrorBoundaryTrace = (opts) => {
    const { error } = opts;
    const matches = error?.stack?.match(exports.regexFilterUrl);
    const parts = matches?.[0].split(':') ?? [];
    const filename = `${parts[0]}:${parts[1]}:${parts[2]}`;
    const lineno = parts[3];
    const colno = parts[4];
    return {
        name: error.name,
        message: error.message,
        filename,
        lineno,
        colno,
        stack: error.stack,
        location: window.location.href,
    };
};
exports.getErrorBoundaryTrace = getErrorBoundaryTrace;
