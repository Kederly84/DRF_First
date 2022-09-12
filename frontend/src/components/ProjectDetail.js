import React from "react";
import {Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ProjectDetail = ({project, deleteProject}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th>URL</th>
                <th>Username</th>
                <th>Operations</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{project.projectName}</td>
                <td>{project.description}</td>
                <td>{project.projectUrl}</td>
                <td>{project.projectUsers ? project.projectUsers.username : project.projectUsers}</td>
                <td>
                    <Button variant="danger" onClick={() => deleteProject(project.id)} >Delete</Button>
                </td>
            </tr>
            </tbody>
        </Table>
    )
}

const ProjectsDetailList = ({projects, deleteProject}) => {
    let {projectID} = useParams();
    let filtered = projects.filter((project) => project.id === parseInt(projectID))
    return (
        <div className="justify-content-center my-2 mx-2">
            {filtered.map((project) => <ProjectDetail project={project} deleteProject={deleteProject}/>)}
        </div>
)
}

export default ProjectsDetailList