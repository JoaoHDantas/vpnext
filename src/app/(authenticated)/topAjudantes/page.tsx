"use client";

import { useState, useEffect } from "react";
import API from "../../../utils/axios";
import Link from "next/link";
import "../../styles/topAjudantes.css";
import { FaPlus } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

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
  const [topAjudantes, setTopAjudantes] = useState<TopAjudantes[]>([]);

  // Função para lidar com a exclusão de um ajudante.
  const handleDelete = async (topAjudantesId: number) => {
    try {
      // Faz uma solicitação DELETE para a API para excluir o ajudante com o ID fornecido.
      await API.delete(`/topAjudantes/${topAjudantesId}/`);
      // Atualiza o estado removendo o ajudante excluído da lista.
      const updatedTopAjudantes = topAjudantes.filter(
        (topAjudante) => topAjudante.id !== topAjudantesId
      );
      setTopAjudantes(updatedTopAjudantes);
    } catch (error) {
      console.error("Erro ao deletar ajudante:", error);
    }
  };

  useEffect(() => {
    API.get(`/topAjudantes/`)
      .then((response) => {
        setTopAjudantes(response.data.results);
      })
      .catch((error) => {
        console.error("Erro ao buscar ajudantes:", error);
      });
  }, []);

  return (
    <div className="top-ajudantes-container">
      {/* Cabeçalho da lista de ajudantes */}
      <div className="header-ajudantes">
        <div id="title">
          <FaHandsHelping />
          <h1 id="top-ajud">Top Ajudantes</h1>
        </div>
        {/* Botão para criar um novo Top Ajudante */}
        <Link href="/topAjudantes/create" legacyBehavior>
          <a className="create-button">
            <FaPlus />
          </a>
        </Link>
      </div>

      {/* Lista de ajudantes */}
      <ul className="listagem-ajudantes">
        {topAjudantes.map((topAjudante) => (
          <li key={topAjudante.id} className="ajudante-item">
            <Link href={`/topAjudantes/${topAjudante.id}/`} legacyBehavior>
              <a>
                <div className="ajudante-info">
                  {topAjudante.profile_picture ? (
                    <img
                      src={topAjudante.profile_picture}
                      alt={topAjudante.nicknameAjudante}
                      className="profile-picture"
                    />
                  ) : (
                    <div className="placeholder-picture">Sem Foto</div>
                  )}
                  <span className="ajudante-name">
                    {topAjudante.nicknameAjudante}
                  </span>
                  <span className="ajudante-points">
                    Pontos: {topAjudante.postPoints ?? 0}
                  </span>
                </div>
              </a>
            </Link>
            <div className="actions">
              <Link href={`/topAjudantes/${topAjudante.id}/edit/`} legacyBehavior>
                <a className="edit-button">
                  <AiFillEdit />
                </a>
              </Link>
              <button
                onClick={() => handleDelete(topAjudante.id)}
                className="delete-button"
              >
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAjudantesList;
