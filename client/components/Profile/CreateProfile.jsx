import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createNewUser } from "../../services/UserService"
import './CreateProfile.css'


export const CreateUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [handicap, setHandicap] = useState(0)
    const [playStyle, setPlayStyle] = useState('')
    const [bio, setBio] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (name.trim() === "") {
            alert("Name is required.")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.")
            return
        }

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

        const newUser = {
            name: name,
            email: email,
            location: location,
            handicap: handicap,
            playStyle: playStyle,
            bio: bio,

        }
        createNewUser(newUser)
            .then(() => {
                alert("Account created!")
                navigate(`/login`)
            })
    }

    return (
        <div className="create-profile-container">
            <form className="create-profile-card" onSubmit={handleSubmit}>
                <h1 className="create-profile-title">Create Your Profile</h1>
                <p className="create-profile-subtitle">Join the golf community</p>

                <fieldset className="profile-edit-form">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </fieldset>

                <fieldset className="profile-edit-form">
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </fieldset>

                <fieldset className="profile-edit-form">
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </fieldset>

                <fieldset className="profile-edit-form">
                    <label>Handicap:</label>
                    <input type="text" value={handicap} onChange={(e) => setHandicap(e.target.value)} />
                </fieldset>

                <fieldset className="profile-edit-form">
                    <label>Play Style:</label>
                    <input type="text" value={playStyle} onChange={(e) => setPlayStyle(e.target.value)} />
                </fieldset>

                <fieldset className="profile-edit-form">
                    <label>Bio:</label>
                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                </fieldset>

                <button type="submit" className="create-profile-btn">Join</button>
            </form>
        </div>
    )
}