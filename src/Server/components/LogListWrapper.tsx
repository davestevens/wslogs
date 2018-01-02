import * as React from "react";
import { LogList, ILogListProps } from "./LogList";

export class LogListWrapper extends React.Component<ILogListProps, null> {
    public static defaultProps: Partial<ILogListProps> = {
        logs: []
    };

    public render(): JSX.Element {
        return (
            <div style={ { height: "calc(100vh - 92px)", overflowY: "scroll" } }
                 ref="container">
                <LogList { ...this.props } />
            </div>
        )
    }

    public componentWillUpdate(): void {
        const container= this.refs.container as HTMLElement;
        this.autoScroll = container.scrollTop >= (container.scrollHeight - container.offsetHeight);
    }

    public componentDidUpdate(): void {
        if (!this.autoScroll) { return; }
        const container= this.refs.container as HTMLElement;
        container.scrollTop = container.scrollHeight;
    }

    private autoScroll: boolean = false;
}
