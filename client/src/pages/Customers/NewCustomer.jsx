
import { useEffect, useState } from "react";
import { Field } from "../../components/Field";
import { ApiErrors, apiFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./NewCustomer.css";

export const NewCustomer = () => {
    const [errors,setErrors] =  useState([])
    const [email,setEmail] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const [number,setNumber] = useState("")
    const [name,setName] = useState("")
    const navigate = useNavigate()
    useEffect( async()=>{
        const numberEffect = searchParams.get("number");
        setNumber(numberEffect)
    },[])

    const errorFor = function(field){
        const error =  errors.find(e => e.field == field)
        if (error){
            return error.message
        }else{
            return null
        }
     
    
    }
    const handleSubmit= async(e)=>{
        e.preventDefault()
        setErrors([])
        try {
            const response =   await apiFetch('/customers/new',{
                method: 'POST',
                body: {name,email,number},
            })
            navigate("/clients/"+response._id);
        } catch (e) {
            if (e instanceof ApiErrors){
                setErrors(e.errors)
                console.log(e.errors,"les erruers cousin")
            }else{
            throw e
            }
            
        }
     
  
    }
  return ( 
  <div className="form-request">
      <h1>Mon nouveau client </h1>
      
      <form onSubmit={handleSubmit} >
          <Field  name={'email'} error={errorFor('email')} placeholder={'Email'} value={email} setValue={setEmail}/>
          <Field name={"name"} error={errorFor('name')} placeholder={'Nom'}  value={name} setValue={setName}/>
          <Field name={"number"} error={errorFor('number')} placeholder={'Numero'}  value={number} setValue={setNumber} />
         
          <button>Valider le nouveu client </button>
      </form>
</div>
  )
};
