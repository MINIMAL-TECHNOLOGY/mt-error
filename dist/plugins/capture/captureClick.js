"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCaptureClick = exports.captureClick = void 0;
const utils_1 = require("../../utils");
const global = (0, utils_1.getGlobal)();
//------------------------------------------------------------------------------------
const listener = (e) => {
    if (e.target) {
        const { client } = (0, utils_1.getMTErrorObject)();
        const { tagName, id, className, name, src, nodeType } = e.target;
        if (tagName.toUpperCase() !== 'HTML' &&
            tagName.toUpperCase() !== 'BODY') {
            const selector = (0, utils_1.getSelector)(e);
            client.addAction({
                message: `Click ${tagName}`,
                data: {
                    tagName,
                    id: id || undefined,
                    className: className || undefined,
                    name: name || undefined,
                    src: src || undefined,
                    nodeType: nodeType || undefined,
                    selector: selector || undefined,
                },
                type: 'click',
            });
        }
    }
};
//------------------------------------------------------------------------------------
const captureClick = () => {
    global?.document?.addEventListener?.('click', listener, true);
};
exports.captureClick = captureClick;
//------------------------------------------------------------------------------------
const removeCaptureClick = () => {
    global?.document?.removeEventListener?.('click', listener, true);
};
exports.removeCaptureClick = removeCaptureClick;
