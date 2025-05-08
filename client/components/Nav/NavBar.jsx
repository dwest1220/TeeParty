import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
                <Link to="/courses">Courses</Link>
            </li>
            <li className="navbar-item">
                <Link to="/teetimes">Tee Times</Link>
            </li>
            <li className="navbar-item">
                <Link to="/profile">Profile</Link>
            </li>
            <li className="navbar-item">
                <Link to="/login">Logout</Link>
            </li>
        </ul>    
    )
}