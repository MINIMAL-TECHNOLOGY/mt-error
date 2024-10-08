import { AnyType } from '../types';
export declare const replace: (source: AnyType, name: string, behavior: (...args: AnyType[]) => AnyType) => any;
export declare const parseUrl: (url: string) => {
    host?: string;
    path?: string;
    protocol?: string;
    relative?: string;
};
