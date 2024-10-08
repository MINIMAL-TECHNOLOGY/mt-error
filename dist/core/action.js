"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
class Action {
    type;
    timestamp;
    message;
    data;
    constructor(opts) {
        const { type, message, data, timestamp } = opts;
        this.type = type;
        this.timestamp = timestamp;
        this.message = message;
        this.data = data;
    }
}
exports.Action = Action;
