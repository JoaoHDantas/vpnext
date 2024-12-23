"use client";

import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../utils/axios';
import '../styles/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones para mostrar e ocultar a senha

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controle da visibilidade da senha
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post('/token/', { username, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      API.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
      router.push('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
    <div className='login-content'>
      <img src="/logo.png" alt="" id='logo-pic'/>
      <div className="login-container">
        <h1 className="login-title">LOGIN</h1>
        <form onSubmit={handleSubmit} className="form-login">
          <div className="inputs-labels">
            <h3>Usuário</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="inputs"
            />
          </div>
          <div className="inputs-labels">
            <h3>Senha</h3>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <p id='cadastro'>Não tem uma conta?<Link href="#" id='bot-cad'>Cadastrar-se!</Link></p>
      </div>
      <div id='rodape'>
        <p id='direitos'>Rapidez | Facilidade | Disponibilidade | Confiabilidade</p>
        <p id='direitos'>Todos os direitos reservados pela equipe de desenvoltimento @ValorantPixels</p>
      </div>
    </div>
    </>

  );
}
