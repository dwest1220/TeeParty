import { useEffect, useState } from "react"
import { editCurrentProfile, getUserById } from "../../services/UserService"
import { useNavigate, useParams } from "react-router-dom"

export const EditProfile = () => {
    
    const [user, setUser] = useState({})
    const [location, setLocation] = useState("")
    const [handicap, setHandicap] = useState(0)
    const [playStyle, setPlayStyle] = useState('')
    const [bio, setBio] = useState("")

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getUserById(id).then((data) => {
            setUser(data)
            setLocation(data.location)
            setHandicap(data.handicap)
            setPlayStyle(data.playStyle)
            setBio(data.bio)
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedProfile = {
            location: location,
            handicap: handicap,
            playStyle: playStyle,
            bio: bio
        }

        editCurrentProfile(id, updatedProfile)
            .then(()=>{
                alert("Changes saved!")
                navigate(`/profile`)
            })
    }

    return (
        <form className="profile-edit-container" onSubmit={handleSubmit}> 
            <fieldset className="profile-edit-form">
                <label>Location</label>
                <input
                type="text"
                value={location}
                onChange={(e)=> setLocation(e.target.value)}
                ></input>
            </fieldset>    
            <fieldset className="profile-edit-form">
                <label>Handicap</label>
                <input
                type="text"
                value={handicap}
                onChange={(e)=> setHandicap(e.target.value)}
                ></input>
            </fieldset>    
            <fieldset className="profile-edit-form">
                <label>PlayStyle</label>
                <input
                type="text"
                value={playStyle}
                onChange={(e)=> setPlayStyle(e.target.value)}
                ></input>
            </fieldset>    
            <fieldset className="profile-edit-form">
                <label>Bio</label>
                <input
                type="text"
                value={bio}
                onChange={(e)=> setBio(e.target.value)}
                ></input>
            </fieldset>
            <button type="submit">Save Changes</button>    
        </form>
    )
}