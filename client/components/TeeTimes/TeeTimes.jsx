import { useEffect, useState } from "react"
import { getAllTeetimesAndCourse } from "../../services/teetimeService"
import { useNavigate } from "react-router-dom"

export const TeeTimes = () => {
    const [teetime, setTeetime] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        getAllTeetimesAndCourse().then(setTeetime)
    },[])

    return (
        <div>
            <h2>TeeTimes</h2>
            <article className="teetimes">
                {teetime.map((teetime)=>{
                    if(teetime.courseId === teetime.course.id){
                        return (
                            <section className="teetime">
                                <header className="teetime-info">{teetime.course.name}</header>
                                <footer>
                                    <div className="teetime-info">
                                        <div>{teetime.dateTime}</div>
                                        <div>Available Spots: {teetime.maxPlayers}</div>
                                        <button
                                        type="button"
                                        onClick={() => navigate(`/teetime/book/${teetime.id}`)}
                                        >Book TeeTime</button>
                                    </div>
                                </footer>
                            </section>
                        )
                    }
                })}
            </article>
        </div>
    )
}
