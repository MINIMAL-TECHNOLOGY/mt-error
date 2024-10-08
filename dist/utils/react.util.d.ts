export declare const regexFilterUrl: RegExp;
export declare const getErrorBoundaryTrace: (opts: {
    error: Error;
}) => {
    name: string;
    message: string;
    filename: string;
    lineno: string;
    colno: string;
    stack: string;
    location: string;
};
