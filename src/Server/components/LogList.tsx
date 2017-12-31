import * as React from "react";
import { Log, ILogProps } from "./Log";
import * as ListGroup from "react-bootstrap/lib/ListGroup";

interface ILogListProps {
    logs: ILogProps[];
}

export class LogList extends React.Component<ILogListProps, null> {
    public static defaultProps: Partial<ILogListProps> = {
        logs: []
    };

    public render(): JSX.Element {
        const { logs } = this.props;

        return (
            <ListGroup>
                {
                    logs.map((log: ILogProps, index: number) => (
                        <Log { ...log } key={ index } />
                    ))
                }
            </ListGroup>
        )
    }
}
