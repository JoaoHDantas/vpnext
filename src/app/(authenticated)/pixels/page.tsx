"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../utils/axios";
import "../../styles/pixels.css";
import { Pagination } from "@nextui-org/react"; // Importando o componente Pagination

interface Pixel {
  id: number;
  titulo: string;
  descricao: string;
}

interface PaginationMeta {
  total: number; // Total de itens
  page: number; // Página atual
  pageSize: number; // Itens por página
}

export default function PixelList() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    pageSize: 5, // Pode ajustar o tamanho da página
  });

  const router = useRouter();

  // Função para buscar os pixels com paginação
  const fetchPixels = async (page: number) => {
    try {
      const response = await API.get(`/pixels/?page=${page}`);
      setPixels(response.data.results);
      setPaginationMeta({
        total: response.data.count, // Total de pixels
        page,
        pageSize: response.data.results.length,
      });
    } catch (err) {
      console.error("Erro ao buscar pixels:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Carregar a primeira página ao montar o componente
  useEffect(() => {
    fetchPixels(1);
  }, []);

  if (loading) {
    return <p>Carregando lista de pixels...</p>;
  }

  if (error) {
    return <p>Erro ao carregar a lista de pixels.</p>;
  }

  return (
    <div>
      <div id="main-box-listagem">

      <div id="pixelcreatebutton">
        <h2>Crie um novo pixel aqui:</h2>
        <button className="botao-criar" onClick={() => router.push("/pixels/create")}>Criar Novo Pixel</button>
      </div>
      <div className="pixelslist">
        <h1>Lista de Pixels</h1>
        <ul>
          {pixels.map((pixel) => (
            <li key={pixel.id}>
              <a href={`/pixels/${pixel.id}`} className="pixel-link">
                <h2>{pixel.titulo}</h2>
                <p>{pixel.descricao}</p>
              </a>
              <div>
                <button className="botao-criar" onClick={() => router.push(`/pixels/${pixel.id}/edit`)}>Editar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Componente de Paginação */}
      <div className="pagination-controls">
        <Pagination
          total={Math.ceil(paginationMeta.total / paginationMeta.pageSize)} // Número total de páginas
          initialPage={paginationMeta.page} // Página inicial
          onChange={(page) => fetchPixels(page)} // Função que atualiza os pixels conforme a página
          color="primary"
          size="md"
          />
      </div>
          </div>
    </div>
  );
}
