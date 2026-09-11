// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* Top navigation with Login/Register */}
      <header className="home-header">
        <nav className="home-nav">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </nav>
      </header>

      {/* Hero section with image */}
      <section className="home-hero">
        <img src="/images/portal-hero.png" alt="Learners Portal" className="hero-image" />
        <h1>Welcome to Learners Portal</h1>
        <p>Your one-stop solution for backlog materials and student support.</p>
      </section>

      {/* Info section */}
      <section className="home-info">
        <h2>About This Project</h2>
        <p>
          The Learners Portal is designed to help students access backlog materials,
          track academic progress, and stay connected with administrators. 
          It simplifies the process of managing academic records and ensures 
          students can focus on learning.
        </p>
      </section>
    </div>
  );
}
