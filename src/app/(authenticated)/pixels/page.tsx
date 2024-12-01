"use client";

import React, { useEffect, useState } from "react";
import API from "../../../utils/axios";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

interface Pixel {
  id: number;
  titulo: string;
  descricao: string;
  upload: string;
  created_at: string;
}

export default function Pixels() {
  const [pixels, setPixels] = useState<Pixel[]>([]);

  // Função para deletar um pixel
  const handleDelete = async (pixelId: number) => {
    try {
      await API.delete(`/pixels/${pixelId}/`);
      const updatedPixels = pixels.filter((pixel) => pixel.id !== pixelId);
      setPixels(updatedPixels);
      alert("Seu pixel foi deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar pixel:", error);
    }
  };

  useEffect(() => {
    API.get("/pixels/")
      .then((response) => {
        setPixels(response.data.results || response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar Pixels:", error);
      });
  }, []);

  return (
    <div className="master-div">
      <div className="post-list-container">
        <div className="titulo-lista">
          <h1>Pixels da Comunidade</h1>
        </div>
        <ul>
          {pixels.map((pixel) => (
            <li key={pixel.id} className="post-item">
              <Link href={`/pixels/${pixel.id}`} className="post-link-name">
                {pixel.titulo}
                
              </Link>
              <div className="actions">
                <Link href={`/pixels/${pixel.id}/edit`} className="post-link">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(pixel.id)}
                  className="delete-button"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
