"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import API from "../../../../utils/axios";
import "../../../styles/ReadTopAjudante.css";

// Define a interface para o tipo TopAjudantes.
interface TopAjudantes {
  id: number;
  nicknameAjudante: string;
  profile_picture: string | null;
  postPoints: number | null;
}

// Define o componente ReadTopAjudante.
const ReadTopAjudante: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extraindo o ID diretamente da URL.
  const topAjudantesId = pathname.split("/").pop();

  // Define estados para armazenar os detalhes do ajudante.
  const [nicknameAjudante, setNicknameAjudante] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [postPoints, setPostPoints] = useState<number | null>(null);

  useEffect(() => {
    if (!topAjudantesId) return;

    // Faz uma solicitação GET para a API para obter os detalhes do ajudante.
    API.get(`/topAjudantes/${topAjudantesId}/`)
      .then((response) => {
        const { nicknameAjudante, profile_picture, postPoints } = response.data;
        // Atualiza os estados com os detalhes do ajudante obtidos da API.
        setNicknameAjudante(nicknameAjudante);
        setProfilePicture(profile_picture);
        setPostPoints(postPoints);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do ajudante:", error);
      });
  }, [topAjudantesId]);

  return (
    <div className="read-ajudante-container">
      <h1>Detalhes do Ajudante</h1>
      <button
        type="button"
        className="back-button"
        onClick={() => router.push("/topAjudantes")}
      >
        Voltar para Listagem
      </button>
      <button
        type="button"
        className="back-button"
        onClick={() => router.push(`/topAjudantes/${topAjudantesId}/edit`)}
      >
        Editar Ajudante
      </button>
      <h2>{nicknameAjudante}</h2>
      <p>Pontos: {postPoints ?? 0}</p>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={nicknameAjudante}
          className="ajudante-image"
        />
      ) : (
        <div className="placeholder-picture">Sem Foto</div>
      )}
    </div>
  );
};

export default ReadTopAjudante;
