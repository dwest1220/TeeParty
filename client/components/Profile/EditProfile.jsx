import { useEffect, useState } from "react"
import { editCurrentProfile, getUserById } from "../../services/UserService"
import { useNavigate, useParams } from "react-router-dom"
import './EditProfile.css'

export const EditProfile = () => {

    const [user, setUser] = useState({})
    const [location, setLocation] = useState("")
    const [handicap, setHandicap] = useState(0)
    const [playStyle, setPlayStyle] = useState('')
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(id).then((data) => {
            setUser(data)
            setName(data.name)
            setEmail(data.email)
            setLocation(data.location)
            setHandicap(data.handicap)
            setPlayStyle(data.playStyle)
            setBio(data.bio)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()


        const handicapNumber = Number(handicap)
        if (isNaN(handicapNumber) || handicapNumber < 0 || handicapNumber > 54) {
            alert("Handicap must be a number between 0 and 54.")
            return
        }

        if (playStyle.trim() === "") {
            alert("Play style is required.")
            return
        }

        if (location.trim() === "") {
            alert("Location is required.")
            return
        }

        if (bio.trim().length < 10) {
            alert("Bio must be at least 10 characters.")
            return
        }

        const updatedProfile = {
            name: name,
            email: email,
            location: location,
            handicap: handicap,
            playStyle: playStyle,
            bio: bio
        }

        editCurrentProfile(id, updatedProfile)
            .then(() => {
                alert("Changes saved!")
                navigate(`/profile`)
            })
    }

    return (
        <div className="edit-profile-page">
            <form className="profile-edit-form" onSubmit={handleSubmit}>
                <h2>Edit Your Profile</h2>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Handicap</label>
                    <input
                        type="number"
                        value={handicap}
                        onChange={(e) => setHandicap(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Play Style</label>
                    <input
                        type="text"
                        value={playStyle}
                        onChange={(e) => setPlayStyle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="submit-btn">Save Changes</button>
            </form>
        </div>
    )
}