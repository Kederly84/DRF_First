import React from 'react'
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";



const ProjectItem = ({project}) => {
    return (
        <Card class="card col-sm-12 col-md-6 col-lg-4 border-1 mx-1 py-2 my-1 text-center" style={{ width: '18rem'}}>
            <Card.Body>
                <Card.Title>{project.projectName}</Card.Title>
                <Card.Text>
                    {project.description}
                </Card.Text>
                <Link to={`${project.id}`}>Подробнее</Link>
            </Card.Body>
        </Card>
    );
}


const ProjectsList = ({projects}) => {
    return  (
        <div className="row justify-content-center my-1">
            {projects.map((project) => <ProjectItem project={project}/>)}
        </div>
    )

}
export default ProjectsList;