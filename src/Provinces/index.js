import {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import AppNavbar from "../Layout/AppNavbar";

class Provinces extends Component {

    constructor(props) {
        super(props);

        this.state = {provinces: [], isLoading: false};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/provinces')
            .then(response => response.json())
            .then(data => this.setState({provinces: data}));
    }

    async remove(id) {

        this.setState({isLoading: true});

        await fetch(`/provinces/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                let updatedProvinces = this.state.provinces.filter(i => i.id !== id);
                this.setState({provinces: updatedProvinces});
            } else {
                response.json().then(data => console.log(data));
            }
            this.setState({isLoading: false});
        });
    }

    render() {
        const {provinces, isLoading} = this.state;

        if (isLoading) {
            return (
                <div>
                    <AppNavbar />
                    <Container fluid>
                        <div className="float-end">
                            <Button color="success" tag={Link} to="/provinces/new">Create Province</Button>
                        </div>
                        <h3>Loading...</h3>
                    </Container>
                </div>
            );
        }

        const provinceList = provinces.map(province => {
            return <tr key={province.id}>
                <td>{province.code}</td>
                <td>{province.name}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/provinces/" + province.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(province.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <div className="float-end">
                        <Button color="success" tag={Link} to="/provinces/new">Create Province</Button>
                    </div>
                    <h3>Provinces</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {provinceList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Provinces;
