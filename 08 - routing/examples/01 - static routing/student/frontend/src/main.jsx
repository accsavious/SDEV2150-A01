import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AdminPage from '../pages/AdminPage.jsx';
import ResourceDirectoryPage from '../pages/ResourceDirectoryPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<ResourceDirectoryPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
