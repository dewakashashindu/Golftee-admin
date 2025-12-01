"use client";
import { useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function SupportPage() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: "How do I book a tee time?",
      answer: "Go to the Bookings page, select your preferred date and time, and follow the instructions to confirm your reservation."
    },
    {
      question: "How can I reset my password?",
      answer: "Click on 'Reset Password' in the login screen and follow the instructions sent to your email."
    },
    {
      question: "How do I contact support?",
      answer: "Use the contact form below or email support@golftee.com. Our team will respond within 24 hours."
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to the Edit Information page to update your personal details and profile picture."
    },
    {
      question: "Where can I find tournament details?",
      answer: "Tournament schedules and details are available on the Tournaments page."
    }
  ];

  return (
    <div className="support-page">
      <title>Support & Help Center</title>
      
      {/* Background Circles */}
      <div className="bg-circle-left" />
      <div className="bg-circle-right" />
      
      <Navigation currentPage="support" />
      
      <div className="support-container">
        <div className="page-header">
        <h1 className="page-title">Support & Help Center</h1>
        <p className="page-description">Find answers to common questions, contact support, or send us your feedback.</p>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="contact-section">
        <h2 className="section-title">Contact Support</h2>
        <div className="contact-info">
          <p>Email: <a href="mailto:support@golftee.com">support@golftee.com</a></p>
          <p>Phone: <a href="tel:+94775698201">+94 77 569 8201</a></p>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="feedback-section">
        <h2 className="section-title">Send Us Your Feedback</h2>
        {submitted ? (
          <div className="feedback-success">Thank you for your feedback!</div>
        ) : (
          <form
            className="feedback-form"
            onSubmit={e => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <textarea
              className="feedback-textarea"
              rows={4}
              placeholder="Let us know how we can improve..."
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              required
            />
            <button type="submit" className="feedback-btn">Submit Feedback</button>
          </form>
        )}
      </section>
      </div>

      <Footer />

      <style jsx>{`
        .support-page {
          min-height: 100vh;
          background: #f0f0f0;
          position: relative;
          overflow: hidden;
        }
        
        .bg-circle-left {
          position: absolute;
          left: -300px;
          top: -250px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 1;
          z-index: 1;
        }

        .bg-circle-right {
          position: absolute;
          right: -200px;
          bottom: 150px;
          width: 800px;
          height: 800px;
          background: #b8e6c1;
          border-radius: 50%;
          opacity: 1;
          z-index: 1;
        }
        
        .support-container {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem 4rem 1rem;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .page-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .page-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #16a34a;
          margin-bottom: 0.5rem;
        }
        .page-description {
          color: #374151;
          font-size: 1.1rem;
        }
        .section-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #15803d;
          margin-bottom: 1.2rem;
        }
        .faq-section {
          margin-bottom: 2.5rem;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .faq-item {
          background: #f3f4f6;
          border-radius: 8px;
          padding: 1rem 1.2rem;
        }
        .faq-question {
          font-size: 1.05rem;
          font-weight: 500;
          color: #111;
          margin-bottom: 0.3rem;
        }
        .faq-answer {
          color: #374151;
          font-size: 0.98rem;
        }
        .contact-section {
          margin-bottom: 2.5rem;
        }
        .contact-info {
          background: #f3f4f6;
          border-radius: 8px;
          padding: 1rem 1.2rem;
          font-size: 1rem;
        }
        .contact-info a {
          color: #16a34a;
          text-decoration: none;
        }
        .contact-info a:hover {
          text-decoration: underline;
        }
        .feedback-section {
          margin-bottom: 2rem;
        }
        .feedback-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .feedback-textarea {
          border-radius: 8px;
          border: 1.5px solid #b8e6c1;
          padding: 1rem;
          font-size: 1rem;
          resize: vertical;
        }
        .feedback-btn {
          background: #16a34a;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .feedback-btn:hover {
          background: #15803d;
        }
        .feedback-success {
          color: #16a34a;
          font-weight: 600;
          background: #f3f4f6;
          border-radius: 8px;
          padding: 1rem 1.2rem;
          text-align: center;
        }
        @media (max-width: 640px) {
          .support-container {
            padding: 1rem 0.2rem 2rem 0.2rem;
          }
          .page-title {
            font-size: 1.5rem;
          }
          .section-title {
            font-size: 1.1rem;
          }
          .faq-item, .contact-info, .feedback-success {
            padding: 0.7rem 0.6rem;
          }
          .feedback-btn {
            padding: 0.6rem 1rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
