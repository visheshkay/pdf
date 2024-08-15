
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewPDF.css';

const ViewPDF = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pdf } = state || {};
  
  const [acronymMap, setAcronymMap] = useState(new Map());
  const [searchKey, setSearchKey] = useState('');
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    const fetchAcronyms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/acronyms');
        const acronyms = response.data;
        
        // Convert array of acronyms to a Map
        const map = new Map(acronyms.map(acronym => [acronym.acronym, acronym.definition]));
        setAcronymMap(map);
        
        // Log the acronym map to the console
        console.log('Acronym Map:', map);
      } catch (error) {
        console.error('Error fetching acronyms:', error);
      }
    };

    fetchAcronyms();
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const handleInputChange = (event) => {
    const key = event.target.value;
    setSearchKey(key);

    // Find the definition from the acronymMap
    if (acronymMap.has(key)) {
      setDefinition(acronymMap.get(key));
    } else {
      setDefinition('Definition not found');
    }
  };

  return (
    <div className="view-container">
      <button className="back-button" onClick={handleBack}>
        Back to Upload
      </button>
      <div className="pdf-container">
        {pdf ? (
          <>
            <iframe
              src={pdf}
              title="PDF Viewer"
              className="pdf-viewer"
            />
            <div className="input-container">
              <input 
                type="text" 
                value={searchKey} 
                onChange={handleInputChange} 
                placeholder="Enter acronym" 
                className="acronym-input"
              />
              <h1 className="definition-display">{definition}</h1>
            </div>
          </>
        ) : (
          <p>No PDF file selected</p>
        )}
      </div>
    </div>
  );
};

export default ViewPDF;

