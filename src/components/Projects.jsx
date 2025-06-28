import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AirbnbImage from '../assets/images/Airbnb.png';
import PrimeVideoImage from '../assets/images/PrimeVideo.png';
import ByblosImage from '../assets/images/Byblos.png';
import DocmigoImage from '../assets/images/Docmigo.png';
import './Projects.css';

const Projects = () => {
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  // Static data
  const staticProjects = [
    {
      id: 'static-1',
      title: "Airbnb UX Research",
      description: "Conducted comprehensive UX research to improve Airbnb's booking experience through competitive analysis and user interviews.",
      tags: ["UX Research", "Competitive Analysis", "User Interviews"],
      image: AirbnbImage
    },
    {
      id: 'static-2',
      title: "Prime Video Usability",
      description: "Performed usability testing and heuristic evaluation to enhance content discovery and watchlist management features.",
      tags: ["Usability Testing", "Heuristic Evaluation", "Affinity Mapping"],
      image: PrimeVideoImage
    },
    {
      id: 'static-3',
      title: "Byblos Restaurant",
      description: "Redesigned the ordering experience for Byblos restaurant, implementing a seamless online ordering system.",
      tags: ["UI/UX Design", "User Flows", "Wireframing"],
      image: ByblosImage
    },
    {
      id: 'static-4',
      title: "Docmigo Hospital App",
      description: "Designed a comprehensive communication and management app for doctors and receptionists to streamline hospital operations.",
      tags: ["UX Research", "UI Design", "Stakeholder Interviews"],
      image: DocmigoImage
    }
  ];

  // Fetch from backend
  useEffect(() => {
    fetch("https://portfolio-admin-backend-78om.onrender.com/api/projects")
      .then(res => res.json())
      .then(data => setDynamicProjects(data))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const combinedProjects = [...staticProjects, ...dynamicProjects];

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
          {combinedProjects.map((project, index) => (
            <div 
              key={project._id || project.id}
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
              </div>
              <Link to={`/projects/${project._id || project.id}`} className="project-link" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;