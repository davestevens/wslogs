import * as React from "react";
import * as Grid from "react-bootstrap/lib/Grid";
import * as Row from "react-bootstrap/lib/Row";
import * as Col from "react-bootstrap/lib/Col";
import * as Navbar from "react-bootstrap/lib/Navbar";
import * as Nav from "react-bootstrap/lib/Nav";
import * as NavItem from "react-bootstrap/lib/NavItem";
import { ClientCount } from "../components/ClientCount";

interface IWrapperProps {
    clientCount: number;
}

export class Wrapper extends React.Component<IWrapperProps, null> {
    public render(): JSX.Element {
        const { clientCount, children } = this.props;

        return (
            <Grid>
                <Row style={ { marginTop: 71 } }>
                    <Navbar inverse fixedTop fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                wslogs
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                <NavItem>
                                    <ClientCount count={ clientCount } />
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
                <Row>
                    <Col xs={ 12 }>
                        { children }
                    </Col>
                </Row>
            </Grid>
        )
    }
}
