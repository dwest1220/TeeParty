import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserService"
import { getConnectionByUser, acceptConnection, denyConnection } from "../../services/ConnectionService"
import './connect.css'

export const PendingConnections = ({ currentUser }) => {
    const [connections, setConnections] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (currentUser) {
            getConnectionByUser(currentUser.id).then(setConnections)
            getAllUsers().then(setUsers)
        }
    }, [currentUser])

    const handleAccept = (connId) => {
        acceptConnection(connId).then(() => {
            getConnectionByUser(currentUser.id).then(setConnections)
        })
    }

    const handleDeny = (connId) => {
        denyConnection(connId).then(() => {
            getConnectionByUser(currentUser.id).then(setConnections)
        })
    }

    const pendingConnections = connections.filter(
        conn => conn.status === "pending" && conn.receiverUserId === currentUser.id
    )

    return (
        <div className="connect-page">
            <h2 className="connect-title">Pending Connection Requests</h2>
            <section className="user-body">
                {pendingConnections.length === 0 ? (
                    <p>No pending requests</p>
                ) : (pendingConnections.map(conn => {
                    const sender = users.find(u => u.id === conn.requesterUserId)

                    if (!sender) return null

                    return (
                        <article className="user-info" key={conn.id}>
                            <header className="user-header">{sender.name}</header>
                            <footer>
                                <div><strong>Location:</strong> {sender?.location}</div>
                                <div><strong>Handicap:</strong> {sender?.handicap}</div>
                                <div><strong>Play Style:</strong> {sender?.playStyle}</div>
                                <div><strong>Bio:</strong> {sender?.bio}</div>
                                <button className="btn btn-success" onClick={() => handleAccept(conn.id)}>Accept</button>
                                <button className="btn btn-danger" onClick={() => handleDeny(conn.id)}>Deny</button>
                            </footer>
                        </article>
                    )
                }))}
            </section>
        </div>
    )
}