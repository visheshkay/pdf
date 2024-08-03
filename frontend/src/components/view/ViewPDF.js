import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ViewPDF.css';

const ViewPDF = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pdf } = state || {};

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="view-container">
      <button className="back-button" onClick={handleBack}>
        Back to Upload
      </button>
      {pdf ? (
        <iframe
          src={pdf}
          title="PDF Viewer"
          className="pdf-viewer"
        />
      ) : (
        <p>No PDF file selected</p>
      )}
    </div>
  );
};

export default ViewPDF;
