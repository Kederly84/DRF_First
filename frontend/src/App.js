import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from "./components/navbar";
import Footer from "./components/footer";
import UsersList from "./components/UsersList";
import ProjectsList from "./components/ProjectList";
import NotesList from "./components/NotesList";
import ProjectsDetailList from "./components/ProjectDetail";
import axios from "axios";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/users/')
            .then(response => {
                    const users = response.data.results
                    this.setState(
                        {
                            'users': users
                        }
                    )
                }
            ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/project/')
            .then(response => {
                    const projects = response.data.results
                    this.setState(
                        {
                            'projects': projects
                        }
                    )
                }
            ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo/todo/')
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


    render() {
        return (
            <div className="App">
                <NavigationBar/>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<Navigate to='/users' />} />
                        <Route exact path='/users' element={<UsersList users={this.state.users} />} />
                        <Route exact path='/notes' element={<NotesList notes={this.state.notes} />} />
                        <Route path='/projects'>
                            <Route index element={<ProjectsList projects={this.state.projects} />} />
                            <Route path=':projectID' element={<ProjectsDetailList projects={this.state.projects} />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
