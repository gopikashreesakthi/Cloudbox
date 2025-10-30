import { useEffect, useState } from 'react';
import axios from 'axios';

function FileList({ refreshFlag }) {
  const [files, setFiles] = useState([]);
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch files from backend whenever refreshFlag changes
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`${API_BASE}/files`);
        setFiles(res.data);
      } catch (err) {
        console.error('Error fetching files:', err);
      }
    };

    fetchFiles();
  }, [refreshFlag, API_BASE]);

  // Download file from backend
  const handleDownload = async (name) => {
    try {
      const res = await axios.get(`${API_BASE}/download/${name}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Download failed!');
    }
  };

  return (
    <div className="file-list">
      <h2>Uploaded Files</h2>
      <div className="file-cards">
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          files.map(f => (
            <div className="file-card" key={f.name}>
              <div className="file-icon">📄</div>
              <div className="file-info">
                <p>{f.name}</p>
                <button className="download-btn" onClick={() => handleDownload(f.name)}>
                  Download
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FileList;
