export const coresPadrao = ["Vermelho", "Azul", "Verde", "Amarelo", "Roxo", "Laranja"];

export const gerarCores = (quantidade: number): string[] => {
  return coresPadrao.slice(0, quantidade);
};

export const gerarSenha = (cores : number ,quantidade: number): string[] => {
  const senha: string[] = [];
    for (let s = 0; s < quantidade; s++) {
      let sorteio:number = Math.floor((Math.random() * cores));
      senha.push(coresPadrao[sorteio])
    }
  
  return senha;
};

