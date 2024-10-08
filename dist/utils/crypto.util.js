"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignature = void 0;
//------------------------------------------------------------------------------------
const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    let bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};
//------------------------------------------------------------------------------------
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};
//------------------------------------------------------------------------------------
const importPublicKey = async (spki) => {
    const message = base64ToArrayBuffer(spki);
    const cryptoKey = await window.crypto.subtle.importKey('spki', message, { name: 'RSA-OAEP', hash: 'sha-1' }, false, ['encrypt']);
    return cryptoKey;
};
//------------------------------------------------------------------------------------
const encryptData = async (opts) => {
    const { message, publicKey } = opts;
    const enc = new TextEncoder();
    const encodedMessage = enc.encode(message);
    const encryptedData = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encodedMessage);
    const encodedData = arrayBufferToBase64(encryptedData);
    return encodedData;
};
//------------------------------------------------------------------------------------
const getSignature = async (opts) => {
    const { publicKey, environment, projectId } = opts;
    if (!publicKey || !projectId || !environment) {
        return Promise.resolve('');
    }
    const key = await importPublicKey(publicKey);
    const rs = await encryptData({
        message: JSON.stringify({ environment, projectId }),
        publicKey: key,
    });
    return rs;
};
exports.getSignature = getSignature;
