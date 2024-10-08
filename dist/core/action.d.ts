import { AnyType, IAction } from '../types';
export declare class Action implements IAction {
    readonly type: string;
    readonly timestamp: string;
    readonly message: string;
    readonly data: Record<string, AnyType>;
    constructor(opts: IAction);
}
