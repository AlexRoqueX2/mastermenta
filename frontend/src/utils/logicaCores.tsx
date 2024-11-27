export const coresPadrao = ["Vermelho", "Azul", "Verde", "Amarelo", "Roxo", "Laranja"];

/**
 * Seleciona as cores disponíveis para o jogo com base na quantidade desejada.
 * @param quantidade Número de cores a serem usadas.
 * @returns Array de cores disponíveis.
 */
export const obterCores = (quantidade: number): string[] => {
  return coresPadrao.slice(0, quantidade);
};

/**
 * Gera uma senha aleatória com base nos índices das cores disponíveis.
 * @param cores Array de cores disponíveis.
 * @param tamanho Número de caracteres na senha.
 * @returns Array de índices correspondentes às cores.
 */
export const gerarSenhaAleatoria = (cores: string[], tamanho: number): string[] => {
  const senha: string[] = [];
  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * cores.length);
    senha.push(indiceAleatorio.toString()); // Armazena o índice como string
  }
  return senha;
};

