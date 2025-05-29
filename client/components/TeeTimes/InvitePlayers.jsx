import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserService"
import './Invites.css'
import { useNavigate } from "react-router-dom"

export const InvitePlayers = ({ teetimeId, onSendInvite, onClose, existingInvites = [] }) => {
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllUsers().then(setUsers)
    }, [])

    const availableUsers = users.filter(
        (user) => !existingInvites.some((invite) => invite.inviteeUserId === user.id)
    )

    return (
        <div className="invite-container">
            <div className="invite-header">
                <h2>Invite Players</h2>
                <button className="close-btn" onClick={onClose}>✖</button>
            </div>
            {availableUsers.length === 0 ? (
                <p>All users already invited.</p>
            ) : (
                <ul className="invite-list">
                    {availableUsers.map(user => (
                        <li key={user.id} className="invite-item">
                            <span>{user.name}</span>
                            <button
                                className="btn btn-primary"
                                onClick={() => onSendInvite(user.id)}
                            >
                                Invite
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
