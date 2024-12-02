"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../../utils/axios"; // Caminho para seu Axios

const CreateCommentPage = ({ pixelPostId }: { pixelPostId: number }) => {
  const [comentario, setComentario] = useState<string>("");
  const [avaliacao, setAvaliacao] = useState<number>(0);
  const router = useRouter();

  const handleCreateComment = () => {
    const payload = {
      comentario,
      avaliacao,
      pixelPost: pixelPostId,
    };

    API.post("/api/interaction/", payload)
      .then(() => {
        // Redireciona de volta à página de comentários ou onde desejar
        router.push(`/comment`);
      })
      .catch((error) => {
        console.error("Erro ao criar comentário:", error);
      });
  };

  return (
    <div className="create-comment-page">
      <h1>Criar Comentário</h1>
      <textarea
        placeholder="Escreva seu comentário"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      <select
        value={avaliacao}
        onChange={(e) => setAvaliacao(Number(e.target.value))}
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button onClick={handleCreateComment}>Salvar Comentário</button>
      <button onClick={() => router.back()} className="cancel-button">
        Cancelar
      </button>
    </div>
  );
};

export default CreateCommentPage;
