import React, { useState, useEffect } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  data: {
    token: string;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Ciclo de vida: Habilitar/desabilitar botão com base nos campos
    setIsButtonDisabled(!(email && password));
  }, [email, password]);

  const handleLogin = async (event: React.FormEvent) => {
    console.log({ email, password });
    event.preventDefault();
    setMessage(null); // Reseta a mensagem antes de enviar
    try {
      const response = await axios.post<LoginResponse>('http://localhost:8000/user/login',
      {
        "email": email,
        "password": password,
      });

      if (response.status === 200) {
        const token = response.data.data.token; // Pegue o token do corpo da resposta
        console.log("Token recebido:", token);
  
        // Salve o token no Local Storage
        localStorage.setItem('authToken', token);
        setMessage('login realizado com sucesso!');
        setEmail('');
        setPassword('');
        navigate('/home')
        
      }

      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro no login.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
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
          Entrar
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
