import React from "react";


class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'noteProject': props.projects[0].id,
            'noteHeader': '',
            'noteText': '',
            'noteUser': props.users[0].id
        }
        console.log(this.props)
    }



    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })

    }



    // handleUsersSelect(event) {
    //     if (!event.target.selectedOptions) {
    //         this.setState({
    //             'projectUsers': this.props.users[0].id
    //         })
    //         return;
    //     }
    //
    //     let projectUsers = this.props.users[0].id
    //
    //     for(let option of event.target.selectedOptions) {
    //         projectUsers = option.value
    //     }
    //
    //     this.setState({
    //         'projectUsers': projectUsers
    //     })
    // }

    handleSubmit(event) {
        this.props.createProject(
            this.state.noteProject,
            this.state.noteHeader,
            this.state.noteText,
            this.state.noteUser
        )
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="noteHeader" placeholder="noteHeader" value={this.state.noteHeader} onChange={(event) => this.handleChange(event)} />
                    <input type="text" name="noteText" placeholder="noteText" value={this.state.noteText} onChange={(event) => this.handleChange(event)} />
                    <select name="noteUser" onChange={(event) => this.handleChange(event)} >
                        {this.props.users.map((user) => <option value={user.id}> {user.username} </option> )}
                    </select>
                    <select name="noteProject" onChange={(event) => this.handleChange(event)} >
                        {this.props.projects.map((project) => <option value={project.id}> {project.projectName} </option> )}
                    </select>
                    <input type="submit" className="btn btn-primary" value="Create" />
                </form>
            </div>
        )
    }
}

export default NoteForm;