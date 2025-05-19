import { useNavigate } from "react-router-dom"
import "./Welcome.css"


export const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div className="layout">

      <main className="main">
        <section className="welcome-section">
          <h2 className="welcome-heading">Welcome to <span className="brand-name">TeeParty</span></h2>
          <p className="tagline">The One-Stop Shop <em>'Fore'</em> All Golfers</p>
          <div className="welcome-buttons">
            <button onClick={() => navigate("/courses")} className="btn-primary">View Courses</button>
            <button onClick={() => navigate("/teetimes")} className="btn-secondary">Book Tee Times</button>
            <button onClick={() => navigate(`connections`)} className="btn-secondary">Connect With Other Golfers</button>
          </div>
        </section>
      </main>

      
    </div>
  )
}