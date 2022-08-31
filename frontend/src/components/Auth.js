import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        navigate('/users');
    };

    return (
        <Button variant="primary" type="submit" onSubmit={handleSubmit}>
            Login
        </Button>
    );
}

class AuthForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'username': '',
            'password': ''
        }
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.props.obtainAuthToken(this.state.username, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <Form className="mx-5" onSubmit={(event) => this.handleSubmit(event)}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" name="username" placeholder="username" value={this.state.username}
                                  onChange={(event) => this.handleChange(event)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="password" value={this.state.password}
                                  onChange={(event) => this.handleChange(event)}/>
                </Form.Group>
                <Home/>
                {/*<Button variant="primary" type="submit">*/}
                {/*    Login*/}
                {/*</Button>*/}
            </Form>
        );
    }

}

export default AuthForm;