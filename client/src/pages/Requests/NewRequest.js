
import { useEffect, useState } from "react";
import { Field } from "../../components/Field";
import { Select } from "../../components/Select";
import { ApiErrors, apiFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./NewRequest.css";

const allUrgencyLevel= [
    {value:1, title:"1"},
    {value:2, title:"2"},
    {value:3, title:"3"},
    {value:4, title:"4"},
    {value:5, title:"5"},
]

const allTypeOf= [
    {value:"Call", title:"Call"},
    {value:"Email", title:"Email"},
    {value:"Other", title:"Other"},
]
export const NewRequest = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [errors,setErrors] =  useState([])
    const [customers,SetCustomers] = useState([])
    const [message,setMessage] = useState("")
    const [urgencyLevel,setUrgencyLevel] = useState(null)
    const [customer,setCustomer] = useState(null)
    const [typeOf,setTypeOf] = useState(null)
    const [deadline,setDeadline] = useState("")
    const navigate = useNavigate()
    useEffect( async()=>{
        const customerEffect = searchParams.get("customer");
        console.log(customerEffect,"t la")
         setCustomer(customerEffect)
      const response =  await apiFetch('/customers',{
          method: 'POST'
      })
      SetCustomers(response.items.map((item)=>{
       return {"value": item._id,"title":item.name }
      }))
   
    },[])
    const errorFor = function(field){
        const error =  errors.find(e => e.field == field)
        console.log(error,"errrrrrr")
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
            const response =   await apiFetch('/requests/new',{
                method: 'POST',
                body: {message,urgencyLevel,typeof:typeOf,deadline,customer},
            })
            navigate("/requests/"+response._id);
        } catch (e) {
            if (e instanceof ApiErrors){
               
                setErrors(e.errors)
            }else{
            throw e
            }
            
        }
     
  
    }
  return ( 
  <div className="form-request">
      <h1>Ma nouvelle requete</h1>
      <form onSubmit={handleSubmit} >
          <Field type="textarea" name={'message'} error={errorFor('message')} placeholder={'Message'} value={message} setValue={setMessage}/>
          {customers && <Select error={errorFor('customer')} name={"customers"} title={"Choisissez un client"} items={customers} value={customer} setValue={setCustomer} />}
          <Field name={"deadline"} error={errorFor('deadline')} type={'datetime-local'} value={deadline} setValue={setDeadline} > Deadline : </Field>
          <Select name={"urgencyLevel"} title={"Choisissez un niveau d'urgence"} items={allUrgencyLevel} error={errorFor('urgencyLevel')} value={urgencyLevel} setValue={setUrgencyLevel} />
          <Select name={"typeOf"} title={"Type de requette"} items={allTypeOf} value={typeOf} setValue={setTypeOf} error={errorFor('typeof')} />
          <button>Valider la requette</button>
      </form>
</div>
  )
};
