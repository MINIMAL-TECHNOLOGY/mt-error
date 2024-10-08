"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const action_1 = require("./action");
const event_1 = require("./event");
//------------------------------------------------------------------------------------
class _Client {
    _config;
    _actions;
    _plugins;
    _device;
    _destroy;
    _signature;
    //------------------------------------------------------------------------------------
    constructor(opts) {
        const { config, device, destroy } = opts;
        this._config = config;
        this._device = device;
        this._destroy = destroy;
        this._plugins = [];
        this._actions = [];
        this._signature = '';
    }
    //------------------------------------------------------------------------------------
    use(plugins) {
        plugins.forEach((helper) => helper.onSetup?.(this));
        this._plugins.push(...plugins);
        return this;
    }
    //------------------------------------------------------------------------------------
    async registerSignature() {
        const { publicKey, environment, projectId } = this._config;
        try {
            this._signature = await (0, utils_1.getSignature)({
                publicKey,
                environment,
                projectId,
            });
        }
        catch (err) {
            console.error('[ERROR][REGISTER_SIGNATURE]', err);
        }
    }
    //------------------------------------------------------------------------------------
    destroy() {
        console.info('%c MT Error %c has been destroyed', 'background:#af5f5f; color: #fff', 'background:transparent');
        this._plugins.forEach((helper) => helper.onDestroy?.(this));
        return this._destroy();
    }
    //------------------------------------------------------------------------------------
    // Create an event
    // Return a data body containing device actions and other information
    createEvent(values) {
        const { appVersion, appType, environment, projectId } = this._config;
        return new event_1.Event({
            actions: this._actions,
            appType,
            appVersion,
            trace: values.trace,
            device: this._device(this),
            environment,
            projectId,
            signature: this._signature,
            eventType: values.eventType,
        });
    }
    //------------------------------------------------------------------------------------
    // Used to trigger the reporting of event
    notify(eventLike) {
        let event;
        if (Boolean(eventLike) && !(0, utils_1.isEvent)(eventLike)) {
            event = this.createEvent(eventLike);
        }
        else {
            event = eventLike;
        }
        const endpoint = this._config.endpoint;
        return new Promise((resolve, reject) => {
            if (!event) {
                return reject(new Error('Event is not valid'));
            }
            fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event),
            })
                .then((res) => {
                resolve(res);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    //------------------------------------------------------------------------------------
    // Add an action.
    // Once the threshold is reached, the oldest actions will be deleted.
    addAction(opts) {
        const actions = this._actions;
        const timestamp = new Date().toISOString();
        const action = new action_1.Action({ ...opts, timestamp });
        const maxActions = this._config.maxActions ?? constants_1.defaultConfig.maxActions;
        if (maxActions > 0) {
            if (actions.length >= maxActions) {
                actions.shift();
            }
            actions.push(action);
        }
    }
}
//------------------------------------------------------------------------------------
exports.Client = _Client;
