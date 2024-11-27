import React, { useState } from "react";
import Configuracao from "./componentes/configuracao";
import Mastermind from "./componentes/mastermind";

const App: React.FC = () => {
  const [config, setConfig] = useState<{ numCores: number; numLinhas: number; numTentativas: number } | null>(null);

  const handleConfigurar = (novaConfig: { numCores: number; numLinhas: number; numTentativas: number }) => {
    setConfig(novaConfig);
  };

  return (
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
  );
};

export default App;

