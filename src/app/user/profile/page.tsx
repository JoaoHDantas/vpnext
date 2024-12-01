'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type UserProfile = {
  id: number;
  username: string;
  email: string;
  profile: {
    image: string | null;
    description: string;
    nickname: string;
  } | null; // Aqui você pode tornar o profile opcional
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token'); // Verifique se o token está correto
      if (!token) {
        console.error('Token não encontrado!');
        router.push('/login'); // Redirecionar para a página de login se não houver token
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`, // Passando o token corretamente no cabeçalho
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Erro ao buscar os dados do usuário: ', response.status);
        }
      } catch (error) {
        console.error('Erro de conexão:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Carregando...</div>;

  if (!user) return <div>Erro: Não foi possível carregar os dados do usuário.</div>;

  // Certifique-se de que o profile não seja null antes de acessar as propriedades
  const { profile } = user;

  return (
    <div>
      <h1>{profile?.nickname || user.username}</h1> {/* Usando o optional chaining para evitar erro */}
      <p>Email: {user.email}</p>
      <p>Descrição: {profile?.description || 'Sem descrição'}</p>
      {profile?.image && (
        <img
          src={`http://localhost:8000/media/${profile.image}`}
          alt={`${user.username} profile`}
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
      )}
    </div>
  );
}
