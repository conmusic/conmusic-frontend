import { 
    Routes,
    Route
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import CadastroPageDois from './pages/CadastroPageDois';
import Dash from './pages/Dash';
import Propostas from './pages/propostas';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<CadastroPage />} />
        <Route path="/register-two-step" element={<CadastroPageDois />} />
      <Route path="/dashboard" element={<Dash />} />
      <Route path="/propostas" element={<Propostas />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
