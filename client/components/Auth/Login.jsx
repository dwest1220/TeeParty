import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GetUserByEmail } from "../../services/UserService.jsx"
import './Login.css'

export const Login = () => {
  const [email, set] = useState("alex.j@example.com")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    GetUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "golf_user",
          JSON.stringify({ id: user.id })
        )
        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="login-container">
      <section>
        <form className="login-card" onSubmit={handleLogin}>
          <h1 className="login-title">Tee Party</h1>
          <h2 className="login-subtitle">Please sign in</h2>

          <fieldset>
            <div className="login-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="login-input"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="login-group">
              <button className="login-btn" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>

          <fieldset>
            <div className="login-footer">
              <Link to="/register" className="login-link">
                New Here? Sign Up Now!
              </Link>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  )
}