const apiURL = "http://localhost:8088"

export const getAllCourses = () => {
    return fetch(`${apiURL}/courses`)
    .then(res => res.json())
}

export const getCourseReviews = (courseId) => {
  return fetch(`${apiURL}/courseReviews?courseId=${courseId}`).then(res => res.json())
}

export const postCourseReview = (reviewObj) => {
  return fetch(`${apiURL}/courseReviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewObj)
  }).then(res => res.json())
}

export const updateCourseReview = (reviewId, updatedReview) => {
  return fetch(`http://localhost:8088/courseReviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedReview)
  }).then(res => res.json())
}

export const deleteCourseReview = (reviewId) => {
  return fetch(`http://localhost:8088/courseReviews/${reviewId}`, {
    method: "DELETE"
  })
}