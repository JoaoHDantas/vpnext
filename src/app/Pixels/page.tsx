"use client";

import React, { useEffect, useState } from 'react';
import API from '../../utils/axios';

interface Pixel {
    id: number;
    titulo: string;
    descricao: string;
    upload: string;
    created_at: string;
}

export default function Pixels() {
    const [pixels, setPixels] = useState<Pixel[]>([]);

    useEffect(() => {
        API.get('/pixels/')
            .then(response => {
                setPixels(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pixels!', error);
            });
    }, []);

    return (
        <div>
            <h1>Pixels Posts</h1>
            <ul>
                {pixels.map(pixel => (
                    <li key={pixel.id}>
                        <h2>{pixel.titulo}</h2>
                        <p>{pixel.descricao}</p>
                        {pixel.upload && <a href={pixel.upload} download>Download</a>}
                        <small>{new Date(pixel.created_at).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}