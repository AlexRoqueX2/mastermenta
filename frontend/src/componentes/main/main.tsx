import React from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleConfig = () => {
    console.log('Redirecionando para a tela de cadastro...');
    navigate('/configuracao')
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem vindo {JSON.parse(localStorage.getItem('user') || '{}')?.username} :D</h1>
        <div className="header-buttons">
          <h1 style={{ cursor: 'pointer' }} onClick={handleConfig}>⚙</h1>
        </div>
      </header>
      <main style={{ margin: '0 16px' }}>
        <h1>
          Players cadastrados
        </h1>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>player 1</h1>
          <h1 style={{ cursor: 'pointer' }}>🗑</h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
