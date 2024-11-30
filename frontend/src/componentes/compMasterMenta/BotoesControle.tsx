import React from "react";
import "./botoesControle.css";
import {coresPadrao} from "./../../utils/logicaCores"

interface BotoesControleProps {
  coresDisponiveis: string[]; // Lista de cores disponíveis
  onAdicionarInput: (cor: string) => void; // Callback para adicionar input do jogador
  onConfirmar: () => void; // Callback para confirmar jogada
  onApagar: () => void; // Callback para apagar último input
  podeAdicionarMais: boolean; // Controle para não ultrapassar limite de caracteres
}

const BotoesControle: React.FC<BotoesControleProps> = ({
  coresDisponiveis,
  onAdicionarInput,
  onConfirmar,
  onApagar,
  podeAdicionarMais,
}) => {
  return (
    <div className="botoes-controle">
      {/* Botões de cores */}
      <div className="botoes-cores">
        {coresDisponiveis.map((cor, index) => (
          <button
            key={index}
            className="botao-cor"
            style={{ backgroundColor: coresPadrao[index] }}
            onClick={() => podeAdicionarMais && onAdicionarInput(cor)}
            disabled={!podeAdicionarMais} // Desativa o botão se não puder adicionar mais
          >
            {cor}
          </button>
        ))}
      </div>

      {/* Botões de ações */}
      <div className="botoes-acoes">
        <button className="botao-acao" onClick={onConfirmar}>
          Confirmar
        </button>
        <button className="botao-acao" onClick={onApagar}>
          Apagar
        </button>
      </div>
    </div>
  );
};

export default BotoesControle;
