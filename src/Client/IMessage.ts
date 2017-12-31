import { Types } from "./Types";

export interface IMessage {
    type?: Types,
    time?: number,
    params?: any[]
}
