// src/components/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/ErrorPage.css'; // Optional: Import a CSS file for styling

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="back-home-link">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
