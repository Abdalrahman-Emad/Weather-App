import React from 'react';
import './NotFound.css';
import NotFoundImg from '../../assets/15.png';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img src={NotFoundImg} alt="Page Not Found" className="not-found-image" />
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you’re looking for doesn’t exist.</p>
        <a href="/" className="not-found-button">Go Back to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
