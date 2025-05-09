export const getAllTeetimesAndCourse = () => {
    return fetch(`http://localhost:8088/teeTimes?_expand=course`)
    .then(res => res.json())
}

export const getTeeTimeById = (id) => {
    return fetch(`http://localhost:8088/teeTimes/${id}?_expand=course`)
    .then(res => res.json())
}