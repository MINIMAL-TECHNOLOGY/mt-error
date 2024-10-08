import { AnyType, IConfig, IEvent } from '../types';
export declare const isEvent: (eventLike: AnyType) => eventLike is IEvent<AnyType>;
export declare const isConfigValid: (config: IConfig) => string | number;
