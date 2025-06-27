import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AirbnbImage from '../assets/images/Airbnb.png';
import PrimeVideoImage from '../assets/images/PrimeVideo.png';
import ByblosImage from '../assets/images/Byblos.png';
import DocmigoImage from '../assets/images/Docmigo.png';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef(null);

useEffect(() => {
  fetch("https://portfolio-admin-backend-78om.onrender.com/api/projects")
    .then(res => res.json())
    .then(data => setProjects(data))
    .catch(err => console.error("Error fetching projects:", err));
}, []);


  const handleCardHover = (index) => {
    setActiveProject(index);
    if (containerRef.current) {
      const card = containerRef.current.children[index];
      const container = containerRef.current;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: cardLeft - (containerWidth / 2) + (cardWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-container" ref={containerRef}>
          {projects.map((project, index) => (
            <div
              key={project._id || index}
              className={`project-card ${activeProject === index ? 'active' : ''}`}
              onMouseEnter={() => handleCardHover(index)}
            >
              <div className="project-number">{index + 1}</div>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <Link to={`/projects/${project._id}`} className="project-link"></Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;