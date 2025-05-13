import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addTeetimes, getTeeTime } from "../../services/teetimeService"
import { getAllCourses } from "../../services/CourseService"
import './BookTeeTime.css'

export const BookTeeTimes = ({ currentUser }) => {

    const navigate = useNavigate()

    const initialTeetimeState = {
        courseId: 0,
        time: "",
        maxPlayers: 0,
        createdByUser: 0,
    }

    const [teetimes, setTeetimes] = useState([])
    const [players, setPlayers] = useState([])
    const [courses, setCourses] = useState([])
    const [selections, setSelections] = useState(initialTeetimeState)


    useEffect(() => {
        getTeeTime().then(setTeetimes)
    }, [])

    useEffect(() => {
        getAllCourses().then(setCourses)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const teeTimeToSave = {
            id: selections.id,
            courseId: selections.courseId,
            time: selections.time,
            maxPlayers: selections.maxPlayers,
            createdByUser: currentUser.id
        }

        addTeetimes(teeTimeToSave)
            .then(res => res.json())
            .then(() => {
                alert('TeeTime Booked!')
                setSelections(initialTeetimeState)
            })
    }

    return (
        <div className="book-teetimes-container">
            <form className="book-teetime-card" onSubmit={handleSubmit}>
            <h2>Book A TeeTime</h2>
                <fieldset>
                    <legend>Course:</legend>
                    <select
                        value={selections.courseId}
                        onChange={(e) => setSelections({ ...selections, courseId: parseInt(e.target.value) })}
                    >
                        <option value={0}>Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
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
                                    checked={selections.maxPlayers === num}
                                    onChange={(e) =>
                                        setSelections({ ...selections, maxPlayers: parseInt(e.target.value) })
                                    }
                                />
                                {num}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <label>Time:</label>
                    <input
                        type="time"
                        value={selections.time}
                        onChange={(e) => setSelections({ ...selections, time: e.target.value })}
                    />
                </fieldset>
                <button 
                    type="submit"
                >
                    Book
                </button>
            </form>
        </div>
    )
}