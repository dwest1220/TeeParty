import { useEffect, useState } from "react"
import { getAllTeetimesAndCourse } from "../../services/teetimeService"
import { useNavigate } from "react-router-dom"
import './TeeTimes.css'

export const TeeTimes = ({currentUser}) => {

    const [teetime, setTeetime] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllTeetimesAndCourse().then(setTeetime)
    }, [])

    return (
        <div>
            <h2>My TeeTimes</h2>
            <section>
                <button
                    onClick={() => navigate(`/teetimes/book`)}
                >Book TeeTime</button>
            </section>
            <article className="teetimes">
                {teetime.map((teetime) => {
                    if (currentUser.id === teetime.createdByUser) {
                        return (
                            <section className="teetime">
                                <header className="teetime-info">{teetime.course.name}</header>
                                <footer>
                                    <div className="teetime-info">
                                        <div>{teetime.time}</div>
                                        <div>Players: {teetime.maxPlayers}</div>
                                    </div>
                                </footer>
                                <button 
                                    onClick={() => navigate(`/teetimes/edit/${teetime.id}`)}
                                >Edit</button>
                            </section>
                        )
                    }
                })}
            </article>
        </div>
    )
}
