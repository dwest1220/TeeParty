import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserService"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./profile.css"

export const Profile = ({ currentUser }) => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState([])

    useEffect(() => {
        getAllUsers().then(setProfile)
    }, [])

    const handleEditClick = () => {
        navigate(`/profile/edit/${currentUser.id}`)
    }

    const userProfile = profile.find((profile) => profile.id === currentUser.id)

    return (
        <div className="profile-page">
            {userProfile ? (
                <>
                    {/* Hero Header */}
                    <section className="profile-hero text-white">
                        <div className="container text-center py-5">
                            <img
                                src={`https://ui-avatars.com/api/?name=${userProfile.name}&background=14452F&color=fff&size=128`}
                                alt="avatar"
                                className="rounded-circle mb-3 profile-avatar"
                            />
                            <h1 className="display-5 fw-bold">{userProfile.name}</h1>
                            <p className="lead">Ready to tee off anytime ⛳</p>
                            <button className="btn btn-outline-light mt-3" onClick={handleEditClick}>
                                Edit Profile
                            </button>
                        </div>
                    </section>

                    {/* Info Panel */}
                    <section className="profile-info-section py-5">
                        <div className="container">
                            <div className="glass-panel mx-auto p-4 rounded-4 shadow-lg">
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <h5 className="text-uppercase text-muted">Location</h5>
                                        <p className="fs-5">{userProfile.location}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="text-uppercase text-muted">Handicap</h5>
                                        <p className="fs-5">{userProfile.handicap}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="text-uppercase text-muted">Play Style</h5>
                                        <p className="fs-5">{userProfile.playStyle}</p>
                                    </div>
                                    <div className="col-12">
                                        <h5 className="text-uppercase text-muted">About Me</h5>
                                        <p className="fs-5">{userProfile.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <div className="text-center text-danger mt-5">You are not permitted to view this page.</div>
            )}
        </div>
    )
}