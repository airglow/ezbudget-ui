import {Component} from "react";
import {Navbar, NavbarBrand} from "reactstrap";
import {Link} from "react-router-dom";

class AppNavbar extends Component {
    render() {
        return (
            <Navbar color="dark" dark>
                <NavbarBrand tag={Link} to="/">Dashboard</NavbarBrand>
            </Navbar>
        );
    }
}

export default AppNavbar;