import * as wslogs from "./Client/index";

let client: wslogs.IClient;
const kind = (document.currentScript as HTMLElement).dataset["kind"];
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

switch (kind) {
    case "rest":
    client = new wslogs.RESTClient();
    break;
    case "socket":
    default:
    client = new wslogs.SocketClient();
    break;
}

client.connect(host);
