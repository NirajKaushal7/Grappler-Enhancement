import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addImage } from '../../api/api';
import './../../css/companyLogo.css'
import { useDispatch } from 'react-redux';
import { addLogo } from '../../slices/companySlice';
function CompanyLogo() {
  const navigate = useNavigate() ; 
  const dispatch = useDispatch() ; 
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const { compId } = useParams();

  const handleUpload = async () => {
    if (selectedFile) {
      // Check the size here (for example, limit to 1MB)
      if (selectedFile.size <= 1048576) {
        try {
          const response = await addImage(compId, selectedFile);
          // console.log(selectedFile) ; 
          // dispatch(addLogo(compId, selectedFile)) ; 
          
          navigate(`/company`) ; 
           
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
        alert("File size exceeds the allowed limit (1MB).");
      }
    } else {
      alert("No file selected.");
    }
  };

  return (
    <div className="company-logo-container">
      <div className="file-input-container">
        <input type="file" id="file-input" onChange={handleFileChange} />
        <label htmlFor="file-input" className="file-label">
          Choose File
        </label>
      </div>
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
    </div>
  );
}

export default CompanyLogo;
