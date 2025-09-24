import React from "react";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Our LMS</h1>
        <p>
          Welcome to our learning dashboard — your one-stop platform to track and improve your learning journey.
        </p>
      </div>

      {/* Description Section */}
      <div className="about-content">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide students and educators with an intuitive platform
          to manage courses, track progress, and enhance learning outcomes.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>Interactive course tracking and analytics</li>
          <li>Visual progress charts and recommendations</li>
          <li>User-friendly interface for students and instructors</li>
          <li>Secure authentication and personalized profiles</li>
        </ul>
        <h2>Made By</h2>
<ul>
  <li>2300031734 - Gudivada Venkata Naga Bhuvana Sri Ram</li>
  <li>2300031925 - Vakani V H S Srikar</li>
  <li>2300033178 - Venkat Varshith Borra</li>
</ul>
        
      </div>
    </div>
  );
}
