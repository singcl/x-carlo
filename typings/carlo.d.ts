declare module 'carlo' {
    export interface IApp {
        on(x: string, callback: (w: Window) => void): void;
        serveFolder(str: string): void;
        exposeFunction(str: string, x: any): Promise<void>;
        load(str: string): Promise<void>;
    }

    export function launch(x?: any): Promise<IApp>;
}

interface Window {
    load(x: string): void;
}

declare module 'systeminformation' {
    export interface Info {
        battry: string;
        cpu: string;
        osInfo: string;
    }

    export function battery(): Promise<string>;
    export function cpu(): Promise<string>;
    export function osInfo(): Promise<string>;
}
