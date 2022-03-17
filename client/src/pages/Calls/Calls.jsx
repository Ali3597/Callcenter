import './Calls.css'

import {apiFetch} from '../../utils/api'
import { useEffect } from 'react';



export const Calls = () => {
  useEffect(async() => {
    const calls = await apiFetch("/calls/1")
    console.log(calls)
  },[])
    return <div>Calls</div>
}