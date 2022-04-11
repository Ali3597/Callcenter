import "./Select.css";

export const Select = ({items,name,title,error,value,setValue}) => {
 
    return <>
     <select name={name} onChange={e=>(setValue(e.target.value))}  >
        <option value={null}>{title}</option>
        {items.map((item,index) => <option key={index} selected={item.value== value ? true: false} value={item.value}>
            {item.title}
        </option>)}
    </select>
      {error && <div className="invalid-feedback">{error}</div> }
      </>
};

