import * as React from "react";
import { Types } from "../../Client/index";
import * as ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import * as Badge from "react-bootstrap/lib/Badge";

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
        const { id, type } = this.props;
        return (
            <ListGroupItem bsStyle={ CLASS_LOOKUP[type] }>
                <em>{ this.printTime() }</em> : { this.printMessage() }
                <Badge pullRight>{ id }</Badge>
            </ListGroupItem>
        )
    }

    private printTime(): string {
        const { time } = this.props;
        const date = new Date(time);
        return date.toISOString();
    }

    private printMessage(): string {
        const { message, params } = this.props;
        return `${ message } ${ params.join(" ") }`;
    }
}
