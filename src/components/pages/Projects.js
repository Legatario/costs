
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from '../layout/Container'
import styles from './Projects.module.css'
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        setTimeout(()=>{
            fetch("http://localhost:5000/projects",{
                method: "GET",
                headers:{
                    'Content-Type':'application/json',
                },
            })
            .then(res => res.json())
            .then(data => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((error) => console.log(error))
        },300)
    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
                method: "DELETE",
                headers:{
                    'Content-Type':'application/json',
                },
            })
            .then(res => res.json())
            .then(() =>{
                setProjects(projects.filter((project) => project.id !==id))
                setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((error)=>console.log(error))
    }    
    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && (<Message msg={message} type="success" />)}
            {projectMessage && (<Message msg={projectMessage} type="alert" />)}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project)=>(
                        <ProjectCard 
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                        />
                    ))}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}

            </Container>
        </div>
    )
}

export default Projects