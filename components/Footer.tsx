"use client";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Main Footer Content */}
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="32" height="32">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                  </svg>
                </div>
                <div className="logo-text">
                  <h3>GolfTee Admin</h3>
                  <p>Royal Colombo Golf Course</p>
                </div>
              </div>
              <p className="footer-description">
                Professional golf course management system for streamlined operations and enhanced member experience.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/home">Dashboard</a></li>
                <li><a href="/bookings">Bookings</a></li>
                <li><a href="/analytics">Analytics</a></li>
                <li><a href="/equipment">Equipment</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/support">Support</a></li>
              </ul>
            </div>

            {/* Account */}
            <div className="footer-section">
              <h4>Account</h4>
              <ul className="footer-links">
                <li><a href="/edit-information">Profile Settings</a></li>
                <li><a href="/notifications">Notifications</a></li>
                <li><a href="/reset-password">Reset Password</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4>Contact</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>royalgolf@gmail.com</span>
                </div>
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>0775698201</span>
                </div>
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                © 2025 Royal Colombo Golf Course. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
                <a href="/support">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
          margin-top: auto;
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          padding: 3rem 0 2rem 0;
        }

        .footer-section h4 {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin: 0 0 1rem 0;
          position: relative;
        }

        .footer-section h4::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 30px;
          height: 2px;
          background: #16a34a;
          border-radius: 1px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          background: #16a34a;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .logo-text h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .logo-text p {
          font-size: 0.9rem;
          color: #94a3b8;
          margin: 0.2rem 0 0 0;
        }

        .footer-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #cbd5e1;
          margin: 0;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.7rem;
        }

        .footer-links a {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s;
          display: inline-block;
        }

        .footer-links a:hover {
          color: #16a34a;
          transform: translateX(4px);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          color: #cbd5e1;
          font-size: 0.9rem;
        }

        .contact-item svg {
          color: #16a34a;
          flex-shrink: 0;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright {
          font-size: 0.9rem;
          color: #94a3b8;
          margin: 0;
        }

        .footer-bottom-links {
          display: flex;
          gap: 2rem;
        }

        .footer-bottom-links a {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s;
        }

        .footer-bottom-links a:hover {
          color: #16a34a;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .footer-container {
            padding: 0 1.5rem;
          }
          .footer-content {
            gap: 2.5rem;
            padding: 2.5rem 0 1.5rem 0;
          }
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 2fr 1fr 1fr;
            gap: 2rem;
          }
          .footer-section:last-child {
            grid-column: 1 / -1;
            margin-top: 1rem;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            padding: 0 1rem;
          }
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem 0 1.5rem 0;
          }
          .footer-section:first-child {
            grid-column: 1 / -1;
          }
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          .footer-bottom-links {
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem 0 1rem 0;
          }
          .footer-logo {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
          .footer-section {
            text-align: center;
          }
          .footer-section h4::after {
            left: 50%;
            transform: translateX(-50%);
          }
          .footer-links a {
            display: block;
            padding: 0.3rem 0;
          }
          .footer-links a:hover {
            transform: none;
            padding-left: 0;
          }
          .contact-info {
            align-items: center;
          }
          .footer-bottom-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 0 0.5rem;
          }
          .footer-content {
            padding: 1rem 0;
            gap: 1rem;
          }
          .logo-text h3 {
            font-size: 1.1rem;
          }
          .footer-section h4 {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}