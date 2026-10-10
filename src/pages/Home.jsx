// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";
import homePic from "../assets/home-pic.png";

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
        <h1>Welcome to Learners Portal</h1>
        <img src={homePic} alt="Learners Portal" className="hero-image" />
        <p>Your one-stop solution for backlog materials and student support.</p>
      </section>

      {/* Info section */}
      <section className="home-info">
        <h2>About This Project</h2>
        <p>
          The Learners Portal is designed to help students of AANM & VVRSR to access backlog materials releated to thiere department and can clear thiere backlogs by staying in Home.
          this portal gives all b-tech level meterials along with complete syllabus.
        </p>
      </section>
    </div>
  );
}
