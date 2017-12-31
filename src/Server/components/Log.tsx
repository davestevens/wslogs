import * as React from "react";
import { Types } from "../../Client/index";
import * as ListGroupItem from "react-bootstrap/lib/ListGroupItem";

export interface ILogProps {
    id: string;
    type: Types;
    time: number;
    message: string;
    params: any[];
}

const CLASS_LOOKUP = {
    [Types.LOG]: "info",
    [Types.WARN]: "warning",
    [Types.ERROR]: "danger"
};

export class Log extends React.Component<ILogProps, null> {
    public render(): JSX.Element {
        const { id, type, time, message, params } = this.props;
        return (
            <ListGroupItem bsStyle={ CLASS_LOOKUP[type] }
                           header={ message }>
                { JSON.stringify(params) }
                <br />
                { this.prettyPrintTime() } - { id }
            </ListGroupItem>
        )
    }

    private prettyPrintTime(): string {
        const { time } = this.props;
        const date = new Date(time);
        return date.toLocaleString();
    }
}
