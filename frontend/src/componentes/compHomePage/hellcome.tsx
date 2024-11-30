import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Redirecionando para a tela de login...');
    navigate('/login')
  };

  const handleRegister = () => {
    console.log('Redirecionando para a tela de cadastro...');
    navigate('/register')
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Master Mind</h1>
        <div className="header-buttons">
          <button onClick={handleLogin}>Logar</button>
          <button onClick={handleRegister}>Cadastrar</button>
        </div>
      </header>
      <main className="home-main">
        <h2>Bem-vindo ao Master Mind</h2>
        <p>Logue ou se cadastre para jogar.</p>
      </main>
    </div>
  );
};

export default Home;
