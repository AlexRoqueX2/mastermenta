import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cadastro.css';

const Cadastro: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsButtonDisabled(!(name && email && password));
  }, [name, email, password]);

  const handleRegister = async (event: React.FormEvent) => {
    console.log({ name, email, password });
    event.preventDefault();
    setMessage(null); // Reseta a mensagem antes de enviar
    try {
      const response = await axios.post('http://localhost:8000/user',
      {
        "username": name,
        "email": email,
        "password": password,
      });

      if (response.status === 201) {
        setMessage('Cadastro realizado com sucesso!');
        // Limpa os campos do formulário
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro no cadastro.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit" disabled={isButtonDisabled}>
          Cadastrar
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Cadastro;
