import { IClient } from "./IClient";
import { Status } from "./Status";
import { Types } from "./Types";
import { IMessage } from "./IMessage";

export class RESTClient implements IClient {
    public connect(host: string): void {
        if (this.status === Status.CONNECTED || this.status === Status.CONNECTING) {
            this.disconnect();
        }
        if (host) {
            this.host = host;
        }
        this.status = Status.CONNECTING;
        fetch(`${ this.host }/register`, { method: "GET" })
        .then((response) => response.json())
        .then((json) => {
            this.status = Status.CONNECTED;
            this.id = json.id;
        })
        .catch(this.onError);
    }

    public disconnect(): void {
        this.id = null;
        this.status = Status.DISCONNECTED;
    }

    public write(data: IMessage): void {
        if (!this.id) {
            return;
        }
        data.type = data.type || Types.LOG;
        data.time = data.time || +Date.now();
        data.params = data.params || [];
        fetch(
            this.host,
            {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "X-Client-Id": this.id
                }),
                body: JSON.stringify(data)
            }
        )
        .catch(this.onError);
    }

    private onError = (error: object) => {
        console.error(`REST Error: ${ error }`);
        this.disconnect();
    }

    private status: Status = Status.DISCONNECTED;
    private host: string = null;
    private id: string = null;
}
