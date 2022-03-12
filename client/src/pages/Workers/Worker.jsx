import { useParams } from 'react-router'
import './Worker.css'

export const Worker = () => {
    const {id} = useParams()
    return <div className="worker">
        {id}
    </div>
}
