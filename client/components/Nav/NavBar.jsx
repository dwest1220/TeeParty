import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link" to="/">Home</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/courses">Courses</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/teetimes">TeeTimes</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/profile">Profile</Link>
            </li>
            <li className="navbar-item">
                <Link
                    className="navbar-link"
                    to="/login"
                    onClick={() => {
                        localStorage.removeItem("golf_user")
                        navigate("/login", { replace: true })
                    }}
                >Logout
                </Link>
            </li>
        </ul>
    )
}