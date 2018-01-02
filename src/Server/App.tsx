import * as React from "react";
import { Client, IMessage } from "../Client/index";
import { Wrapper } from "./containers/Wrapper";
import { LogListWrapper } from "./components/LogListWrapper";
import { ILogProps } from "./components/Log";

interface IAppState {
    clientCount: number;
    logs: any[];
}

class App extends React.Component<null, IAppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            clientCount: 0,
            logs: []
        };
    }

    public componentDidMount(): void {
        this.client = new Client();
        this.client.connect("/view");
        this.client.on("clientCount", this.onClientCount);
        this.client.on("message", this.onMessage);
    }

    public componentWillUnMount(): void {
        this.client && this.client.disconnect();
    }

    public render(): JSX.Element {
        const { clientCount, logs } = this.state;

        return (
            <Wrapper clientCount={ clientCount }>
                <LogListWrapper logs={ logs } />
            </Wrapper>
        );
    }

    private client: Client;

    private onClientCount = (clientCount: number): void => {
        this.setState({ clientCount });
    }

    private onMessage = (message: { id: string, data: IMessage }): void => {
        const { logs } = this.state;
        const logsClone = logs.slice(0);
        logsClone.push(this.messageToLog(message));
        this.setState({ logs: logsClone });
    }

    private messageToLog(message: { id: string, data: IMessage }): ILogProps {
        return {
            id: message.id,
            message: message.data.message,
            type: message.data.type,
            time: message.data.time,
            params: message.data.params
        } as ILogProps;
    }
}

export default App;
