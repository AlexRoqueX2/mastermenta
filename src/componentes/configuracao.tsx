import React, { useState } from "react";

interface ConfiguracaoProps {
  onConfigurar: (config: { numCores: number; numLinhas: number; numTentativas: number }) => void;
}

const Configuracao: React.FC<ConfiguracaoProps> = ({ onConfigurar }) => {
  const [numCores, setNumCores] = useState(6); // Quantidade de cores
  const [numLinhas, setNumLinhas] = useState(4); // Quantidade de linhas no tabuleiro
  const [numTentativas, setNumTentativas] = useState(4); //  Quantidade de tentativas no tabuleiro

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onConfigurar({ numCores, numLinhas , numTentativas });
  };

  return (
    <div>
      <h2>Configuração do Jogo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numCores">Número de Cores:</label>
          <input
            type="number"
            id="numCores"
            value={numCores}
            onChange={(e) => setNumCores(Number(e.target.value))}
            min={2}
            max={10}
            required
          />
        </div>
        <div>
          <label htmlFor="numLinhas">Número de Linhas:</label>
          <input
            type="number"
            id="numLinhas"
            value={numLinhas}
            onChange={(e) => setNumLinhas(Number(e.target.value))}
            min={2}
            max={10}
            required
          />
        </div>
        <div>
          <label htmlFor="numLinhas">Número de Tentativas:</label>
          <input
            type="number"
            id="numTentativas"
            value={numTentativas}
            onChange={(e) => setNumTentativas(Number(e.target.value))}
            min={2}
            max={10}
            required
          />
        </div>
        <button type="submit">Iniciar Jogo</button>
      </form>
    </div>
  );
};

export default Configuracao;
