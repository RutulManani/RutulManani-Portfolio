import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    fetch("https://portfolio-admin-backend-78om.onrender.com/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
        left: cardLeft - containerWidth / 2 + cardWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <div className="loading-message">Loading projects...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (projects.length === 0) return <div className="empty-message">No projects found.</div>;

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-container" ref={containerRef}>
          {projects.map((project, index) => (
            <div
              key={project._id}
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
                  {project.tags?.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-url">
                    Visit Project
                  </a>
                )}
              </div>
              <Link to={`/projects/${project._id}`} className="project-link" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;