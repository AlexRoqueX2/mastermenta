import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Configuracao from "./componentes/compMasterMenta/configuracao";
import Mastermind from "./componentes/compMasterMenta/mastermind";
import Login from "./componentes/compHomePage/login"
import Cadastro from "./componentes/compHomePage/Cadastro";
import Home from "./componentes/compHomePage/hellcome";
import Main from "./componentes/main/main";
import ForgotPassword from "./componentes/compHomePage/esqueciSenha";
import Configuration from "./componentes/configuration/configuration";

const App: React.FC = () => {
  const [config, setConfig] = useState<{ numCores: number; numLinhas: number; numTentativas: number } | null>(null);

  const handleConfigurar = (novaConfig: { numCores: number; numLinhas: number; numTentativas: number }) => {
    setConfig(novaConfig);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inicio" element={<Main />} />
        <Route path="/configuracao" element={<Configuration />} />
      </Routes>
    </Router>
  );
};

export default App;

