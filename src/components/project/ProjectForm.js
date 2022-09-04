import {useEffect, useState} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}){

    const [categories, setCategories] = useState([])

   useEffect(()=>{
        fetch("http://localhost:5000/categories",{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data)=>{
            setCategories(data)
        })
        .catch((err)=> console.log(err))
   },[])


    return (
        <form className={styles.form}>
            <Input 
            type="text" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            text="Nome do projeto" 
            />
             <Input 
            type="Number" 
            name="budget" 
            placeholder="Insira o orçamento total" 
            text="Orçamento do projeto" 
            />
            <Select name="category_id" text="Selecione a categoria"  options={categories} />
            <Submit text={btnText}/>
        </form>
    )
}

export default ProjectForm