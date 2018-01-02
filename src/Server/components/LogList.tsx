import * as React from "react";
import { Log, ILogProps } from "./Log";
import * as ListGroup from "react-bootstrap/lib/ListGroup";

export interface ILogListProps {
    logs: ILogProps[];
}

export class LogList extends React.Component<ILogListProps, null> {
    public static defaultProps: Partial<ILogListProps> = {
        logs: []
    };

    public render(): JSX.Element {
        return (
            <ListGroup>
                { this.logs() }
            </ListGroup>
        )
    }

    private logs(): JSX.Element[] {
        const { logs } = this.props;

        return logs.map((log: ILogProps, index: number) => (
            <Log { ...log } key={ index } />
        ));
    }
}
