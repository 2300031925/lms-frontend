import React from "react";
import { useNavigate } from "react-router-dom";

const courseColors = {
  Mathematics: "#ac1a1aff",
  Physics: "#f39c12",
  Chemistry: "#27ae60",
  Biology: "#8e44ad"
  // add more courses and colors as needed
};

export default function CourseCard({ id, title, description, image }) {
  const navigate = useNavigate();
  const heroColor = courseColors[title] || "#3498db";

  const handleStart = () => navigate(`/courses/${id}`);

  return (
    <div>
      <style>{`
        .course-card {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          background: #fff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          max-width: 320px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }
        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.15);
        }
        .course-hero {
          padding: 14px 18px;
          font-weight: bold;
          font-size: 1.3rem;
          text-align: center;
          color: #fff;
        }
        .course-info {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .course-info p {
          font-size: 0.95rem;
          color: #444;
          margin: 0 0 12px;
          line-height: 1.4;
        }
        .course-img {
          width: 100%;
          height: 160px;
          border-radius: 8px;
          margin-bottom: 12px;
          object-fit: cover;
        }
        .course-btn {
          background: #0077b6;
          color: #fff;
          border: none;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .course-btn:hover {
          background: #005f8e;
        }

        /* Responsive adjustments */
        @media (max-width: 360px) {
          .course-card {
            max-width: 95%;
          }
          .course-hero {
            font-size: 1.1rem;
          }
          .course-btn {
            padding: 8px 12px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="course-card">
        {image && <img src={image} alt={title} className="course-img" />}
        <div
          className="course-hero"
          style={{ backgroundColor: heroColor }}
        >
          {title}
        </div>
        <div className="course-info">
          <p>{description}</p>
          <button className="course-btn" onClick={handleStart}>
            Start Course
          </button>
        </div>
      </div>
    </div>
  );
}
