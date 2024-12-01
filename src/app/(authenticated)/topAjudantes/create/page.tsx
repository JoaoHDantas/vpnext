"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../../utils/axios";

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
    <div>
      <h1>Criar Novo Top Ajudante</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label>
          Nickname:
          <input
            type="text"
            value={nicknameAjudante}
            onChange={(e) => setNicknameAjudante(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Pontos:
          <input
            type="number"
            value={postPoints || ""}
            onChange={(e) => setPostPoints(Number(e.target.value))}
            required
          />
        </label>
        <br />
        <label>
          Foto de Perfil:
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfilePicture(e.target.files ? e.target.files[0] : null)
            }
          />
        </label>
        <br />
        <button type="submit" disabled={saving}>
          {saving ? "Criando..." : "Criar"}
        </button>
        {error && <p style={{ color: "red" }}>Erro ao criar o Top Ajudante. Tente novamente.</p>}
      </form>
    </div>
  );
}
