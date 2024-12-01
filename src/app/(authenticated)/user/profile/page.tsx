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
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    description: '',
    image: null as File | null,
  });
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
          setFormData({
            nickname: response.data.profile?.nickname || '',
            description: response.data.profile?.description || '',
            image: null,
          });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Token não encontrado!');
      router.push('/');
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('username', user?.username || '');
    formDataToSend.append('profile.nickname', formData.nickname);
    formDataToSend.append('profile.description', formData.description);
    if (formData.image) {
      formDataToSend.append('profile.image', formData.image);
    }
  
    try {
      const response = await API.put('/users/me/', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        setUser(response.data);
        setEditing(false);
      } else {
        console.error('Erro ao atualizar os dados do usuário: ', response.status);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  };
  

  if (loading) return <div>Carregando...</div>;

  if (!user) return <div>Erro: Não foi possível carregar os dados do usuário.</div>;

  const { profile } = user;

  return (
    <div>
      <h1>Login name: {user.username}</h1>
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
      <button onClick={() => setEditing(!editing)}>
        {editing ? 'Cancelar' : 'Editar Perfil'}
      </button>
      {editing && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Apelido:
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Descrição:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Imagem:
              <input type="file" name="image" onChange={handleFileChange} />
            </label>
          </div>
          <button type="submit">Salvar</button>
        </form>
      )}
    </div>
  );
}