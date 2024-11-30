import React, { useEffect, useState } from 'react';
import './configuration.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Configuration: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Ciclo de vida: Habilitar/desabilitar botão com base nos campos
    setIsButtonDisabled(!(username && password));
  }, [username, password]);

  const handleDeletar = async (event: React.FormEvent) => {
    event.preventDefault();

    setMessage(null);
    try {
      const response = await axios.delete<any>(
        `http://localhost:8000/user/${JSON.parse(localStorage.getItem('user') || '{}')._id}`,
        {
          headers: {
            Authorization: localStorage.getItem('authToken'),
          },
        }
      );

      if (response.status === 200) {
        const user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));

        setMessage('conta deletada com sucesso , voce sera redirecionado ');
        setPassword('');
        setUsername('');
        setTimeout(() => {
          navigate('/inicio');
        }, 2000);
      }

    } catch (error: any) {
      console.log(error);
      
      const errorMessage = error.response?.data?.message || 'Erro no delete.';
      setMessage(errorMessage);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setMessage(null);
    try {
      const response = await axios.put<any>(
        `http://localhost:8000/user/${JSON.parse(localStorage.getItem('user') || '{}')._id}`,
        {
          email: JSON.parse(localStorage.getItem('user') || '{}').email,
          username,
          password,
        },
        {
          headers: {
            Authorization: localStorage.getItem('authToken'),
          },
        }
      );

      if (response.status === 200) {
        const user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));

        setMessage('dados alterados com sucesso! voce sera redirecionado');
        setPassword('');
        setUsername('');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }

    } catch (error: any) {
      console.log(error);
      
      const errorMessage = error.response?.data?.message || 'Erro na alteração.';
      setMessage(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h1>Altere seus dados</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu username"
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
          mudar
        </button>
        <button onClick={handleDeletar}>
          deletar conta
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Configuration;
