export declare function initializeEsbuild(): Promise<void>;
export declare function transpileCode(inputCode: string): Promise<string>;
export declare const transpileAndRun: (code?: string) => Promise<unknown>;
export declare const runCode: (code: string) => Promise<unknown>;
