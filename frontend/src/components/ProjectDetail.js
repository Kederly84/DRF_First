import React from "react";
import {Table} from "react-bootstrap";
import {useParams} from "react-router-dom";

const ProjectDetail = ({project}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th>URL</th>
                <th>Username</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{project.projectName}</td>
                <td>{project.description}</td>
                <td>{project.projectUrl}</td>
                <td>{project.projectUsers.username}</td>
            </tr>
            </tbody>
        </Table>
    )
}

const ProjectsDetailList = ({projects}) => {
    let { projectID } = useParams();
    let filtered = projects.filter((project) => project.id === parseInt(projectID))
    return (
        <div className="justify-content-center my-2 mx-2">
            {filtered.map((project) => <ProjectDetail project={project} />)}
        </div>
    )
}

export default ProjectsDetailList