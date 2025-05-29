import { useEffect, useState } from "react"
import './Invites.css'
import { getPendingInvitesByUser, updateInviteStatus } from "../../services/InviteService"

export const PendingInvites = ({ currentUser }) => {
  const [pendingInvites, setPendingInvites] = useState([])

  const loadInvites = () => {
    getPendingInvitesByUser(currentUser.id).then(setPendingInvites)
  }

  useEffect(() => {
    if (currentUser) {
      loadInvites()
    }
  }, [currentUser])

  const handleAccept = (inviteId) => {
    updateInviteStatus(inviteId, "accepted").then(loadInvites)
  }

  const handleDecline = (inviteId) => {
    updateInviteStatus(inviteId, "declined").then(loadInvites)
  }

  return (
    <div className="pending-invites-container">
      <h2>Pending Tee Time Invites</h2>
      {pendingInvites.length === 0 ? (
        <p>No pending invites.</p>
      ) : (
        pendingInvites.map(invite => (
          <div key={invite.id} className="invite-card">
            <p><strong>From:</strong> {invite.senderName}</p>
            <p><strong>Course:</strong> {invite.courseName}</p>
            <p><strong>Time:</strong> {invite.date}</p>
            <div className="invite-actions">
              <button className="btn btn-success" onClick={() => handleAccept(invite.id)}>Accept</button>
              <button className="btn btn-danger" onClick={() => handleDecline(invite.id)}>Decline</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}