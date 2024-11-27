import React, { useState, useEffect } from "react";
import './mastermind.css';
import { obterCores, gerarSenhaAleatoria } from "../utils/logicaCores";
import BotoesControle from "./BotoesControle";
import { server } from "typescript";
import { compararInput, checaVitoria } from "../utils/logicaComparacao";

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

  // Função para inicializar o tabuleiro
  const inicializarTabuleiro = () => {
    const novoTabuleiro: string[][] = [];
    for (let i = 0; i < numTentativas; i++) {
      novoTabuleiro.push(Array(numLinhas).fill("0")); // Preenche cada linha com "0", indicando vazio
    }
    setTabuleiro(novoTabuleiro);
  };

  // Adiciona o input do jogador
  const adicionarInput = (cor: string) => {
    if (inputAtual.length < numLinhas) {
      setInputAtual([...inputAtual, cor]);
    }
  };

  // Remove o último input
  const apagarInput = () => {
    setInputAtual(inputAtual.slice(0, -1));
  };

  const handleConfirmar = () => {
    if (inputAtual.length !== numLinhas) {
      alert("Preencha todas as posições antes de confirmar!");
      return;
    }
  
    // Comparar input atual com a senha
    const resultado = compararInput(inputAtual, senha);
  
    // Exibir resultados
    alert(`Acertos:\nPretas: ${resultado.pretas}\nBrancas: ${resultado.brancas}`);
  
    // Atualizar o tabuleiro com a tentativa atual
    const novoTabuleiro = [...tabuleiro];
    const linhaAtual = novoTabuleiro.findIndex((linha) => linha.every((valor) => valor === "0"));
    if (linhaAtual !== -1) {
      novoTabuleiro[linhaAtual] = [...inputAtual];
      setTabuleiro(novoTabuleiro);
      setInputAtual([]); // Limpar o input atual para a próxima jogada
    }
  
    // Verificar vitória
    if (checaVitoria(resultado.pretas)) {
      alert("Parabéns! Você acertou a senha!");
      return;
    }
  
    // Verificar se as tentativas acabaram
    const tentativasRestantes = novoTabuleiro.filter((linha) => linha.includes("0")).length;
    if (tentativasRestantes === 0) {
      alert(`Game Over! A senha era: ${senha.join(", ")}`);
    }
  };
  
  /*
  // Confirma o input atual
  const confirmarInput = () => {
    if (inputAtual.length === numLinhas) {
        const novoTabuleiro = [...tabuleiro];
        const linhaAtual = novoTabuleiro.findIndex((linha) =>
          linha.every((valor) => valor === "") // Comparação com string vazia para espaços vazios
        );
        if (linhaAtual !== -1) {
          novoTabuleiro[linhaAtual] = [...inputAtual];
          setTabuleiro(novoTabuleiro);
          setInputAtual([]); // Limpa o input atual para a próxima jogada
        }
      }
  }; 

  if (inputAtual.length === numLinhas) {
  const novoTabuleiro = [...tabuleiro];
  const linhaAtual = novoTabuleiro.findIndex((linha) =>
    linha.every((valor) => valor === "") // Comparação com string vazia para espaços vazios
  );
  if (linhaAtual !== -1) {
    novoTabuleiro[linhaAtual] = [...inputAtual];
    setTabuleiro(novoTabuleiro);
    setInputAtual([]); // Limpa o input atual para a próxima jogada
  }
} */

  // Renderiza o tabuleiro
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
    const cores = obterCores(numCores);
    setCoresDisponiveis(cores);
    const novaSenha = gerarSenhaAleatoria(cores, numLinhas);
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
      <h2>Mastermind</h2>
      <p>Cores disponíveis: {coresDisponiveis.join(", ")}</p>
      <div className="tabuleiro">{renderizarTabuleiro()}</div>

        {/* Componente de botões */}
        <BotoesControle
        coresDisponiveis={coresDisponiveis}
        onAdicionarInput={adicionarInput}
        onConfirmar={handleConfirmar}
        onApagar={apagarInput}
        podeAdicionarMais={inputAtual.length < numLinhas}
      />
    </div>
  );
};

export default Mastermind;




