import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTeeTimeById } from "../../services/teetimeService"

export const BookTeeTimes = () => {
    
    const navigate = useNavigate()
    const {teetimeId} = useParams()

    const [teetimes, setTeetimes] = useState([])
    const [players, setPlayers] = useState([])

    const teeTimeToSave = {
        
    }

    useEffect(()=>{
        getTeeTimeById(teetimeId).then(setTeetimes)
    },[])

    return (
        <form className="book">
            <h2>Book A TeeTime</h2>    
            <div className="book-container">
                <fieldset>
                    <legend>Course:</legend>
                </fieldset>
                <div>
                    <span className="book-info">{teetimes.dateTime}</span>
                </div>
                <fieldset>
                    <label>Players:</label>
                    <select
                    ></select>
                </fieldset>
            </div>
        </form>    
        )
}