"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../utils/axios";

interface Pixel {
  id: number;
  titulo: string;
  descricao: string;
}

export default function PixelList() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPixels = async () => {
      try {
        const response = await API.get("/pixels/");
        setPixels(response.data.results);
      } catch (err) {
        console.error("Erro ao buscar pixels:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPixels();
  }, []);

  if (loading) {
    return <p>Carregando lista de pixels...</p>;
  }

  if (error) {
    return <p>Erro ao carregar a lista de pixels.</p>;
  }

  return (
    <div>
      <h1>Lista de Pixels</h1>
      <ul>
        {pixels.map((pixel) => (
          <li key={pixel.id}>
            <h2>{pixel.titulo}</h2>
            <p>{pixel.descricao}</p>
            <button onClick={() => router.push(`/pixels/${pixel.id}`)}>Ver Detalhes</button>
            <button onClick={() => router.push(`/pixels/${pixel.id}/edit`)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
