import { IMessage } from "./IMessage";

export interface IClient {
    connect(host: string): void;
    disconnect(): void;
    write(data: IMessage): void
}
