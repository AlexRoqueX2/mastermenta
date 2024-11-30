import React, { useState } from "react";
import './../main/main.css'
import { useNavigate } from 'react-router-dom';
import Configuracao from './configuracao';
import Mastermind from './mastermind';

const MainGame: React.FC = () => {
  const navigate = useNavigate();

  const [config, setConfig] = useState<{ numCores: number; numLinhas: number; numTentativas: number } | null>(null);

  const handleConfigurar = (novaConfig: { numCores: number; numLinhas: number; numTentativas: number }) => {
    setConfig(novaConfig);
  };

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

      <div>
      {config ? (
        <Mastermind
          numCores={config.numCores}
          numLinhas={config.numLinhas}
          numTentativas={config.numTentativas}
        />
      ) : (
        <Configuracao onConfigurar={handleConfigurar} />
      )} 
      </div>

    </div>
  );
};

export default MainGame;