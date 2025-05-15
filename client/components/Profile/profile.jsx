import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserService"
import './profile.css'
import { useNavigate } from "react-router-dom"

export const Profile = ({ currentUser }) => {

    const navigate = useNavigate()

    const [profile, setProfile] = useState([])

    useEffect(() => {
        getAllUsers().then(setProfile)
    }, [])

    const handleEditClick = () => {
        navigate(`/profile/edit/${currentUser.id}`)
    }

    const userProfile = profile.find(profile => profile.id === currentUser.id) 
    return (
        <div>
            <article className="profile-container">
                        {userProfile ? (
                            <section className="profile-body" key={userProfile.id}>
                                <header className="profile-header">{userProfile.name}</header>
                                <footer>
                                    <div className="profile-info">
                                        <div>{userProfile.location}</div>
                                        <div>{userProfile.handicap}</div>
                                        <div>{userProfile.playStyle}</div>
                                        <div>{userProfile.bio}</div>
                                    </div>
                                </footer>
                                <button onClick={handleEditClick}>Edit</button>
                            </section>
                        ) : ( 
                            <div>You are not permitted to view this page.</div>
                    )}
            </article>
        </div>
    )
}