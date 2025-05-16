import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'
import { useState } from "react"


export const NavBar = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("golf_user")
    navigate("/login", { replace: true })
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">🏌️ TeeParty ⛳</h1>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link></li>
            <li><Link to="/teetimes" onClick={() => setMenuOpen(false)}>Tee Times</Link></li>
            <li><Link to="/connections" onClick={() => setMenuOpen(false)}>Connect</Link></li>
            <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}