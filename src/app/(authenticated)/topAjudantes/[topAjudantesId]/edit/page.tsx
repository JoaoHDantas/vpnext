"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import API from "../../../../../utils/axios";
import "../../../../styles/EditTopAjudante.css";

// Define a interface para o tipo TopAjudantes.
interface TopAjudantes {
  id: number;
  nicknameAjudante: string;
  profile_picture: string | null;
  postPoints: number | null;
}

// Define o componente EditTopAjudante.
const EditTopAjudante: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extraindo o ID do topAjudantes diretamente da URL.
  const topAjudantesId = pathname.split("/").pop();

  // Estados para os dados do topAjudantes.
  const [nicknameAjudante, setNicknameAjudante] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [currentPicture, setCurrentPicture] = useState<string | null>(null);
  const [postPoints, setPostPoints] = useState<number | null>(null);

  // Busca os detalhes do topAjudantes ao carregar o componente.
  useEffect(() => {
    if (!topAjudantesId) return;

    API.get(`/topAjudantes/${topAjudantesId}/`)
      .then((response) => {
        const { nicknameAjudante, profile_picture, postPoints } = response.data;
        setNicknameAjudante(nicknameAjudante);
        setCurrentPicture(profile_picture);
        setPostPoints(postPoints);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do ajudante:", error);
      });
  }, [topAjudantesId]);

  // Lida com a mudança de imagem.
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  // Lida com o envio do formulário.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nicknameAjudante", nicknameAjudante);
      if (postPoints !== null) {
        formData.append("postPoints", postPoints.toString());
      }
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }

      if (topAjudantesId) {
        // Editar um ajudante existente.
        await API.put(`/topAjudantes/${topAjudantesId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Ajudante atualizado com sucesso!");
      } else {
        // Criar um novo ajudante.
        await API.post(`/topAjudantes/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Ajudante criado com sucesso!");
      }

      router.push("/topAjudantes");
    } catch (error) {
      console.error("Erro ao salvar ajudante:", error);
    }
  };

  return (
    <div className="edit-ajudante-container">
      <h1>{topAjudantesId ? "Editar Ajudante" : "Criar Novo Ajudante"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* Exibe a imagem atual do ajudante, se disponível. */}
          {currentPicture ? (
            <img
              src={currentPicture}
              alt="Imagem do Ajudante"
              className="ajudante-image"
            />
          ) : (
            <div className="placeholder-picture">Sem Foto</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <input
          type="text"
          placeholder="Nickname"
          value={nicknameAjudante}
          onChange={(e) => setNicknameAjudante(e.target.value)}
        />
        <input
          type="number"
          placeholder="Pontos"
          value={postPoints || ""}
          onChange={(e) => setPostPoints(Number(e.target.value))}
        />
        <button className="save-button" type="submit">
          {topAjudantesId ? "Salvar" : "Criar"}
        </button>
        <button
          type="button"
          className="back-button"
          onClick={() => router.push("/topAjudantes")}
        >
          Voltar para Listagem
        </button>
      </form>
    </div>
  );
};

export default EditTopAjudante;
