"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTError = void 0;
const plugins_1 = require("../plugins");
const utils_1 = require("../utils");
const client_1 = require("./client");
//------------------------------------------------------------------------------------
class MTError {
    static instance;
    _client = null;
    //------------------------------------------------------------------------------------
    constructor(config) {
        if (!(0, utils_1.isConfigValid)(config)) {
            console.info('%c MT Error %c initialization failed', 'background:#af5f5f; color: #FFF', 'background:transparent');
            return;
        }
        const global = (0, utils_1.getGlobal)();
        //------------------------------------------------------------------------------------
        const destroy = () => {
            this._client = null;
            global.__MT_ERROR__ = undefined;
        };
        //------------------------------------------------------------------------------------
        const client = new client_1.Client({ config, device: utils_1.device, destroy });
        client.registerSignature();
        client.use(plugins_1.plugins);
        global.__MT_ERROR__ = { client };
        this._client = client;
        console.info('%c MT Error %c initialized', 'background:#af5f5f; color: #FFF', 'background:transparent');
    }
    //------------------------------------------------------------------------------------
    static init(config) {
        if (!this.instance) {
            this.instance = new MTError(config);
        }
        return this.instance._client;
    }
}
exports.MTError = MTError;
