import * as wslogs from "./Client/index";

const client = new wslogs.Client();
const originalConsole = window.console || { log: () => {}, warn: () => {}, error: () => {}};
const originalConsoleLog = originalConsole.log;
const originalConsoleWarn = originalConsole.warn;
const originalConsoleError = originalConsole.error;
const host = (document.currentScript as HTMLElement).dataset["host"];

window.console.log = function(message?: any, ...optionalParams: any[]): void {
    client.write(message, { params: optionalParams });
    originalConsoleLog(message, ...optionalParams);
}

window.console.warn = function(message?: any, ...optionalParams: any[]): void {
    client.write(message, { type: wslogs.Types.WARN, params: optionalParams });
    originalConsoleWarn(message, ...optionalParams);
}

window.console.error = function(message?: any, ...optionalParams: any[]): void {
    client.write(message, { type: wslogs.Types.ERROR, params: optionalParams });
    originalConsoleError(message, ...optionalParams);
}

client.connect(host);
