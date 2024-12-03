"use client";
import { useState, useEffect } from "react";
import API from "../../../utils/axios";
import Link from "next/link";
import "../../styles/topAjudantes.css";
import { FaPlus } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Pagination } from "@nextui-org/react"; // Importação do componente Pagination

// Define a interface para o tipo TopAjudantes.
interface TopAjudantes {
  id: number;
  nicknameAjudante: string;
  profile_picture: string | null;
  postPoints: number | null;
}

// Define a interface para os links de paginação da API.
interface PaginationMeta {
  total: number; // Total de itens
  page: number; // Página atual
  pageSize: number; // Itens por página
}

// Define o componente TopAjudantesList.
const TopAjudantesList: React.FC = () => {
  const [topAjudantes, setTopAjudantes] = useState<TopAjudantes[]>([]);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    pageSize: 5,
  });

  // Função para buscar dados da API.
  const fetchTopAjudantes = async (page: number) => {
    try {
      const response = await API.get(`/topAjudantes/?page=${page}`);
      setTopAjudantes(response.data.results);
      setPaginationMeta({
        total: response.data.count, // Use total count from API
        page,
        pageSize: response.data.results.length,
      });
    } catch (error) {
      console.error("Erro ao buscar ajudantes:", error);
    }
  };

  // Carregar a primeira página ao montar o componente.
  useEffect(() => {
    fetchTopAjudantes(1);
  }, []);

  // Função para lidar com a exclusão de um ajudante.
  const handleDelete = async (topAjudantesId: number) => {
    try {
      await API.delete(`/topAjudantes/${topAjudantesId}/`);
      setTopAjudantes((prev) =>
        prev.filter((ajudante) => ajudante.id !== topAjudantesId)
      );
    } catch (error) {
      console.error("Erro ao deletar ajudante:", error);
    }
  };

  return (
    <div className="top-ajudantes-container">
      <div className="content-header">
        <div className="header-ajudantes">
          <div id="title">
            <FaHandsHelping />
            <h1 id="top-ajud">Top Ajudantes</h1>
          </div>
          <Link href="/topAjudantes/create" legacyBehavior>
            <a className="create-button">
              <FaPlus />
            </a>
          </Link>
        </div>
        <div className="divider"></div>
        
      </div>

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
                    Reputação: {topAjudante.postPoints ?? 0}
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

      <div className="pagination-controls">
        <Pagination
          total={Math.ceil(paginationMeta.total / paginationMeta.pageSize)}
          initialPage={paginationMeta.page} // Set initial page
          onChange={(page) => fetchTopAjudantes(page)}
          color="primary"
          size="md"
        />
      </div>
    </div>
  );
};

export default TopAjudantesList;
