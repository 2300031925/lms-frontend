import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBook, FaFilePdf, FaVideo, FaChalkboardTeacher, FaClock, FaSignal, FaListUl } from 'react-icons/fa';

export default function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(console.error);
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <style>{`
        .course-page {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
          line-height: 1.6;
        }
        .course-hero {
          height: 400px;
          background-size: cover;
          background-position: center;
          border-radius: 16px;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #fff;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
          padding: 0 1rem;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.6));
        }
        .course-hero h1 {
          font-size: 2.8rem;
          margin-bottom: 0.8rem;
        }
        .course-hero p {
          max-width: 700px;
          font-size: 1.2rem;
        }
        .course-container {
          max-width: 1100px;
          margin: auto;
          padding: 0 1rem 2rem;
        }
        .course-flex {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
        }
        .course-info {
          flex: 1 1 300px;
          background: #fdfdfd;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border-top: 5px solid #0077b6;
        }
        .course-info:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
        }
        .course-info h2 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
          color: #0077b6;
        }
        .course-info ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .course-info li {
          margin: 12px 0;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.05rem;
          color: #333;
        }
        .course-info a {
          color: #e63946;
          text-decoration: none;
          font-weight: 500;
        }
        .course-info a:hover {
          text-decoration: underline;
        }
        .course-video {
          flex: 1 1 500px;
        }
        .course-video h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0077b6;
        }
        .course-video iframe {
          border-radius: 12px;
          width: 100%;
          height: 315px;
          border: none;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="course-page">
        {/* Hero */}
        <div
          className="course-hero"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${course.thumbnail})` }}
        >
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>

        {/* Content */}
        <div className="course-container">
          <div className="course-flex">
            <div className="course-info">
              <h2>Course Info</h2>
              <ul>
                <li><FaChalkboardTeacher /> Instructor: {course.instructor}</li>
                <li><FaClock /> Duration: {course.duration}</li>
                <li><FaSignal /> Level: {course.level}</li>
                <li><FaListUl /> Lessons: {course.lessons}</li>
                <li><FaBook /> {course.description}</li>
              </ul>

              {course.document && (
                <p style={{ marginTop: 20 }}>
                  <FaFilePdf />{' '}
                  <a href={course.document} target="_blank" rel="noopener noreferrer">
                    Download Materials
                  </a>
                </p>
              )}
            </div>

            {course.video && (
              <div className="course-video">
                <h2><FaVideo /> Course Video</h2>
                <iframe
                  src={course.video}
                  title="Course Video"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
