import { useState } from "react"
import "./EditReviews.css"

export const EditReview = ({ review, onSave, onCancel, currentUser }) => {
    const [editedComment, setEditedComment] = useState(review.comment)
    const [editedRating, setEditedRating] = useState(review.rating)

    if (currentUser.id !== review.reviewerId) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({
            ...review,
            comment: editedComment,
            rating: editedRating
        })
    }

    return (
        <form onSubmit={handleSubmit} className="edit-review-form">
            <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                required
            />
            <input
                type="number"
                min="1"
                max="5"
                value={editedRating}
                onChange={(e) => setEditedRating(parseInt(e.target.value))}
                required
            />
            <div className="edit-buttons">
                <button type="submit" className="btn btn-success btn-sm">Save</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}