import { useEffect, useState } from "react"
import { getAllTeetimesAndCourse, getMyTeeTimes } from "../../services/teetimeService"
import { useNavigate } from "react-router-dom"
import './MyTeeTimes.css'
import { createInvite, getAllInvites } from "../../services/InviteService"
import { InvitePlayers } from "./InvitePlayers"

export const MyTeeTimes = ({ currentUser }) => {
    const [teetime, setTeetime] = useState([])
    const [allInvites, setAllInvites] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMyTeeTimes(currentUser?.id).then(setTeetime)
        getAllInvites().then(setAllInvites)
    }, [currentUser])

    const [showInvite, setShowInvite] = useState(false)
    const [selectedTeeTime, setSelectedTeeTime] = useState(null)

    const handleInviteClick = (teeTimeId) => {
        setSelectedTeeTime(teeTimeId)
        setShowInvite(true)
    }

    const sendInvite = (inviteeUserId) => {
        const invite = {
            teeTimeId: selectedTeeTime,
            senderUserId: currentUser.id,
            inviteeUserId,
            status: "pending"
        }
        createInvite(invite).then(() => alert("Invite sent!"))
    }

    const handleCloseInvitePanel = () => {
    setShowInvite(false)
    setSelectedTeeTime(null)
}

    return (
        <div className="my-teetimes-page">
            <div className="overlay">
                <h2>My TeeTimes</h2>
                <section className="top-bar">
                    <button
                        className="button"
                        onClick={() => navigate(`/teetimes/book`)}
                    >Book TeeTime</button>
                </section>
                <section className="top-bar">
                    <button
                        className="button"
                        onClick={()=> navigate(`/invites/pending`)}
                    >Invites</button>
                </section>
                <article className="teetimes">
                    {teetime.map((teetime) => {
                        if (currentUser.id === teetime.createdByUser) {
                            return (
                                <section className="teetime" key={teetime.id}>
                                    <header className="teetime-info">{teetime.course.name}</header>
                                    <footer>
                                        <div className="teetime-info">
                                            <div>Time: {teetime.time}</div>
                                            <div>Players: {teetime.maxPlayers}</div>
                                        </div>
                                    </footer>
                                    <button
                                        className="button"
                                        onClick={() => navigate(`/teetimes/edit/${teetime.id}`)}
                                    >Edit</button>
                                    <button
                                        className="button"
                                        onClick={() => handleInviteClick(teetime.id)}
                                    >Invite Players</button>
                                </section>
                            )
                        } else {
                            return null
                        }
                    })}
                </article>
            {showInvite && (
                <InvitePlayers
                    teetimeId={selectedTeeTime}
                    onSendInvite={sendInvite}
                    onClose={handleCloseInvitePanel}
                    existingInvites={allInvites.filter(invite => invite.teeTimeId === selectedTeeTime)}
                />
            )}
            </div>
        </div>
    )
}