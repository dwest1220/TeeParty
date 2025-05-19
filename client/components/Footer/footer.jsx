import "./footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h4>TeeParty</h4>
          <p>Connecting golfers, one swing at a time.</p>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:help@teeparty.com">help@teeparty.com</a></p>
          <p>Phone: <a href="tel:6158337789">(615) 833-7789</a></p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/teetimes">Tee Times</a></li>
            <li><a href="/connections">Connect</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TeeParty. All rights reserved.</p>
        <p>Terms of Service | Privacy Policy</p>
      </div>
    </footer>
  )
}
