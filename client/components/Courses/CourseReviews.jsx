import { useEffect, useState } from "react"
import { deleteCourseReview, getAllCourses, getCourseReviews, postCourseReview, updateCourseReview } from "../../services/CourseService"
import { useParams } from "react-router-dom"
import "./CourseReviews.css"
import { EditReview } from "./EditReviews"

export const CourseReviews = ({ currentUser }) => {
    const [selectedCourseId, setSelectedCourseId] = useState(null)
    const [reviews, setReviews] = useState([])
    const [courses, setCourses] = useState([])
    const [name, setName] = useState("")
    const [newComment, setNewComment] = useState("")
    const [newRating, setNewRating] = useState(5)
    const [editingReviewId, setEditingReviewId] = useState(null)

    const { courseId } = useParams()

    useEffect(() => {
        getAllCourses().then(setCourses)
    }, [])

    useEffect(() => {
        if (selectedCourseId) {
            getCourseReviews(selectedCourseId).then(setReviews)
        }
    }, [selectedCourseId])

    const handleCourseChange = (e) => {
        setSelectedCourseId(parseInt(e.target.value))
    }

    useEffect(() => {
        if (courseId && selectedCourseId === null) {
            setSelectedCourseId(parseInt(courseId))
        }
    }, [courseId, selectedCourseId])

    const handleReviewSubmit = (e) => {
        e.preventDefault()

        const reviewObj = {
            courseId: selectedCourseId,
            reviewerId: currentUser.id,
            reviewerName: name,
            comment: newComment,
            rating: newRating
        }
        console.log("Review Object", reviewObj)

        postCourseReview(reviewObj).then(() => {
            console.log("ReviewSubmitted!")
            setNewComment("")
            setNewRating(5)
            getCourseReviews(selectedCourseId).then(setReviews)
        }).catch(err => {
            console.error("Failed to submit review", err)
        })
    }

    const selectedCourse = courses.find(c => c.id === selectedCourseId)

    const handleEditClick = (reviewId) => {
        setEditingReviewId(reviewId)
    }

    const handleSaveEdit = (updatedReview) => {
        updateCourseReview(updatedReview.id, updatedReview).then(() => {
            setEditingReviewId(null)
            getCourseReviews(selectedCourseId).then(setReviews)
        })
    }

    const handleDelete = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            deleteCourseReview(reviewId).then(() => {
                getCourseReviews(selectedCourseId).then(setReviews)
            })
        }
    }


    return (
        <div className="course-reviews">
            <div className="course-reviews-container">
                <h2>Course Reviews</h2>

                <div className="dropdown-wrapper">
                    <label htmlFor="courseSelect">Select a course: </label>
                    <select id="courseSelect" value={selectedCourseId} onChange={handleCourseChange}>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>

                <h3>{selectedCourse?.name}</h3>

                {reviews.length === 0 ? (
                    <p>No reviews yet for this course.</p>
                ) : (
                    <ul className="review-list">
                        {reviews.map(review => (
                            <li key={review.id} className="review-card">
                                {editingReviewId === review.id ? (
                                    <EditReview
                                        currentUser={currentUser}
                                        review={review}
                                        onSave={handleSaveEdit}
                                        onCancel={() => setEditingReviewId(null)}
                                    />
                                ) : (
                                    <>
                                        <p><strong>{review.reviewerName}</strong></p>
                                        <p>{review.comment}</p>
                                        <p>⭐ {review.rating}/5</p>
                                        {review.reviewerId === currentUser.id && (
                                            <div className="review-buttons">
                                                <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(review.id)}>Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(review.id)}>Delete</button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                <form className="review-form" onSubmit={handleReviewSubmit}>
                    <h4>Leave a Review</h4>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name..."
                    ></input>
                    <label>Rating (1–5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={newRating}
                        onChange={(e) => setNewRating(parseInt(e.target.value))}
                        required
                    />

                    <label>Comment:</label>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Your thoughts..."
                        required
                    ></textarea>

                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            </div>
        </div>
    )
}