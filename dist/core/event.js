"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
//------------------------------------------------------------------------------------
class Event {
    actions;
    appType;
    appVersion;
    trace;
    device;
    environment;
    projectId;
    signature;
    eventType;
    //------------------------------------------------------------------------------------
    constructor(event) {
        const { actions, appType, appVersion, trace, device, environment, projectId, signature, eventType, } = event;
        this.actions = actions;
        this.appType = appType;
        this.appVersion = appVersion;
        this.trace = trace;
        this.device = device;
        this.environment = environment;
        this.projectId = projectId;
        this.signature = signature;
        this.eventType = eventType;
    }
    //------------------------------------------------------------------------------------
    get isEvent() {
        return true;
    }
}
exports.Event = Event;
