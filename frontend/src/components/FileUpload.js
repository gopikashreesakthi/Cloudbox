import { useState, useRef } from 'react';
import axios from 'axios';

function FileUpload({ refreshFiles }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef();
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setFile(e.dataTransfer.files[0]);
  };

  // handle file upload
  const handleUpload = async (e) => {
    e.stopPropagation(); // prevent triggering container click
    if (!file) {
      alert('⚠️ Please choose a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_BASE}/upload`, formData, {
        onUploadProgress: (event) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      });

      alert(`✅ File "${file.name}" uploaded successfully!`);
      setFile(null);
      setProgress(0);
      refreshFiles();
    } catch (err) {
      alert('❌ Upload failed! Please try again.');
    }
  };

  // open file chooser when container clicked
  const handleContainerClick = (e) => {
    // only open dialog if click is not on the Upload button
    if (e.target.classList.contains('upload-btn')) return;
    inputRef.current.click();
  };

  return (
    <div
      className={`upload-container ${dragOver ? 'drag-over' : ''}`}
      onClick={handleContainerClick}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input"
      />

      <p>
        {file
          ? `Selected: ${file.name}`
          : '📂 Choose a file to upload (or drag & drop here)'}
      </p>

      <button className="upload-btn" onClick={handleUpload}>
        Upload
      </button>

      {progress > 0 && (
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
