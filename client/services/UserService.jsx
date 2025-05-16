export const GetUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
    .then(res => res.json())
}

export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
    .then(res => res.json())
}

export const editCurrentProfile = (id, updatedProfile) => {
    return fetch(`http://localhost:8088/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProfile),
  }).then(res => res.json())
}

export const createNewUser = (newUser) =>  {
    return fetch(`http://localhost:8088/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
    })
}