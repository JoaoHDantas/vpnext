"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../../utils/axios";
import "../../../styles/createAjudante.css";

interface TopAjudantes {
  id: number;
  nicknameAjudante: string;
  profile_picture: string | null;
  postPoints: number | null;
}

export default function CreateTopAjudante() {
  const [nicknameAjudante, setNicknameAjudante] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [postPoints, setPostPoints] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    setError(false);

    const formData = new FormData();
    formData.append("nicknameAjudante", nicknameAjudante);
    if (postPoints !== null) {
      formData.append("postPoints", postPoints.toString());
    }
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      await API.post("/topAjudantes/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Top Ajudante criado com sucesso!");
      router.push("/topAjudantes");
    } catch (err) {
      console.error("Erro ao criar Top Ajudante:", err);
      setError(true);
      alert("Erro ao criar o Top Ajudante.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="body-div">
        <h1 id="title-creation">Adicione um ajudante</h1>
        <div className="content">
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="form-creation">
            <label className="label-form">
              <p>Nickname</p>
              <input className="inputs-pers" type="text" value={nicknameAjudante} onChange={(e) => setNicknameAjudante(e.target.value)} required />
            </label>

            <label className="label-form">
              <p>Pontos</p>
              <input type="number" value={postPoints || ""} onChange={(e) => setPostPoints(Number(e.target.value))} required className="inputs-pers" />
            </label>

            <label className="label-form" id="img-box">
              <p>Adicionar foto de perfil</p>
              <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)} />
            </label>

            <div id="div-botoes">
              <button type="submit" disabled={saving} className="botao-criar">
                {saving ? "Criando..." : "Criar"}
              </button>

              <button id="voltar" type="button" className="botao-criar" onClick={() => router.push("/topAjudantes")}>
                Voltar
              </button>
            </div>
            {error && <p style={{ color: "red" }}>Erro ao criar o Top Ajudante. Tente novamente.</p>}
          </form>
        </div>

      </div>
    </>
  );
}
