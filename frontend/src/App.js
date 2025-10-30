import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import './style.css';
import { useState } from 'react';

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshFiles = () => setRefreshFlag(prev => !prev);

  return (
    <div className="container">
      <header>
        <h1>CloudBox 📦</h1>
        <p>Upload, store, and share your files securely</p>
      </header>
      <FileUpload refreshFiles={refreshFiles} />
      <FileList refreshFlag={refreshFlag} />
      <footer>
        <p>© 2025 CloudBox. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
