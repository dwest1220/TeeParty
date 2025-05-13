import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { cancelTeeTime, editTeeTime, getTeeTimeById } from "../../services/teetimeService"
import { getAllCourses } from "../../services/CourseService"
import './EditTeeTime.css'

export const EditTeeTime = ({ currentUser }) => {

    const [selectedTee, setSelectedTee] = useState([])
    const [time, setTime] = useState("")
    const [players, setPlayers] = useState(0)
    const [selectedCourse, setSelectedCourse] = useState({})
    const [allCourses, setAllCourses] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getTeeTimeById(id).then((data) => {
            setSelectedTee(data)
            setSelectedCourse(data.course.id)
            setTime(data.time)
            setPlayers(data.maxPlayers)
        })
    }, [id])

    useEffect(() => {
        getAllCourses().then(setAllCourses)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedTeeTime = {
            courseId: selectedCourse,
            time: time,
            maxPlayers: players,
            createdByUser: currentUser.id
        }

        editTeeTime(id, updatedTeeTime)
            .then(() => {
                alert("Tee Time Updated!")
                navigate(`/teetimes`)
            })

    }

    const deleteTeeTime = (e) => {
        e.preventDefault()

        if (window.confirm("Are you sure you want to delete this tee time?")) {
            cancelTeeTime(id)
                .then(() => {
                    alert("Tee Time Deleted!")
                    navigate(`/teetimes`)
                })
        }
    }
    return (
        <form className="edit-form">
            <fieldset>
                <label>Course:</label>
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(parseInt(e.target.value))}
                >
                    <option value=''>Select a Course</option>
                    {allCourses.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <label>Time:</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </fieldset>
            <fieldset>
                <label>Players:</label>
                <div className="book-radio">
                    {[1, 2, 3, 4].map((num) => (
                        <label key={num}>
                            <input
                                type="radio"
                                name="maxPlayers"
                                value={num}
                                checked={players === num}
                                onChange={(e) => setPlayers(parseInt(e.target.value))}
                            />
                            {num}
                        </label>
                    ))}
                </div>
            </fieldset>
            <button type="button" onClick={handleSubmit}>Save Changes</button>
            <button type="button" onClick={deleteTeeTime}>Delete</button>
        </form>
    )
}