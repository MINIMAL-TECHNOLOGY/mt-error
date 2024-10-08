import { IAction, IDevice, IEvent, TEnvironment } from '../types';
export declare class Event<T> implements IEvent<T> {
    readonly actions?: IAction[];
    readonly appType?: string;
    readonly appVersion?: string;
    readonly trace: T;
    readonly device: IDevice;
    readonly environment?: TEnvironment;
    readonly projectId: string | number;
    readonly signature: string;
    readonly eventType: string;
    constructor(event: IEvent<T>);
    get isEvent(): boolean;
}
