import { useEffect, useState } from "react"
import { getAllCourses } from "../../services/CourseService"
import './Courses.css'
import { useNavigate } from "react-router-dom"

export const Courses = () => {
    const [courses, setCourses] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllCourses().then(setCourses)
    }, [])

    return (
        <div className="course-container">
            <h2>Courses</h2>
            <article className="courses-list">
                {courses.map((course) => {
                    return (
                        <section className="course-card" key={course.id}>
                            <header className="course-info">{course.name}</header>
                            <footer>
                                <div className="course-info">
                                    <div>{course.location}</div>
                                    <div>{course.description}</div>
                                    <div>Par: {course.par}</div>
                                    <div>Slope Rating: {course.slopeRating}</div>
                                    <div>Course Rating: {course.courseRating}</div>
                                </div>
                            </footer>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/courses/reviews/${course.id}`)}
                            >
                                Reviews
                            </button>
                        </section>
                    )
                })}
            </article>
        </div>
    )
}