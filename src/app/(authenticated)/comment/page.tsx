"use client";

import { useState } from "react";
import API from "../../../utils/axios"; // Ajuste conforme o caminho real

interface Comment {
  id: number;
  comentario: string;
  avaliacao: number | null;
  pixelPost: number;
}

const CommentPage: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [pixelPostId, setPixelPostId] = useState<number | null>(null);

  const handlePixelPostSelect = async (id: number) => {
    setPixelPostId(id);

    try {
      const response = await API.get(`/interaction/?pixelPost=${id}`);
      // Ajuste para acessar os resultados
      setComments(response.data.results);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    }
  };

  return (
    <div className="comment-page">
      <h1>Comentários</h1>

      {/* Campo para seleção do PixelPostId */}
      <div className="pixel-selector">
        <label htmlFor="pixelPost">Selecione o Pixel Post:</label>
        <input
          type="number"
          id="pixelPost"
          placeholder="Digite o ID do Pixel Post"
          onChange={(e) => handlePixelPostSelect(Number(e.target.value))}
        />
      </div>

      {/* Lista de comentários */}
      {pixelPostId && (
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.comentario}</p>
                <small>Avaliação: {comment.avaliacao ?? "Sem avaliação"}</small>
              </li>
            ))
          ) : (
            <p>Nenhum comentário encontrado para este Pixel Post.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CommentPage;
