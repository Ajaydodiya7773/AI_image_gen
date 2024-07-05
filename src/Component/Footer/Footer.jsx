import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} AI Text to image Generator.</p>
        <nav className="footer-nav">
          <a href="/about" className="footer-link">About</a>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/terms-of-service" className="footer-link">Terms of Service</a>
          <a href="/contact" className="footer-link">Contact</a>
        </nav>
        <div className="social-media">
          <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="footer-link">OpenAI</a>
          <a href="https://facebook.com/AjaySinghDodiya" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>
          <a href="https://instagram.com/ajay.rajputt7773" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          <a href="https://deepai.org/" target="_blank" rel="noopener noreferrer" className="footer-link">Dalle3</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
