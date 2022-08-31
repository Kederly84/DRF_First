import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import NavigationBar from "./components/navbar";
import Footer from "./components/footer";
import UsersList from "./components/UsersList";
import ProjectsList from "./components/ProjectList";
import NotesList from "./components/NotesList";
import ProjectsDetailList from "./components/ProjectDetail";
import axios from "axios";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AuthForm from "./components/Auth";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': ''
        }
    }

    obtainAuthToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-auth-token/', {
                'username': username,
                'password': password
            })
            .then(response => {
                const token = response.data.token
                console.log('token:', token)
                localStorage.setItem('token', token)
                this.setState({
                    'token': token,
                }, this.getData)
            })
            .catch(error => console.log(error))
    }

    isAuth() {
        return !!this.state.token
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData)
    }

    getHeaders() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getData() {
        let headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users/users/', {headers})
            .then(response => {
                    const users = response.data.results
                    this.setState(
                        {
                            'users': users
                        }
                    )
                }
            ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/project/', {headers})
            .then(response => {
                    const projects = response.data.results
                    this.setState(
                        {
                            'projects': projects
                        }
                    )
                }
            ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/todo/', {headers})
            .then(response => {
                    const notes = response.data.results
                    this.setState(
                        {
                            'notes': notes
                        }
                    )
                }
            ).catch(error => console.log(error))
    }

    logOut() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.getData)
    }


    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Navbar sticky="top" bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand className="me-auto" href="/">My App</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/users">Users</Nav.Link>
                                    <Nav.Link href="/projects">Projects</Nav.Link>
                                    <Nav.Link href="/notes">Notes</Nav.Link>
                                    {this.isAuth() ? <Nav.Link onClick={() => this.logOut()}>Logout</Nav.Link> :
                                        <Nav.Link href='/login'>Login</Nav.Link>}
                                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/users'/>}/>
                        <Route exact path='/users' element={<UsersList users={this.state.users}/>}/>
                        <Route exact path='/notes' element={<NotesList notes={this.state.notes}/>}/>
                        <Route exact path='/login' element={<AuthForm obtainAuthToken={(username, password) => this.obtainAuthToken(username, password)}/>}/>
                        <Route path='/projects'>
                            <Route index element={<ProjectsList projects={this.state.projects}/>}/>
                            <Route path=':projectID' element={<ProjectsDetailList projects={this.state.projects}/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
