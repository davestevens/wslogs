import { Types } from "./Types";

export interface IMessage {
    message: string;
    type?: Types;
    time?: number;
    params?: any[];
}
