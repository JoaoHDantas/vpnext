"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; // Novo import para resolver `params`
import API from "../../../../../utils/axios";

interface Pixel {
  titulo: string;
  descricao: string;
}

export default function EditPixel({ params }: { params: Promise<{ id: string }> }) {
  const [pixel, setPixel] = useState<Pixel>({ titulo: "", descricao: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const resolvedParams = use(params); // Resolve o `params` usando o hook `use`

  useEffect(() => {
    const id = resolvedParams?.id;

    if (!id) {
      console.error("ID não fornecido na URL.");
      router.push("/pixels");
      return;
    }

    const fetchPixel = async () => {
      try {
        const response = await API.get(`/pixels/${id}/`);
        setPixel({ titulo: response.data.titulo, descricao: response.data.descricao });
      } catch (err) {
        console.error("Erro ao buscar pixel:", err);
        setError(true);
        router.push("/pixels");
      } finally {
        setLoading(false);
      }
    };

    fetchPixel();
  }, [resolvedParams?.id, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const id = resolvedParams?.id;
      await API.put(`/pixels/${id}/`, pixel);
      alert("Pixel atualizado com sucesso!");
      router.push(`/pixels/${id}`);
    } catch (err) {
      console.error("Erro ao salvar o pixel:", err);
      alert("Erro ao salvar as alterações.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Carregando informações do pixel...</p>;
  }

  if (error) {
    return <p>Erro: Pixel não encontrado ou houve um problema ao carregar os dados.</p>;
  }

  return (
    <div>
      <h1>Editar Pixel</h1>
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
            value={pixel.titulo}
            onChange={(e) => setPixel({ ...pixel, titulo: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            value={pixel.descricao}
            onChange={(e) => setPixel({ ...pixel, descricao: e.target.value })}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
