"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelector = exports.getPath = exports.getParentNode = void 0;
//------------------------------------------------------------------------------------
const getParentNode = (node, path) => {
    if (!node.parentNode) {
        return;
    }
    path.push(node.parentNode);
    (0, exports.getParentNode)(node.parentNode, path);
};
exports.getParentNode = getParentNode;
//------------------------------------------------------------------------------------
const getPath = (node) => {
    const path = [];
    path.push(node);
    (0, exports.getParentNode)(node, path);
    return path;
};
exports.getPath = getPath;
//------------------------------------------------------------------------------------
const getSelector = (event) => {
    const immutableTarget = (event.target || event.srcElement);
    let target = (event.target || event.srcElement);
    const elements = [];
    for (let i = 0; target &&
        target.nodeType === Node.ELEMENT_NODE &&
        target.nodeType !== Node.DOCUMENT_TYPE_NODE; target = target.previousSibling) {
        if (i) {
            elements.push(target);
        }
        i += 1;
    }
    const path = typeof event.path === 'undefined'
        ? (0, exports.getPath)(event.target)
        : event.path;
    const { outerHTML } = immutableTarget;
    return path
        .reverse()
        .map((node) => (node.localName || '') +
        (node.id ? `#${node.id}` : '') +
        (node.className ? `.${node.className}` : '') +
        (node.outerHTML === outerHTML ? `:nth-child(${elements.length})` : ''))
        .filter((v) => Boolean(v))
        .join(' > ');
};
exports.getSelector = getSelector;
