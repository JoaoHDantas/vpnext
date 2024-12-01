"use client";

import { useState, useEffect } from "react";
import API from "../../../utils/axios";
import Link from "next/link";
import "../../styles/topAjudantes.css";

// Define a interface para o tipo TopAjudantes.
interface TopAjudantes {
  id: number;
  nicknameAjudante: string;
  profile_picture: string | null;
  postPoints: number | null;
}

// Define o componente TopAjudantesList.
const TopAjudantesList: React.FC = () => {
  // Define o estado para armazenar a lista de ajudantes.
  const [topAjudantes, settopAjudantes] = useState<TopAjudantes[]>([]);

  // Função para lidar com a exclusão de um ajudante.
  const handleDelete = async (topAjudantesId: number) => {
    try {
      // Faz uma solicitação DELETE para a API para excluir o ajudante com o ID fornecido.
      await API.delete(`/topAjudantes/${topAjudantesId}/`);
      // Atualiza o estado removendo o ajudante excluído da lista.
      const updatedtopAjudantes = topAjudantes.filter(
        (topAjudantes) => topAjudantes.id !== topAjudantesId
      );
      settopAjudantes(updatedtopAjudantes);
    } catch (error) {
      console.error("Erro ao deletar ajudante:", error);
    }
  };

  
  useEffect(() => {
    
    API.get(`/topAjudantes/`)
      .then((response) => {
        
        settopAjudantes(response.data.results);
      })
      .catch((error) => {
        console.error("Erro ao buscar ajudantes:", error);
      });
  }, []);

  
  return (
    <div className="top-ajudantes-container">
      {/* Cabeçalho da lista de ajudantes */}
      <div className="header">
        <h1>Top Ajudantes</h1>
        <Link href="/topAjudantes/createAjudante" legacyBehavior>
          <a className="create-button">Adicionar Novo Ajudante</a>
        </Link>
      </div>
      {/* Lista de ajudantes */}
      <ul>
        {/* Mapeia cada ajudante na lista e renderiza um item de lista para cada um */}
        {topAjudantes.map((topAjudantes) => (
          <li key={topAjudantes.id} className="ajudante-item">
            <div className="ajudante-info">
              {/* Exibe a imagem do perfil, se disponível */}
              {topAjudantes.profile_picture ? (
                <img
                  src={topAjudantes.profile_picture}
                  alt={topAjudantes.nicknameAjudante}
                  className="profile-picture"
                />
              ) : (
                <div className="placeholder-picture">Sem Foto</div>
              )}
              {/* Exibe o nickname do ajudante */}
              <span className="ajudante-name">{topAjudantes.nicknameAjudante}</span>
              {/* Exibe os pontos do post */}
              <span className="ajudante-points">
                Pontos: {topAjudantes.postPoints ?? 0}
              </span>
            </div>
            {/* Botões de ação para editar e excluir o ajudante */}
            <div className="actions">
              <Link href={`/ajudantes/${topAjudantes.id}/edit`} legacyBehavior>
                <a className="edit-button">Editar</a>
              </Link>
              <button
                onClick={() => handleDelete(topAjudantes.id)}
                className="delete-button"
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporta o componente TopAjudantesList.
export default TopAjudantesList;