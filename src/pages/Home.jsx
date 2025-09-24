import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

export default function Home({ user }) {
  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/courses').then(res => setCourses(res.data));
    axios.get(`http://localhost:3001/api/enrollments/user/${user.id}`).then(res => setProgressData(res.data));
  }, [user]);

  return (
    <div className="home">
      <style>{`
  .hero-section {
    position: relative;
    height: 350px;
    background-image: url("/home.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 16px;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
     z-index: 0;
  }

  .hero-overlay {
    background: rgba(0, 0, 0, 0.55);
    padding: 40px 20px;
    text-align: center;
    color: #fff;
    border-radius: 12px;
    max-width: 90%;
  }

  .hero-overlay h1 {
    font-size: 2.5rem;
    margin-bottom: 12px;
    font-weight: bold;
    line-height: 1.2;
  }

  .hero-overlay p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 0;
  }

  .home h2 {
    margin: 40px 0 20px;
    font-size: 1.8rem;
    font-weight: 600;
    color: #0077b6;
    text-align: center;
  }

  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    padding: 0 1rem 2rem;
    max-width: 1200px;
    margin: 0 auto 2rem; /* centered with bottom spacing */
  }
`}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to LMS</h1>
          <p>Learn, Track Progress, and Achieve Your Goals</p>
        </div>
      </section>

      {/* Courses Section */}
      <div>
        <h2>Available Courses</h2>
        <div className="course-grid">
          {courses.map(c => (
            <CourseCard
              key={c.id}
              id={c.id}
              title={c.title}
              description={c.description}
              thumbnail={c.thumbnail}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
