"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import API from "../../../../../utils/axios";
import "../../../../styles/createAjudante.css"
import "../../../../styles/EditTopAjudante.css";
import { MdEdit } from "react-icons/md";

// Define a interface para o tipo TopAjudantes.
interface TopAjudantes {
  id: number;
  nicknameAjudante: string;
  profile_picture: string | null;
  postPoints: number | null;
}

// Define o componente de edição de TopAjudante.
const EditTopAjudante: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  // ID do ajudante obtido dos parâmetros da URL.
  const topAjudantesId = params?.topAjudantes;

  // Estados para os dados do topAjudantes.
  const [nicknameAjudante, setNicknameAjudante] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [currentPicture, setCurrentPicture] = useState<string | null>(null);
  const [postPoints, setPostPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Busca os detalhes do TopAjudante ao carregar o componente.
  useEffect(() => {
    if (!topAjudantesId) {
      console.error("ID do ajudante não fornecido.");
      setError(true);
      return;
    }

    API.get(`/topAjudantes/${topAjudantesId}/`)
      .then((response) => {
        const { nicknameAjudante, profile_picture, postPoints } = response.data;
        setNicknameAjudante(nicknameAjudante);
        setCurrentPicture(profile_picture);
        setPostPoints(postPoints);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do ajudante:", error);
        setError(true);
      })
      .finally(() => setLoading(false));
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

    if (!topAjudantesId) {
      alert("ID do ajudante não encontrado. Não é possível salvar.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nicknameAjudante", nicknameAjudante);
      if (postPoints !== null) {
        formData.append("postPoints", postPoints.toString());
      }
      if (profilePicture) {
        formData.append("profile_picture", profilePicture);
      }

      await API.put(`/topAjudantes/${topAjudantesId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Ajudante atualizado com sucesso!");
      router.push("/topAjudantes");
    } catch (error) {
      console.error("Erro ao salvar ajudante:", error);
      alert("Erro ao salvar o ajudante. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando...</p>;

  if (error)
    return (
      <p>
        Erro: Não foi possível carregar os dados do ajudante. Verifique se o ID
        é válido ou tente novamente.
      </p>
    );

  return (
    <>
      <div className="body-div">
        <h1 id="title-creation">Editar Ajudante</h1>
        <div className="content">

          <form onSubmit={handleSubmit} className="form-creation">
            <div className="div-img">
              {/* Exibe a imagem atual do ajudante, se disponível. */}
              {currentPicture ? (
                <img src={currentPicture} alt="Imagem do Ajudante" className="ajudante-image" />
              ) : (
                <div className="placeholder-picture">Sem Foto</div>
              )}

              <label className="label-form" id="img-box">
                <MdEdit  />
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>




            </div>
            <input id="spacing-input" className="inputs-pers" type="text" placeholder="Nickname" value={nicknameAjudante} onChange={(e) => setNicknameAjudante(e.target.value)} required />
            <input className="inputs-pers" type="number" placeholder="Pontos" value={postPoints || ""} onChange={(e) => setPostPoints(Number(e.target.value))} required />

            <div className="div-botoes">
              <button className="botao-criar" type="submit">
                Salvar
              </button>

              <button type="button" className="botao-criar" onClick={() => router.push("/topAjudantes")}>
                Voltar
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default EditTopAjudante;
