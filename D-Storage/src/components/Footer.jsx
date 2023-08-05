import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the feedback in localStorage
    localStorage.setItem('userFeedback', feedback);
    // Clear the input field
    setFeedback('');
    alert('Thank you for your feedback!');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Frequently Asked Questions</h3>
          <ul>
            <li>How do I upload files?</li>
            <li>How can I share files with others?</li>
            <li>Is my data secure on this platform?</li>
            {/* Add more FAQs as needed */}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Guides</h3>
          <ul>
            <li>Getting Started Guide</li>
            <li>File Sharing Guide</li>
            <li>Creating Folders Guide</li>
            {/* Add more guides as needed */}
          </ul>
        </div>
        <div className="footer-section">
          <h3>Feedback</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="feedback-input"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={handleChange}
            />
            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </form>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>If you need any assistance or have any questions, feel free to reach out to us:</p>
          <p>Email: support@example.com</p>
          {/* You can also add a contact form here */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Decentralized Google Drive 3.0. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
