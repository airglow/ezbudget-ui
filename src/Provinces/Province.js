import {Component} from "react";
import AppNavbar from "../Layout/AppNavbar";
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, useParams, useNavigate} from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} history={useNavigate()} />;
}

class Province extends Component {

    emptyItem = {
        id: '',
        code: '',
        name: ''
    };

    constructor(props) {
        super(props);

        this.state = {item: this.emptyItem};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const id = this.props.params.id;

        if (id !== 'new') {

            await fetch(`/provinces/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.ok) {
                    response.json().then(data => this.setState({item: data}));
                } else {
                    response.json().then(data => console.log(data));
                }
            });
        }
    }

    handleChange(event) {
        const {target} = event;
        const {value} = target;
        const {name} = target;
        let {item} = this.state;
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();

        const {item} = this.state;

        await fetch('/provinces' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        this.props.history('/provinces');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Province' : 'Create Province'}</h2>;
        return (
            <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="code">Code</Label>
                            <Input type="text" name="code" id="code" value={item.code || ''} onChange={this.handleChange} autoComplete="code" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={item.name || ''} onChange={this.handleChange} autoComplete="name" />
                        </FormGroup>
                        <ButtonGroup>
                            <Button type="submit" color="primary">Save</Button>
                            <Button color="secondary" tag={Link} to="/provinces">Cancel</Button>
                        </ButtonGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withParams(Province);