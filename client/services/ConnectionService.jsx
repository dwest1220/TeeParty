export const createConnection = async (requesterUserId, receiverUserId) => {
    const [asRequester, asReceiver] = await Promise.all([
        fetch(`http://localhost:8088/connections?requesterUserId=${requesterUserId}&receiverUserId=${receiverUserId}`).then(res => res.json()),
        fetch(`http://localhost:8088/connections?requesterUserId=${receiverUserId}&receiverUserId=${requesterUserId}`).then(res => res.json())
    ])

    const existing = [...asRequester, ...asReceiver]

    const hasActiveConnection = existing.some(conn => conn.status !== "denied")

    if (hasActiveConnection) {
        return Promise.reject("Connection already exists or is pending.")
    }

    const newConnection = {
        requesterUserId,
        receiverUserId,
        status: "pending",
        timestamp: Date.now()
    }

    return fetch(`http://localhost:8088/connections`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newConnection),
    }).then(res => res.json())
}

export const getConnectionByUser = (userId) => {
    return fetch(`http://localhost:8088/connections?receiverUserId=${userId}&status=pending`)
        .then(res => res.json());
}

export const getAllConnections = () => {
    return fetch(`http://localhost:8088/connections`).then(res => res.json())
}

export const acceptConnection = (connectionId) => {
    return fetch(`http://localhost:8088/connections/${connectionId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "accepted" })
    }).then(res => res.json())
}

export const denyConnection = (connectionId) => {
    return fetch(`http://localhost:8088/connections/${connectionId}`, {
        method: "DELETE"
    })
}