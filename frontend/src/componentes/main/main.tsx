import React from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';
import MainGame from '../compMasterMenta/mainGame';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleConfig = () => {
    console.log('Redirecionando para a tela de cadastro...');
    navigate('/configuracao')
  };

  const handlejogar = () => {
    console.log('Redirecionando para a tela de configuração do jogo...');
    navigate('/mainJogo')
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem vindo {JSON.parse(localStorage.getItem('user') || '{}')?.username} :D</h1>
        <div className="header-buttons">
          <h1 style={{ cursor: 'pointer' }} onClick={handleConfig}>⚙</h1>
        </div>
      </header>
      <main className='home-container'>
        <h1> Regras do Master menta</h1>

        <h2> O Master menta é um jogo baseado no mastermind tradicional</h2>
        <h2> Como no original existem as pretas ( cores que você acertou ) e brancas ( cores que você acertou porém errou a posição)</h2>
        <h2> A ideia do jogo é descobrir a senha sem auxilio visual , como um arrombador se utilizando da lógica pra abrir um cadeado</h2>
        {/*<h1>
          Players cadastrados
        </h1>
          placar e mostaria playes cadastrados
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>player 1</h1>
          <h1 style={{ cursor: 'pointer' }}>🗑</h1>
        </div>*/}
        <button onClick={handlejogar}> jogar </button>
      </main>

    </div>
  );
};

export default Home;
