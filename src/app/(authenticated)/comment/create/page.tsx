"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../../utils/axios";

export default function CreateComment() {
  const [comentario, setComentario] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comentario) return;

    try {
      setLoading(true);
      setError(false);

      // Envia o comentário para a API
      const response = await API.post(`/comments/`, {
        texto: comentario,
        autor: "Autor Exemplo", // Ou você pode capturar isso do usuário, se necessário
        pixel: 1, // Substitua com o ID do pixel relacionado ao comentário
      });

      // Redireciona para a página de detalhes do pixel após a criação do comentário
      router.push(`/pixels/${response.data.pixel.id}`);

    } catch (err) {
      console.error("Erro ao criar comentário:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Criar Novo Comentário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comentario">Comentário</label>
          <textarea
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={5}
            placeholder="Digite seu comentário"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Criar Comentário"}
        </button>
      </form>
      {error && <p>Ocorreu um erro ao tentar criar o comentário.</p>}
    </div>
  );
}
