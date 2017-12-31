import * as React from "react";
import * as Grid from "react-bootstrap/lib/Grid";
import * as Row from "react-bootstrap/lib/Row";
import * as Col from "react-bootstrap/lib/Col";
import * as Navbar from "react-bootstrap/lib/Navbar";

export class Wrapper extends React.Component<null, null> {
    public render(): JSX.Element {
        const { children } = this.props;
        return (
            <Grid>
                <Row style={ { marginTop: 71 } }>
                    <Navbar inverse fixedTop fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">wslogs</a>
                            </Navbar.Brand>
                        </Navbar.Header>
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
