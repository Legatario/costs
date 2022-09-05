import { v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css' 

import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message  from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../Service/ServiceForm'
import ServiceCard from '../Service/ServiceCard'


function Project(){
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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
            setServices(data.services)
        })
        .catch((err)=> console.log(err))
       }, 300)
    }, [id])

function toggleProjectForm(){
    setShowProjectForm(!showProjectForm)
}

function toggleServiceForm(){
    setShowServiceForm(!showServiceForm)
}

function removeService(){

}

function createService(){
    setMessage('')
    const lastService = project.services[project.services.length - 1]
    
    lastService.id = uuidv4()
    
    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
    
    //maximum value validation
    
    if(newCost > parseFloat(project.budget)){
        setMessage('Orçamento ultrapassado, verifique o valor do serviço')
        setType('error')
        project.services.pop()
        return false
    }

    project.cost = newCost

    //update
    fetch(`http://localhost:5000/projects/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(project)
    })
    .then((res) => res.json())
    .then(()=>{
        setShowServiceForm(false)
    })
    .catch((error)=> console.log(error))
}

function editPost(project){
    setMessage('')
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
                                    <span>Total do Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Ultilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ):(
                            <div className={styles.projectInfo}>
                                <ProjectForm handleSubmit={editPost} btnText="Salvar" projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.serviceFormContainer}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço': 'Fechar'}
                            </button>
                            <div className={styles.projectInfo}>
                                {showServiceForm && (
                                    <ServiceForm 
                                    handleSubmit={createService}
                                    btnText="Adicionar Serviço"
                                    projectData={project}
                                    />
                                )}
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) =>( 
                                    <ServiceCard 
                                        id={service.id}
                                        key={service.id}
                                        name={service.name}
                                        description={service.description}
                                        cost={service.cost}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados</p>

                            }
                    </Container>
                </Container>
            </div>
        ): (
            <Loading />
        )}
        </>
    )
}

export default Project