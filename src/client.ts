import * as wslogs from "./Client/index";

const client = new wslogs.Client();
const host = (document.currentScript as HTMLElement).dataset["host"];

const console = (((originalConsole: { log: Function, warn: Function, error: Function}) => ({
    log: (message?: any, ...optionalParams: any[]) => {
        originalConsole.log(message, ...optionalParams);
        client.write({ message, params: optionalParams });
    },
    warn: (message?: any, ...optionalParams: any[]) => {
        originalConsole.warn(message, ...optionalParams);
        client.write({ message, type: wslogs.Types.WARN, params: optionalParams });
    },
    error: (message?: any, ...optionalParams: any[]) => {
        originalConsole.error(message, ...optionalParams);
        client.write({ message, type: wslogs.Types.ERROR, params: optionalParams });
    }
}))((window as any).console));

(window as any).console = console;

client.connect(host);
