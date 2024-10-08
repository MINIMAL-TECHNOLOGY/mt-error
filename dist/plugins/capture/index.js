"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const captureClick_1 = require("./captureClick");
const captureUrlChange_1 = require("./captureUrlChange");
//------------------------------------------------------------------------------------
const onClickPlugin = {
    name: 'CaptureClick',
    onSetup: () => {
        (0, captureClick_1.captureClick)();
    },
    onDestroy: () => {
        (0, captureClick_1.removeCaptureClick)();
    },
};
//------------------------------------------------------------------------------------
const onUrlPlugin = {
    name: 'CaptureUrl',
    onSetup: () => {
        (0, captureUrlChange_1.captureUrlChange)();
    },
    onDestroy: () => {
        (0, captureUrlChange_1.removeCaptureUrlChange)();
    },
};
//------------------------------------------------------------------------------------
exports.plugins = [onClickPlugin, onUrlPlugin];
