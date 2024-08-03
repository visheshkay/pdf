import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './UploadPdf.css';

const UploadPDF = () => {
  const [pdf, setPdf] = useState(null);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    setPdf(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    onDrop,
  });

  const handleView = () => {
    if (pdf) {
      navigate('/view', { state: { pdf } });
    }
  };

  return (
    <div className="upload-container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag & drop a PDF file here, or click to select one</p>
      </div>
      <button className="view-button" onClick={handleView} disabled={!pdf}>
        View PDF
      </button>
    </div>
  );
};

export default UploadPDF;
