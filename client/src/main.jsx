import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import "./styles/styles.css";
import "./styles/navbar.css";
import "./styles/allProjects.css";
import "./styles/infoPart.css";
import "./styles/moreInfo.css";
import "./styles/updateIssue.css";

createRoot(document.getElementById('root')).render(
    <App />
);