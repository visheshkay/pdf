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
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const fetchAcronyms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/acronyms');
        const acronyms = response.data;

        const map = new Map(acronyms.map(acronym => [acronym.acronym, acronym.definition]));
        setAcronymMap(map);
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

    if (acronymMap.has(key)) {
      setDefinition(acronymMap.get(key));
    } else {
      setDefinition('Definition not found');
    }
  };

  const readClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSelectedText(text);
      console.log('Clipboard text:', text);
    } catch (err) {
      console.error('Failed to read clipboard contents:', err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Trigger readClipboard every 5 seconds
      readClipboard();
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

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
              <button onClick={readClipboard}>Refresh word</button> {/* Button to manually read clipboard */}
              {acronymMap.has(selectedText) ? <h1 className="definition-display">{acronymMap.get(selectedText)}</h1> : <h1 className="definition-display">Definition not Found</h1>}
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
