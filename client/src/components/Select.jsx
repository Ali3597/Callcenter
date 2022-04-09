import "./Select.css";

export const Select = ({items,name,title,error,value,setValue}) => {
  

    return <>
     <select name={name} onChange={e=>(setValue(e.target.value))} defaultValue={value} >
        <option value={null}>{title}</option>
        {items.map((item,index) => <option key={index} value={item.value}>
            {item.title}
        </option>)}
    </select>
      {error && <div className="invalid-feedback">{error}</div> }
      </>
};

