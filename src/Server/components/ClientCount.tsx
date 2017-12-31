import * as React from "react";
import * as Label from "react-bootstrap/lib/Label";

export interface IClientCountProps {
    count: number;
}

export class ClientCount extends React.Component<IClientCountProps, null> {
    public render(): JSX.Element {
        const { count } = this.props;

        return (
            <Label bsStyle="info">{ count } client(s)</Label>
        )
    }
}
