"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation"; // Importando o hook useSearchParams
import API from "../../../utils/axios"; // Supondo que sua configuração axios esteja aqui

interface Comment {
  id: number;
  texto: string;
  autor: string;
}

interface Pixel {
  id: number;
  titulo: string;
  descricao: string;
}

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const searchParams = useSearchParams(); // Usando o hook useSearchParams
  const pixelId = searchParams.get("id"); // Acessando o parâmetro da URL

  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      if (!pixelId) return;

      try {
        const response = await API.get(`/pixels/${pixelId}/comments/`);
        setComments(response.data.results);
      } catch (err) {
        console.error("Erro ao buscar comentários:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [pixelId]);

  if (loading) {
    return <p>Carregando comentários...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os comentários.</p>;
  }

  return (
    <div>
      <h1>Comentários para o Pixel</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p><strong>{comment.autor}</strong>: {comment.texto}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push(`/pixels/${pixelId}/add-comment`)}>Adicionar Comentário</button>
    </div>
  );
}
