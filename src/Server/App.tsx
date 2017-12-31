import * as React from "react";
import { Client, IMessage } from "../Client/index";
import { Wrapper } from "./containers/Wrapper";
import { LogList } from "./components/LogList";
import { ILogProps } from "./components/Log";

interface IAppState {
    logs: any[];
}

class App extends React.Component<null, IAppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            logs: []
        };
    }

    public componentDidMount(): void {
        this.client = new Client();
        this.client.connect("/view");
        this.client.on("message", this.onMessage);
    }

    public componentWillUnMount(): void {
        this.client && this.client.disconnect();
    }

    public render() {
        return (
            <Wrapper>
                <LogList logs={ this.state.logs } />
            </Wrapper>
        );
    }

    private client: Client;
    private onMessage = (message: { id: string, data: IMessage }) => {
        const log = {
            id: message.id,
            message: message.data.message,
            type: message.data.type,
            time: message.data.time,
            params: message.data.params
        } as ILogProps;
        const { logs } = this.state;
        const logsClone = logs.slice(0);
        logsClone.push(log);
        this.setState({ logs: logsClone.slice(-20) });
    }
}

export default App;
