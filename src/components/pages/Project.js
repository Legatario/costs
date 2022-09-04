import styles from './Project.module.css' 

import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message  from '../layout/Message'
import ProjectForm from '../project/ProjectForm'

function Project(){
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(()=>{
       setTimeout(() =>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json'
            },
        })
        .then((res)=> res.json())
        .then((data)=>{
            setProject(data)
        })
        .catch((err)=> console.log(err))
       }, 300)
    }, [id])

function toggleProjectForm(){
    setShowProjectForm(!showProjectForm)
}

function editPost(project){
    if(project.budget < project.cost){
        setMessage('O orçamento não pode ser menor que o custo do projeto')
        setType('error')
        return false
    }
    fetch(`http://localhost:5000/projects/${id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(project),
    })
    .then((res)=>res.json())
    .then((data)=>{
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto Atualizado!')
        setType('success')
    })
    .catch((error)=>console.log(error))
}

    return (
        <>
        {project.name ? (
            <div className={styles.projectDetails}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.detailsContainer}>
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toggleProjectForm} className={styles.btn}>{!showProjectForm ? 'Editar' : 'Fechar'}</button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total de Ultilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ):(
                            <div className={styles.projectInfo}>
                                <ProjectForm handleSubmit={editPost} btnText="Salvar" projectData={project}/>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ): (
            <Loading />
        )}
        </>
    )
}

export default Project