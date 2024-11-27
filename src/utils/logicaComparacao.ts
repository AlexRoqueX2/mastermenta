/**
 * Compara o input do jogador com a senha e retorna o número de acertos (pretas e brancas).
 * @param input Array de strings representando o input do jogador.
 * @param senha Array de strings representando a senha gerada.
 * @returns Um objeto contendo os números de pretas e brancas.
 */
/*export const compararInput = (input: string[], senha: string[]) => {
    let pretas = 0;
    let brancas = 0;
  
    // Arrays para marcar posições já verificadas
    const marcadosSenha = Array(senha.length).fill(false);
    const marcadosInput = Array(input.length).fill(false);
  
    // Primeira passada: verificar pretas
    for (let i = 0; i < input.length; i++) {
      if (input[i] === senha[i]) {
        pretas++;
        marcadosSenha[i] = true;
        marcadosInput[i] = true;
      }
    }
  
    // Segunda passada: verificar brancas
    for (let i = 0; i < input.length; i++) {
      if (!marcadosInput[i]) {
        for (let j = 0; j < senha.length; j++) {
          if (!marcadosSenha[j] && input[i] === senha[j]) {
            brancas++;
            marcadosSenha[j] = true;
            break;
          }
        }
      }
    }
  
    return { pretas, brancas };
  };*/
/*
  function comparaMuitoFODA(imput, senha) {
    for (i = 0; i < linha; i++) {
      if (imput[i] === senha[i]) {
        preta[i] = preta[i] + 1
      }
    }
    for (i = 0;i < linha; i++){
      for (a = 0; a < linha; a++) {
        if (imput[i] == senha[a] && preta[i] === 0 && preta[a] === 0 && branca[i] === 0) {
          branca[i] = branca[i] + 1
        }
      }
    }
  }*/
  
 /**
 * Compara o input do jogador com a senha e retorna o número de acertos (pretas e brancas).
 * @param input Array de strings representando o input do jogador.
 * @param senha Array de strings representando a senha gerada.
 * @returns Um objeto contendo os números de pretas e brancas.
 */

 export const compararInput =  (input: string[], senha: string[]) => { 
    let linha = input.length;    
    let pretas = Array(linha).fill(0);
    let brancas = Array(linha).fill(0);

    for (let i = 0; i < linha; i++) {
        if (input[i] == senha[i]) {
          pretas[i] = pretas[i] + 1
        }
      }
    for (let i = 0;i < linha; i++){
        for (let a = 0; a < linha; a++) {
          if (input[i] == senha[a] && pretas[i] == 0 && pretas[a] == 0 && brancas[i] == 0) {
            brancas[i] = brancas[i] + 1
          }
        }
    }
    
 return { pretas, brancas };
};

export const checaVitoria = (pretas: number[]) => {
    let vitoria = false ; 
    let condicaoVitoria = 0;
        for(let i = 0;i < pretas.length; i++){
            if(pretas[i] == 1){
            condicaoVitoria++;
            }
        }
        if(condicaoVitoria == pretas.length){
            vitoria = true;
        }
    return vitoria
}