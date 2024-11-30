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
import MainGame from "./componentes/compMasterMenta/mainGame";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inicio" element={<Main />} />
        <Route path="/configuracao" element={<Configuration />} />
        <Route path="/mainJogo" element={<MainGame />} />
      </Routes>
    </Router>
  );
};

export default App;

