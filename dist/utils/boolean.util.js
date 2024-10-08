"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConfigValid = exports.isEvent = void 0;
//------------------------------------------------------------------------------------
const isEvent = (eventLike) => {
    return Boolean(eventLike?.isEvent);
};
exports.isEvent = isEvent;
//------------------------------------------------------------------------------------
const isConfigValid = (config) => {
    return config.publicKey && config.endpoint && config.projectId;
};
exports.isConfigValid = isConfigValid;
