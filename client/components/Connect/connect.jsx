import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserService"
import './connect.css'
import { createConnection, getConnectionByUser } from "../../services/ConnectionService"
import { Link } from "react-router-dom"

export const Connect = ({ currentUser }) => {
    const [users, setUsers] = useState([])
    const [connections, setConnections] = useState([])

    useEffect(() => {
        if (currentUser) {
            getAllUsers().then(setUsers)
            getConnectionByUser(currentUser.id).then(setConnections)
        }
    }, [currentUser?.id])

    const isConnected = (targetUserId) => {
        return connections.some(conn => {
            const isMatch =
                (conn.requesterUserId === currentUser.id && conn.receiverUserId === targetUserId) ||
                (conn.requesterUserId === targetUserId && conn.receiverUserId === currentUser.id)

            return isMatch && conn.status !== "accepted"
        })
    }

    const handleConnect = (receiverId) => {
        const alreadyExists = connections.some(conn =>
            (conn.requesterUserId === currentUser.id && conn.receiverUserId === receiverId) ||
            (conn.requesterUserId === receiverId && conn.receiverUserId === currentUser.id)
        )

        if (alreadyExists) {
            alert("You already have a connection or request with this user.")
            return
        }

        createConnection(currentUser.id, receiverId)
            .then(() => {
                alert("Connection Request Sent!")
                return getConnectionByUser(currentUser.id)
            })
            .then(setConnections)
            .catch(err => {
                alert("Error sending request:", err)
            })
    }

    const getConnectionStatus = (targetUserId) => {
    const connection = connections.find(conn =>
        (conn.requesterUserId === currentUser.id && conn.receiverUserId === targetUserId) ||
        (conn.requesterUserId === targetUserId && conn.receiverUserId === currentUser.id)
    )

    if (!connection) return "none"
    if (connection.status === "accepted") return "connected"
    if (connection.status === "pending") {
        return connection.requesterUserId === currentUser.id
            ? "pendingOutgoing"
            : "pendingIncoming"
    }

    return "none"
}

    if (!currentUser) return <div>Loading...</div>

    return (
        <div className="connect-page">
            <h2 className="connect-title">Connect with Golfers</h2>
            <Link to="/connections/pending">
                <button className="button">View Pending Connections</button>
            </Link>
            <Link to="/connections/connected">
                <button className="button">Connections</button>
            </Link>

            <section className="user-body">
                {users.map((user) => {
                    const status = getConnectionStatus(user.id)

                    return (
                    <article className="user-info" key={user.id}>
                        <header className="user-header">{user.name}</header>
                        <footer>
                            <div><strong>Location:</strong> {user.location}</div>
                            <div><strong>Handicap:</strong> {user.handicap}</div>
                            <div><strong>Play Style:</strong> {user.playStyle}</div>
                            <div><strong>Bio:</strong> {user.bio}</div>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleConnect(user.id)}
                                disabled={user.id === currentUser.id || isConnected(user.id) || status !== "none"}
                            >
                                {user.id === currentUser.id
                                    ? "You"
                                    : status === "pendingOutgoing"
                                        ? "Request Sent"
                                        : "Connect"}
                            </button>
                        </footer>
                    </article>
            )})}
            </section>
        </div>
    )
}