"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../utils/axios";

export default function CreatePixel() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [upload, setUpload] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    setError(false);

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    if (upload) {
      formData.append("upload", upload);
    }

    try {
      await API.post("/pixels/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Pixel criado com sucesso!");
      router.push("/pixels");
    } catch (err) {
      console.error("Erro ao criar pixel:", err);
      setError(true);
      alert("Erro ao criar o Pixel.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>Criar Novo Pixel</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Upload:
          <input
            type="file"
            onChange={(e) => setUpload(e.target.files ? e.target.files[0] : null)}
          />
        </label>
        <br />
        <button type="submit" disabled={saving}>
          {saving ? "Criando..." : "Criar"}
        </button>
        {error && <p style={{ color: "red" }}>Erro ao criar o Pixel. Tente novamente.</p>}
      </form>
    </div>
  );
}