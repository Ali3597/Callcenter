import './Dot.css'



export const Dot = ({ color }) => {
    console.log("voila la couleur ma gueuel",color)
    return <div style={{backgroundColor:`#${color}`}} className="dot">
      
    </div>
}