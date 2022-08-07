import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import BasicExample from "./components/navbar";
import Footer from "./components/footer";
import UsersList from "./components/UsersList";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                    const users = response.data
                    this.setState(
                        {
                            'users': users
                        }
                    )
                }
            ).catch(error => console.log(error))
    }


    render() {
        return (
            <div className="App">
                <BasicExample/>
                <div>
                    <UsersList users={this.state.users}/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default App;
