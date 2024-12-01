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
      <header className="header">
        <div className="left-header">
          <Link href="/Home">
            <Image src="/assets/logo.png" alt="Logo" width={50} height={50} className="imagem" />
          </Link>
          <Link href="/Home" className="home">
            Home
          </Link>
          <Link href="#">
            <p>Sobre nós</p>
          </Link>
        </div>
        <div className="right-header">
          <Link href="#">
            <p>Suporte</p>
          </Link>
        </div>
      </header>
      <nav className="navbar">
        <div className="links-navbar">
          <Link href="#" className="links-escolha">
            agentes
          </Link>
          <Link href="#" className="links-escolha">
            mapas
          </Link>
          <Link href="/userProfile" className="links-escolha">
            top ajudantes
          </Link>
          <Link href="#" className="links-escolha">
            comunidade
          </Link>
        </div>
        <div>
          <div></div>
          <Link href="#">Hi, joao</Link>
        </div>
      </nav>
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
