import { useEffect, useState } from "react"
import { getAllTeetimesAndCourse } from "../../services/teetimeService"
import { useNavigate } from "react-router-dom"
import './MyTeeTimes.css'

export const MyTeeTimes = ({ currentUser }) => {
    const [teetime, setTeetime] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllTeetimesAndCourse().then(setTeetime)
    }, [])

    return (
        <div className="my-teetimes-page">
            <div className="overlay">
                <h2>My TeeTimes</h2>
                <section className="top-bar">
                    <button
                        className="button"
                        onClick={() => navigate(`/teetimes/book`)}
                    >Book TeeTime</button>
                </section>
                <article className="teetimes">
                    {teetime.map((teetime) => {
                        if (currentUser.id === teetime.createdByUser) {
                            return (
                                <section className="teetime" key={teetime.id}>
                                    <header className="teetime-info">{teetime.course.name}</header>
                                    <footer>
                                        <div className="teetime-info">
                                            <div>Time: {teetime.time}</div>
                                            <div>Players: {teetime.maxPlayers}</div>
                                        </div>
                                    </footer>
                                    <button
                                        className="button"
                                        onClick={() => navigate(`/teetimes/edit/${teetime.id}`)}
                                    >Edit</button>
                                </section>
                            )
                        } else {
                            return null
                        }
                    })}
                </article>
            </div>
        </div>
    )
}