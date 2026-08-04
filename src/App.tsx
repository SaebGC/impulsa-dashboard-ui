import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './routes/login';
import { EstudianteDashboard } from './pages/dashboards/EstudianteDashboard';
import { DirectorDashboard } from './pages/dashboards/DirectorDashboard';
import { DocenteDashboard } from './pages/dashboards/DocenteDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard/estudiante" element={<EstudianteDashboard />} />
        <Route path="/dashboard/director" element={<DirectorDashboard />} />
        <Route path="/dashboard/docente" element={<DocenteDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;