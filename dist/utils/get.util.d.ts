import { MTErrorGlobal, MTErrorObject } from '../types';
export declare const getGlobal: <T = Window>() => T & MTErrorGlobal;
export declare const getMTErrorObject: <T = Window>() => MTErrorObject;
