import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserService"
import { getAllConnections } from "../../services/ConnectionService"
import './connect.css'

export const CurrentConnections = ({ currentUser }) => {
    const [connections, setConnections] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllConnections().then(setConnections)
        getAllUsers().then(setUsers)
    }, [currentUser])

    const acceptedConnections = connections.filter(
        conn => conn.status === "accepted" &&
            (conn.receiverUserId === currentUser.id || conn.requesterUserId === currentUser.id)
    )

    const getConnectedUser = (conn) => {
        return users.find(u => u.id === (
            conn.receiverUserId === currentUser.id
                ? conn.requesterUserId
                : conn.receiverUserId
        ))
    }

    return (
        <div className="connect-page">
            <h2 className="connect-title">Your Connections</h2>
            <section className="user-body">
                {acceptedConnections.length === 0 ? (
                    <p>No Connections <strong>yet</strong></p>
                ) : (
                    acceptedConnections.map(conn => {
                        const connectedUser = getConnectedUser(conn)
                        return (
                            <article className="user-info" key={conn.id}>
                                <header className="user-header">{connectedUser?.name}</header>
                                <footer>
                                    <div><strong>Location:</strong> {connectedUser?.location}</div>
                                    <div><strong>Handicap:</strong> {connectedUser?.handicap}</div>
                                    <div><strong>Play Style:</strong> {connectedUser?.playStyle}</div>
                                    <div><strong>Bio:</strong> {connectedUser?.bio}</div>
                                </footer>
                            </article>
                        )
                    })
                )}
            </section>
        </div>
    )

}