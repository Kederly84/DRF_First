import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
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
import ProjectForm from "./components/ProjectForm";
import NoteForm from "./components/NoteForm";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const InterfaceStub = ({gotUsers, children}) => {
    if (gotUsers.length) {
        return (<div>{children}</div>)
    }
    return (<div>loading users</div>)
}

const InterfaceStubNotes = ({gotUsers, gotProjects, children}) => {
    if (gotUsers.length && gotProjects.length) {
        return (<div>{children}</div>)
    }
    return (<div>loading data</div>)
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': '',
            'redirect': false
        }
    }

    createProject(projectName, description, projectUrl, projectUsers) {
        let headers = this.getHeaders()
        axios
            .post('http://127.0.0.1:8000/api/todo/project/', {
                'projectName': projectName,
                'description': description,
                'projectUrl': projectUrl,
                'projectUsers': projectUsers
            }, {headers})
            .then(response => {
                this.setState({
                    'redirect': '/projects'
                }, this.getData)
            })
            .catch(error => {
                console.log(error)
            })
    }

    createNote(noteProject, noteHeader, noteText, noteUser) {
        let headers = this.getHeaders()
        axios
            .post('http://127.0.0.1:8000/api/todo/todo/', {
                'noteProject': noteProject,
                'noteHeader': noteHeader,
                'noteText': noteText,
                'noteUser': noteUser
            }, {headers})
            .then(response => {
                this.setState({
                    'redirect': '/notes'
                }, this.getData)
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteProject(projectID) {
        let headers = this.getHeaders()
        axios
            .delete(`http://127.0.0.1:8000/api/todo/project/${projectID}/`, {headers})
            .then(response => {
                this.setState({
                    'redirect': '/projects'
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteNote(noteID) {
        let headers = this.getHeaders()
        axios
            .delete(`http://127.0.0.1:8000/api/todo/todo/${noteID}/`, {headers})
            .then(response => {
                this.setState({
                    'redirect': '/projects'
                })
            })
            .catch(error => {
                console.log(error)
            })
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

    searchProjects(namePart) {
        let headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/todo/project/', {headers})
            .then(response => {
                if (namePart !== null && namePart !== "") {
                    this.setState({'projects': this.state.projects.filter((project) => project.projectName.includes(namePart))})
                } else {
                    this.setState({'projects': response.data.results})
                }
            }).catch(error => {
            console.log(error)
            this.setState({'projects': []})
        })
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
                                        <NavDropdown.Item href="/create_project">Create Project</NavDropdown.Item>
                                        <NavDropdown.Item href="/create_note">
                                            Create Note
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#">Something</NavDropdown.Item>
                                    </NavDropdown>
                                    <Form className="d-flex" onSubmit={(event) => {
                                        event.preventDefault()
                                        this.searchProjects(document.getElementById("searchProjects").value)
                                    }}>
                                        <Form.Control
                                            type="search"
                                            placeholder="Search project"
                                            className="me-2"
                                            aria-label="Search"
                                            id="searchProjects"
                                        />
                                        <Button variant="outline-success" type="submit">Search</Button>
                                    </Form>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/users'/>}/>
                        <Route exact path='/users' element={<UsersList users={this.state.users}/>}/>
                        <Route exact path='/notes' element={<NotesList notes={this.state.notes}
                                                                       deleteNote={(noteID) => this.deleteNote(noteID)}/>}/>
                        <Route exact path='/login' element={<AuthForm
                            obtainAuthToken={(username, password) => this.obtainAuthToken(username, password)}/>}/>
                        <Route exact path='/create_project'
                               element={<InterfaceStub gotUsers={this.state.users}> <ProjectForm
                                   users={this.state.users}
                                   createProject={(projectName, description, projectUrl, projectUsers) => this.createProject(projectName, description, projectUrl, projectUsers)}/></InterfaceStub>}/>
                        <Route exact path='/create_note' element={<InterfaceStubNotes gotUsers={this.state.users}
                                                                                      gotProjects={this.state.projects}>
                            <NoteForm projects={this.state.projects} users={this.state.users}
                                      createProject={(noteProject, noteHeader, noteText, noteUser) => this.createNote(noteProject, noteHeader, noteText, noteUser)}/></InterfaceStubNotes>}/>
                        <Route path='/projects'>
                            <Route index element={<ProjectsList projects={this.state.projects}/>}/>
                            <Route path=':projectID' element={<ProjectsDetailList projects={this.state.projects}
                                                                                  deleteProject={(projectID) => this.deleteProject(projectID)}/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
