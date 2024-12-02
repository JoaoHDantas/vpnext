"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "../../../utils/axios"; // Ajuste conforme o caminho real

interface Comment {
  id: number;
  comentario: string;
  avaliacao: number;
  pixelPost: number;
}

const CommentPage: React.FC<{ pixelPostId: number }> = ({ pixelPostId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Busca os comentários associados ao pixelPostId
    console.log("pixelPostId:", pixelPostId);
    API.get(`/interaction/?pixelPost=${pixelPostId}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar comentários:", error);
      });
  }, [pixelPostId]);

  return (
    <div className="comment-page">
      <h1>Comentários</h1>
      <button onClick={() => router.push(`/comment/create`)} className="add-comment-button">
        Adicionar Comentário
      </button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comentario}</p>
            <small>Avaliação: {comment.avaliacao}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentPage;
