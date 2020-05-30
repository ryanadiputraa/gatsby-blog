import React from 'react'

const Footer = () => (
  <div className="site-footer">
  © {new Date().getFullYear()} Ryan Adi Putra
          {` `}
    <p className="text-center">Follow on social media</p>
    <div className="footer-social-links">
      <ul className="social-links-list">
        <li><a href="https://www.facebook.com/ryan.adiputra.1426" target="_blank" rel="noopener noreferrer" className="facebook">
          <i className="fab fa-facebook-f fa-2x"></i>
        </a></li>
        <li><a href="https://twitter.com/RyanAdi33024016" target="_blank" rel="noopener noreferrer" className="twitter">
          <i className="fab fa-twitter fa-2x"></i>
        </a></li>
        <li><a href="https://www.instagram.com/bukanryan/" target="_blank" rel="noopener noreferrer" className="instagram">
          <i className="fab fa-instagram fa-2x"></i>
        </a></li>
        <li><a href="https://www.linkedin.com/in/ryan-adi-putra-92318b19a/" target="_blank" rel="noopener noreferrer" className="linkedin">
          <i className="fab fa-linkedin fa-2x"></i>
        </a></li>
        <li><a href="https://github.com/ryanadiputraa" target="_blank" rel="noopener noreferrer" className="github">
          <i className="fab fa-github fa-2x"></i>
        </a></li>
      </ul>
    </div>
  </div>
)

export default Footer