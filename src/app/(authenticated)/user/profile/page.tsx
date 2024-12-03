'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../../../utils/axios';
import "../../../styles/profile.css";

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
      <div className='contentdiv'>
        <div className='infotopbar'>
          {profile?.image && (
            <img
            src={`${profile.image}`}
            alt={`${user.username} profile`}
            className='profileimage'
            />
          )}
            {editing && (
              <form onSubmit={handleSubmit}>
              <div className="editingimg">
                <label>
                  Imagem:
                </label>
                <div className='imagembox'>
                  <p>Adicione uma imagem nova para seu perfil</p>
                  <input type="file" name="image" onChange={handleFileChange} />
                </div>
              </div>
            </form>
            )}
          <h3>User: {user.username}</h3>
        </div>
        <div className='infoperfil'>
          <div className='borderbottom'><h3>Nickname: {profile?.nickname || user.username}</h3>
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
              </form>
            )}
          </div>
          <div className='borderbottom'><h3>Email: {user.email}</h3></div>
          <div className='borderbottom'><h3>Descrição: {profile?.description || 'Sem descrição'}</h3>
            {editing && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label className='inputedit'>
                    Descrição:
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className='no-resize'
                      />
                  </label>
                </div>
              </form>
            )}
          </div>
        </div>
        <div id='botoes'>
          <button onClick={() => setEditing(!editing)} id='botaoeditar'>
            {editing ? 'Cancelar' : 'Editar Perfil'}
          </button>
          <form onSubmit={handleSubmit}>
            {editing && (<button type="submit" id='botaoeditar'>Salvar</button>)}
          </form>
        </div>
      </div>
    </div>
  );
}