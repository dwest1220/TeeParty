export const getAllTeetimesAndCourse = () => {
    return fetch(`http://localhost:8088/teeTimes?_expand=course`)
    .then(res => res.json())
}

export const getTeeTime = () => {
    return fetch(`http://localhost:8088/teeTimes/?_expand=course`)
    .then(res => res.json())
}

export const addTeetimes = (teeTimeToSave) => {
    return fetch("http://localhost:8088/teeTimes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teeTimeToSave),
    }) 
}

export const getTeeTimeById = (id) => {
    return fetch(`http://localhost:8088/teeTimes/${id}?_expand=course`)
    .then(res => res.json())
}

export const editTeeTime = (id, updatedTeeTime) => {
    return fetch(`http://localhost:8088/teeTimes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTeeTime),
  }).then(res => res.json())
}

export const cancelTeeTime = async (id) => {
  return await fetch(`http://localhost:8088/teeTimes/${id}`, {
      method: "DELETE",
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to delete the order.");
          }
          return response.json();
      });
};

export const getMyTeeTimes = (userId) => {
  return Promise.all([
    fetch(`http://localhost:8088/teeTimes?createdByUser=${userId}&_expand=course`).then(res => res.json()),
    fetch(`http://localhost:8088/teeTimeInvites?inviteeUserId=${userId}&status=accepted&_expand=teeTime`).then(res => res.json())
  ]).then(([created, invited]) => {
    const teeTimePromises = invited.map(invite =>
      fetch(`http://localhost:8088/teeTimes/${invite.teeTimeId}?_expand=course`).then(res => res.json())
    )

    return Promise.all(teeTimePromises).then(acceptedTeetimes => {
      const all = [...created, ...acceptedTeetimes]
      const unique = all.filter(
        (teetime, index, self) =>
          index === self.findIndex(t => t.id === teetime.id)
      )
      return unique
    })
  })
}