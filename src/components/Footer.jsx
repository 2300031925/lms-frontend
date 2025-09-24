import React from "react";

export default function Footer() {
  return (
    <footer>
      <style>{`
        .footer {
          background-color: #023047;
          color: #fff;
          padding: 2rem 1rem 1rem 1rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 1200px;
          margin: auto;
          gap: 1.5rem;
        }

        .footer-left {
          flex: 1 1 250px;
        }

        .footer-logo {
          font-size: 1.8rem;
          font-weight: bold;
          color: #ffb703;
          margin-bottom: 0.5rem;
        }

        .footer-left p {
          color: #fff;
          font-size: 1rem;
          margin: 0;
        }

        .footer-social {
          flex: 1 1 200px;
        }

        .footer-social h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #ffb703;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icons a img {
          width: 32px;
          height: 32px;
          transition: transform 0.2s ease;
        }

        .social-icons a img:hover {
          transform: scale(1.1);
        }

        .footer-bottom {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.9rem;
          color: #d3d3d3;
        }

        @media (max-width: 600px) {
          .footer-container {
            flex-direction: column;
            align-items: center;
          }
          .footer-social {
            text-align: center;
          }
        }
      `}</style>

      <div className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h2 className="footer-logo">LMS</h2>
            <p>Your learning journey starts here.</p>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><img src="/facebook.png" alt="Facebook" /></a>
              <a href="#"><img src="/twitter.png" alt="Twitter" /></a>
              <a href="#"><img src="/linkedin.png" alt="LinkedIn" /></a>
              <a href="#"><img src="/instagram.png" alt="Instagram" /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} LMS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
