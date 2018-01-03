import * as io from "socket.io-client";
import { IClient } from "./IClient";
import { Status } from "./Status";
import { Types } from "./Types";
import { IMessage } from "./IMessage";

export class SocketClient implements IClient {
    public on: any;

    public connect(host: string): void {
        if (this.status === Status.CONNECTED || this.status === Status.CONNECTING) {
            this.disconnect();
        }
        if (host) {
            this.host = host;
        }
        this.status = Status.CONNECTING;
        this.socket = io(this.host);
        this.on = this.socket.on.bind(this.socket);
        this.socket.on("connect", this.onConnect);
        this.socket.on("reconnect", this.onConnect);
        this.socket.on("reconnecting", this.onReconnecting);
        this.socket.on("disconnect", this.onDisconnect);
        this.socket.on("error", this.onError);
    }

    public disconnect(): void {
        this.socket && this.socket.disconnect();
        this.socket = null;
        this.status = Status.DISCONNECTED;
    }

    public write(data: IMessage): void {
        if (!this.socket) {
            return;
        }
        data.type = data.type || Types.LOG;
        data.time = data.time || +Date.now();
        data.params = data.params || [];
        this.socket.emit("message", data);
    }

    private onConnect = () => {
        this.status = Status.CONNECTED;
    }

    private onReconnecting = () => {
        this.status = Status.CONNECTING;
    }

    private onDisconnect = () => {
        this.socket = null;
        this.disconnect();
    }

    private onError = (error: object) => {
        console.error(`Socket Error: ${ error }`);
        this.disconnect();
    }

    private status: Status = Status.DISCONNECTED;
    private host: string = null;
    private socket: SocketIOClient.Socket = null;
}
