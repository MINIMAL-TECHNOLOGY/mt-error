import { IClient, IConfig } from '../types';
export declare class MTError {
    private static instance;
    private _client;
    constructor(config: IConfig);
    static init(config: IConfig): IClient;
}
