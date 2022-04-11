import { FaPlusCircle } from "react-icons/fa";
import { apiFetch } from '../utils/api';


export const InputFile= ({link,setFile}) => {
    const handleChange= async(e)=>{
        const newAvatar= e.target.files[0]
     
        const formData = new FormData()
        formData.set('profile',newAvatar)
        try {
            const response = await apiFetch(link,{
                method:"POST",
                body: formData
            })
            setFile(response.avatar)
        }  catch (error) {
            
            }
       
    }
    return <label>
    <FaPlusCircle color={"green"} size={20} cursor={"pointer"}/>
    <input
      style={{ display: "none" }}
      type="file"
      onChange={handleChange}
    />
  </label>
       
}


