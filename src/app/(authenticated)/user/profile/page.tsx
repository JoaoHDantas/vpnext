'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../../../utils/axios';

type UserProfile = {
  id: number;
  username: string;
  email: string;
  profile: {
    image: string | null;
    description: string;
    nickname: string;
  } | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('Token não encontrado!');
        router.push('/'); // Redirecionar para a página de login se não houver token
        return;
      }

      try {
        const response = await API.get('/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data);
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
  }, [router]);

  if (loading) return <div>Carregando...</div>;

  if (!user) return <div>Erro: Não foi possível carregar os dados do usuário.</div>;

  const { profile } = user;

  return (
    <div>
      <h1>Login name:{user.username}</h1>
      <h1>{profile?.nickname || user.username}</h1>
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