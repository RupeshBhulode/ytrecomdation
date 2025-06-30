import React from "react";
import pagecodeLogo from "../components/pagecode.png";
import photo from "../components/photo.png";
import "../pagecss/About.css";
import { FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      {/* 1. Page Title */}
      <header className="about-header">
        <h1>About TubeLens</h1>
      </header>

      {/* 2. Introduction Paragraph */}
      <section className="about-section intro-section">
        <p className="intro-text">
          <strong>TubeLens</strong> is a web application that helps you analyze
          YouTube comments with ease. It classifies comments into categories such
          as Hate Speech, Requests, Questions, and Feedback, giving content
          creators and analysts clear insights into audience engagement.
        </p>
      </section>

      {/* 3. Features Section */}
      <section className="about-section features-section">
        <h2>Features</h2>
        <ul>
          <li>Fetch and display comments from YouTube videos</li>
          <li>Classify comments into categories: Hate Speech, Requests, Questions, Feedback</li>
          <li>View trends across multiple videos using multi-line charts</li>
          <li>Analyze individual videos with charts and top categorized comments</li>
          <li>Get the most liked comments based on sentiment type</li>
          <li>Track comment activity trends over 7 or 30 days</li>
        </ul>
      </section>

      {/* 4. Technologies Section */}
      <section className="about-section technologies-section">
        <h2>Technologies Used</h2>
        <ul>
          <li>React.js – frontend UI development</li>
          <li>Node.js / Express – backend support for video and comment routing</li>
          <li>FastAPI – comment classification and data analysis using Python</li>
          <li>YouTube Data API – fetching video, channel, and comment data</li>
          <li>Machine Learning Models – natural language processing for comment categorization</li>
        </ul>
      </section>













      {/* 5. Channel Info */}
     <section className="about-section channel-section">
  <h2>Channel Information</h2>
  <div className="channel-details">
    <img
      src={pagecodeLogo}
      alt="Channel Logo"
      className="channel-logo"
    />
    <div className="channel-meta">
      <p><strong>Channel Name:</strong> Page Code</p>
      <div className="visit-channel">
        <a
          href="https://www.youtube.com/@PageCode"
          target="_blank"
          rel="noopener noreferrer"
          className="channel-button"
        >
          Visit Channel
        </a>
      </div>
    </div>
  </div>
</section>











      {/* 6. Developer Info */}
      <section className="about-section developer-section">
        <h2>About the Developer</h2>
        <div className="developer-details">
          <img
            src={photo}
            alt="Developer"
            className="developer-photo"
          />
          <div className="developer-meta">
            <p>
              Hi, I'm <strong>Rupesh Bhulode</strong>, a software developer
              passionate about building tools that empower creators. I designed
              TubeLens to make YouTube comment analysis accessible and intuitive.
            </p>



















<div className="social-icons">
  <a
    href="https://www.youtube.com/@PageCode"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="youtube-icon"
  >
    <FaYoutube />
  </a>
  <a
    href="https://www.linkedin.com/in/rupesh-bhulode-a4a269232/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="linkedin-icon"
  >
    <FaLinkedin />
  </a>
  <a
    href="https://github.com/RupeshBhulode"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
    className="github-icon"
  >
    <FaGithub />
  </a>
</div>





















          </div>
        </div>
      </section>

      {/* 7. Contact */}
      <section className="about-section contact-section">
        <h2>Contact</h2>
        <p>Email: <a href="mailto:pagecode58@gmail.com">pagecode58@gmail.com</a></p>
        <p>Follow me on social media for updates and tutorials.</p>
      </section>

      {/* 8. Version and Credits */}
      <section className="about-section credits-section">
        <h2>Version & Credits</h2>
        <p>TubeLens Version: 1.0.0</p>
        <p>
          Built with ❤️ using React, FastAPI, and the YouTube Data API. Icons
          from react-icons.
        </p>
      </section>

      <footer className="footer">
  © 2025 Rupesh Bhulode. All rights reserved. TubeLens v1.0
</footer>
    </div>
  );
};

export default About;
