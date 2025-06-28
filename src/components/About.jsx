import React, { useState, useEffect } from 'react';
import aboutImage from '../assets/images/IMG_0410.png';
import './About.css';

const About = () => {
  const [skills, setSkills] = useState([
    // Static fallback skills
    'UX Research', 'UI Design', 'Figma', 'Usability Testing',
    'User Flows', 'Wireframing', 'Prototyping', 'Product Design'
  ]);

  useEffect(() => {
    fetch("https://portfolio-admin-backend-78om.onrender.com/api/skills")
      .then(res => res.json())
      .then(data => {
        const newSkills = data.map(skill => skill.name);
        setSkills(prev => [...prev, ...newSkills]);
      })
      .catch(err => console.error("Error fetching skills:", err));
  }, []);

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I'm a UX/UI designer based in Toronto, Canada, currently pursuing a Post Graduate Certificate in User Experience Design at Humber College. With a Bachelor's in Industrial and Product Design and 2.5 years of industry experience, I specialize in creating intuitive digital experiences across healthcare, education, finance, and more.</p>
            <p>My approach combines design thinking with technical expertise, allowing me to bridge the gap between user needs and business goals. I'm proficient in methodologies like usability testing, competitive analysis, user interviews, and heuristic evaluation.</p>
            <div className="skills">
              {skills.map((skill, index) => (
                <span key={index} className="skill">{skill}</span>
              ))}
            </div>
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="Rutul Manani" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;