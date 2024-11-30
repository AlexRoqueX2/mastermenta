import React, { useState } from 'react';
import './login2.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleForgotPassword = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Solicitação de recuperação para:', email);
    // A lógica de envio será integrada ao backend futuramente.
  };

  return (
    <div className="forgot-password-container">
      <h1>Esqueci Minha Senha</h1>
      <form onSubmit={handleForgotPassword} className="forgot-password-form">
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
        <button type="submit" disabled={!email}>
          Recuperar Senha
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
