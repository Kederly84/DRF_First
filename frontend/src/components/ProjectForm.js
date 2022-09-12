import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'projectName': '',
            'description': '',
            'projectUrl': '',
            'projectUsers': props.users[0].id
        }
        console.log(this.props)
    }



    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })

    }



    handleUsersSelect(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'projectUsers': this.props.users[0].id
            })
            return;
        }

        let projectUsers = this.props.users[0].id

        for(let option of event.target.selectedOptions) {
            projectUsers = option.value
        }

        this.setState({
            'projectUsers': projectUsers
        })
    }

    handleSubmit(event) {
        this.props.createProject(
            this.state.projectName,
            this.state.description,
            this.state.projectUrl,
            this.state.projectUsers
        )
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="projectName" placeholder="projectName" value={this.state.projectName} onChange={(event) => this.handleChange(event)} />
                    <input type="text" name="description" placeholder="description" value={this.state.description} onChange={(event) => this.handleChange(event)} />
                    <input type="text" name="projectUrl" placeholder="projectUrl" value={this.state.projectUrl} onChange={(event) => this.handleChange(event)} />
                    <select name="projectUsers" onChange={(event) => this.handleUsersSelect(event)} >
                        {this.props.users.map((user) => <option value={user.id}> {user.username} </option> )}
                    </select>
                    <input type="submit" className="btn btn-primary" value="Create" />
                </form>
            </div>
        )
    }
}

export default ProjectForm;