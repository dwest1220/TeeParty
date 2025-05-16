import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createNewUser } from "../../services/UserService"


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
        .then(()=> {
            alert("Account created!")
            navigate(`/login`)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="profile-edit-form">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                ></input>
            </fieldset>
            <fieldset className="profile-edit-form">
                <label>Handicap:</label>
                <input
                    type="text"
                    value={handicap}
                    onChange={(e) => setHandicap(e.target.value)}
                ></input>
            </fieldset>
            <fieldset className="profile-edit-form">
                <label>PlayStyle:</label>
                <input
                    type="text"
                    value={playStyle}
                    onChange={(e) => setPlayStyle(e.target.value)}
                ></input>
            </fieldset>
            <fieldset className="profile-edit-form">
                <label>Bio:</label>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                ></input>
            </fieldset>
            <button type="submit">Join</button>
        </form>
    )
}