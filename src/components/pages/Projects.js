
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from '../layout/Container'
import styles from './Projects.module.css'
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"

function Projects(){

    const [projects, setProjects] = useState([])
    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        fetch("http://localhost:5000/projects",{
            method: "GET",
            headers:{
                'Content-Type':'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setProjects(data)
        })
        .catch((error) => console.log(error))
    }, [])

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && (<Message msg={message} type="success" />)}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project)=>(
                        <ProjectCard 
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        />
                    ))}
            </Container>
        </div>
    )
}

export default Projects