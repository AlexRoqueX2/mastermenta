import React, { useState, useEffect } from "react";
import './mastermind.css';
import { gerarCores , gerarSenha } from "../../utils/logicaCores";
import BotoesControle from "./BotoesControle";
import { compararInput, checaVitoria } from "../../utils/logicaComparacao";

interface MastermindProps {
  numCores: number;
  numLinhas: number;
  numTentativas: number;
}

const Mastermind: React.FC<MastermindProps> = ({ numCores, numLinhas, numTentativas }) => {
  const [tabuleiro, setTabuleiro] = useState<string[][]>([]);
  const [coresDisponiveis, setCoresDisponiveis] = useState<string[]>([]);
  const [senha, setSenha] = useState<string[]>([]);
  const [inputAtual, setInputAtual] = useState<string[]>([]);
  const [pretas, setPretas] = useState<string[]>([]);
  const [brancas, setBrancas] = useState<string[]>([]);

  const inicializarTabuleiro = () => {
    const novoTabuleiro: string[][] = [];
    for (let i = 0; i < numTentativas; i++) {
      novoTabuleiro.push(Array(numLinhas).fill("0")); // Preenche cada linha com "0", indicando vazio
    }
    setTabuleiro(novoTabuleiro);
  };

  const adicionarInput = (cor: string) => {
    if (inputAtual.length < numLinhas) {
      setInputAtual([...inputAtual, cor]);
    }
  };

  const apagarInput = () => {
    setInputAtual(inputAtual.slice(0, -1));
  };

  const handleConfirmar = () => {
    
    if (inputAtual.length !== numLinhas) {
      alert("Preencha todas as posições antes de confirmar!");
      return;
    }
  
    const resultado = compararInput(inputAtual, senha);

    setBrancas(resultado.brancas)
    setPretas(resultado.pretas)

    const novoTabuleiro = [...tabuleiro];
    const linhaAtual = novoTabuleiro.findIndex((linha) => linha.every((valor) => valor === "0"));
    if (linhaAtual !== -1) {
      novoTabuleiro[linhaAtual] = [...inputAtual];
      setTabuleiro(novoTabuleiro);
      setInputAtual([]);
    }
  
    if (checaVitoria(resultado.pretas)) {
      alert("Parabéns! Você acertou a senha!");
      return;
    }
  
    const tentativasRestantes = novoTabuleiro.filter((linha) => linha.includes("0")).length;
    if (tentativasRestantes === 0) {
      alert(`Game Over! A senha era: ${senha.join(", ")}`);
    }
  };

  const renderizarTabuleiro = () => {
    return tabuleiro.map((linha, index) => (
      <div key={index} className="linha">
        {linha.map((valor, i) => (
          <div
            key={i}
            className="caractere"
            style={{
              backgroundColor: valor !== "0" ? coresDisponiveis[parseInt(valor, 10)] : "transparent",
            }}
          ></div>
        ))}
      </div>
    ));
  };

  // Inicializa o tabuleiro ao montar o componente
  React.useEffect(() => {
    
    inicializarTabuleiro();
    
  }, []);

  // Inicializa as cores e a senha
  useEffect(() => {
    const cores = gerarCores(numCores);
    setCoresDisponiveis(cores);
    const novaSenha = gerarSenha(numCores ,numLinhas);
    setSenha(novaSenha);
    inicializarTabuleiro();
    console.log("Senha gerada:", novaSenha); // Para debugging
  }, [numCores, numLinhas, numTentativas]);

  // Função de mapeamento para números e suas cores
    const obterCor = (valor: number): string => {
    if (valor === 0) return "transparent"; // Cor padrão para espaços vazios
    return coresDisponiveis[valor - 1] || "transparent"; // Pega a cor correspondente
  };


  return (
    <div className="tabuleiro-container">
      <h2>Mastermenta</h2>
      <p>Cores disponíveis: {coresDisponiveis.join(", ")}</p>
      <div className="tabuleiro">{renderizarTabuleiro()}</div>
        <BotoesControle
        coresDisponiveis={coresDisponiveis}
        onAdicionarInput={adicionarInput}
        onConfirmar={handleConfirmar}
        onApagar={apagarInput}
        podeAdicionarMais={inputAtual.length < numLinhas}
      />
      <p>acertou a posiçao e a cor: {pretas}</p>
      <p>acertou a cor, porem errou a posiçao: {brancas}</p>
    </div>
  );
};

export default Mastermind;




