import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import CadastroPage from './CadastroPage';
import CadastroPageDois from './CadastroPageDois';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/cadastroDois" element={<CadastroPageDois />} />
      </Routes>
    </Router>
  );
}


export default App;
