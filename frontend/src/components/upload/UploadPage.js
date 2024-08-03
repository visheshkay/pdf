import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './UploadPdf.css';

const UploadPDF = () => {
  const [pdf, setPdf] = useState(null);
  const [file, setFile] = useState(null); // To store the actual file
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setPdf(URL.createObjectURL(uploadedFile));
    setFile(uploadedFile);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    onDrop,
  });

  const handleView = async () => {
    if (pdf) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:4000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload success:', response.data);

        // Navigate to view page with the uploaded PDF URL
      } catch (error) {
        console.error('Error uploading file:', error);
      }
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
