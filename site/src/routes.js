import { 
    Routes,
    Route
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './CadastroPage';
import CadastroPageDois from './CadastroPageDois';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/cadastroDois" element={<CadastroPageDois />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}