import {Component} from "react";
import {Container} from "reactstrap";
import {Link} from "react-router-dom";
import AppNavbar from "../Layout/AppNavbar";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <Link to="/provinces">Provinces</Link>
                </Container>
            </div>
        );
    }
}

export default Dashboard;