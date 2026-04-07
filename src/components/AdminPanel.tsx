import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, LogOut, User, Video, Image as ImageIcon } from 'lucide-react';
import { supabase, GalleryProject, GalleryVideo, TABLES } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from './AdminLogin';

type Tab = 'projects' | 'videos';

export default function AdminPanel() {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    cover_image: '',
    drive_link: '',
    order_position: 0,
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    video_url: '',
    thumbnail_url: '',
    order_position: 0,
  });

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchVideos();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  const fetchProjects = async () => {
    const { data } = await supabase
      .from(TABLES.PROJECTS)
      .select('*')
      .order('order_position', { ascending: true });
    if (data) setProjects(data as GalleryProject[]);
  };

  const fetchVideos = async () => {
    const { data } = await supabase
      .from(TABLES.VIDEOS)
      .select('*')
      .order('order_position', { ascending: true });
    if (data) setVideos(data as GalleryVideo[]);
  };

  const handleAddProject = async () => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    if (!projectForm.title.trim()) {
      setError('O título é obrigatório');
      setIsSaving(false);
      return;
    }

    const { error: insertError } = await supabase.from(TABLES.PROJECTS).insert([projectForm]);

    setIsSaving(false);

    if (insertError) {
      setError(`Erro ao salvar: ${insertError.message}`);
    } else {
      setSuccess('Projeto adicionado com sucesso!');
      await fetchProjects();
      setIsAdding(false);
      resetProjectForm();
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleUpdateProject = async (id: string) => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    const { error: updateError } = await supabase
      .from(TABLES.PROJECTS)
      .update(projectForm)
      .eq('id', id);

    setIsSaving(false);

    if (updateError) {
      setError(`Erro ao atualizar: ${updateError.message}`);
    } else {
      setSuccess('Projeto atualizado com sucesso!');
      await fetchProjects();
      setIsEditing(null);
      resetProjectForm();
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      await supabase.from(TABLES.PROJECTS).delete().eq('id', id);
      fetchProjects();
    }
  };

  const handleAddVideo = async () => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    if (!videoForm.title.trim() || !videoForm.video_url.trim()) {
      setError('Título e URL do vídeo são obrigatórios');
      setIsSaving(false);
      return;
    }

    const { error: insertError } = await supabase.from(TABLES.VIDEOS).insert([videoForm]);

    setIsSaving(false);

    if (insertError) {
      setError(`Erro ao salvar: ${insertError.message}`);
    } else {
      setSuccess('Vídeo adicionado com sucesso!');
      await fetchVideos();
      setIsAdding(false);
      resetVideoForm();
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleUpdateVideo = async (id: string) => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    const { error: updateError } = await supabase
      .from(TABLES.VIDEOS)
      .update(videoForm)
      .eq('id', id);

    setIsSaving(false);

    if (updateError) {
      setError(`Erro ao atualizar: ${updateError.message}`);
    } else {
      setSuccess('Vídeo atualizado com sucesso!');
      await fetchVideos();
      setIsEditing(null);
      resetVideoForm();
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este vídeo?')) {
      await supabase.from(TABLES.VIDEOS).delete().eq('id', id);
      fetchVideos();
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      cover_image: '',
      drive_link: '',
      order_position: 0,
    });
  };

  const resetVideoForm = () => {
    setVideoForm({
      title: '',
      video_url: '',
      thumbnail_url: '',
      order_position: 0,
    });
  };

  const startEditProject = (project: GalleryProject) => {
    setIsEditing(project.id);
    setProjectForm({
      title: project.title,
      description: project.description,
      cover_image: project.cover_image,
      drive_link: project.drive_link,
      order_position: project.order_position,
    });
  };

  const startEditVideo = (video: GalleryVideo) => {
    setIsEditing(video.id);
    setVideoForm({
      title: video.title,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url || '',
      order_position: video.order_position,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie projetos e vídeos de produções</p>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-gray-400">
              <User size={18} />
              <span className="text-sm hidden sm:inline">{user.email}</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-gray-300 ml-auto sm:ml-0"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/40 border border-green-500/50 rounded-xl text-green-200">
            {success}
          </div>
        )}

        <div className="flex gap-2 mb-8 bg-slate-800/50 p-1 rounded-xl w-fit">
          <button
            onClick={() => { setActiveTab('projects'); setIsAdding(false); setIsEditing(null); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'projects'
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ImageIcon size={18} />
            Projetos
          </button>
          <button
            onClick={() => { setActiveTab('videos'); setIsAdding(false); setIsEditing(null); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'videos'
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Video size={18} />
            Vídeos
          </button>
        </div>

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Galeria</h2>
              <button
                onClick={() => { setIsAdding(true); resetProjectForm(); }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                <Plus size={20} />
                Novo Projeto
              </button>
            </div>

            {isAdding && (
              <div className="bg-slate-800/50 border border-white/5 p-6 rounded-2xl mb-6 backdrop-blur-md">
                <h3 className="text-xl font-bold mb-4">Adicionar Novo Projeto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Título</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">URL da Imagem</label>
                      <input
                        type="text"
                        value={projectForm.cover_image}
                        onChange={(e) => setProjectForm({ ...projectForm, cover_image: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Link da Galeria</label>
                      <input
                        type="text"
                        value={projectForm.drive_link}
                        onChange={(e) => setProjectForm({ ...projectForm, drive_link: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Posição (Ordem)</label>
                      <input
                        type="number"
                        value={projectForm.order_position}
                        onChange={(e) => setProjectForm({ ...projectForm, order_position: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Descrição</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors mb-4"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddProject}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 transition-colors font-medium"
                  >
                    <Save size={20} />
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    onClick={() => { setIsAdding(false); resetProjectForm(); }}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    <X size={20} />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-slate-800/30 border border-white/5 p-6 rounded-2xl group hover:bg-slate-800/50 transition-colors">
                  {isEditing === project.id ? (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="px-4 py-2 bg-slate-900 border border-white/10 rounded-lg"
                        />
                        <input
                          type="number"
                          value={projectForm.order_position}
                          onChange={(e) => setProjectForm({ ...projectForm, order_position: parseInt(e.target.value) })}
                          className="px-4 py-2 bg-slate-900 border border-white/10 rounded-lg"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdateProject(project.id)} className="px-4 py-2 bg-red-600 rounded-lg">Salvar</button>
                        <button onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-700 rounded-lg">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <img src={project.cover_image} className="w-20 h-20 rounded-lg object-cover" alt="" />
                        <div>
                          <h3 className="text-xl font-bold">{project.title}</h3>
                          <p className="text-gray-400 text-sm">{project.description}</p>
                          <span className="text-xs text-red-500 font-mono mt-1 block">POS: {project.order_position}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEditProject(project)} className="p-2 bg-slate-700 hover:bg-blue-600 rounded-lg transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDeleteProject(project.id)} className="p-2 bg-slate-700 hover:bg-red-600 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Produções de Vídeo</h2>
              <button
                onClick={() => { setIsAdding(true); resetVideoForm(); }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors font-medium"
              >
                <Plus size={20} />
                Novo Vídeo
              </button>
            </div>

            {isAdding && (
              <div className="bg-slate-800/50 border border-white/5 p-6 rounded-2xl mb-6 backdrop-blur-md">
                <h3 className="text-xl font-bold mb-4">Adicionar Novo Vídeo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Título</label>
                      <input
                        type="text"
                        placeholder="Ex: Trailer de Casamento"
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">URL do Vídeo (Youtube/Link direto)</label>
                      <input
                        type="text"
                        placeholder="https://youtube.com/watch?v=..."
                        value={videoForm.video_url}
                        onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">URL da Thumbnail (Opcional)</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={videoForm.thumbnail_url}
                        onChange={(e) => setVideoForm({ ...videoForm, thumbnail_url: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Posição (Ordem)</label>
                      <input
                        type="number"
                        value={videoForm.order_position}
                        onChange={(e) => setVideoForm({ ...videoForm, order_position: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-lg focus:border-red-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddVideo}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 transition-colors font-medium"
                  >
                    <Save size={20} />
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    onClick={() => { setIsAdding(false); resetVideoForm(); }}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    <X size={20} />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {videos.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/10 border border-dashed border-white/10 rounded-2xl text-gray-500">
                  Nenhum vídeo cadastrado ainda.
                </div>
              ) : (
                videos.map((video) => (
                  <div key={video.id} className="bg-slate-800/30 border border-white/5 p-6 rounded-2xl group hover:bg-slate-800/50 transition-colors">
                    {isEditing === video.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={videoForm.title}
                            onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                            className="px-4 py-2 bg-slate-900 border border-white/10 rounded-lg w-full"
                          />
                          <input
                            type="text"
                            value={videoForm.video_url}
                            onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
                            className="px-4 py-2 bg-slate-900 border border-white/10 rounded-lg w-full"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleUpdateVideo(video.id)} className="px-4 py-2 bg-red-600 rounded-lg font-medium">Salvar Alterações</button>
                          <button onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-700 rounded-lg">Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                          {video.thumbnail_url ? (
                            <img src={video.thumbnail_url} className="w-20 h-28 rounded-lg object-cover" alt="" />
                          ) : (
                            <div className="w-20 h-28 bg-slate-900 rounded-lg flex items-center justify-center border border-white/5">
                              <Video size={24} className="text-gray-700" />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-bold">{video.title}</h3>
                            <p className="text-gray-400 text-sm truncate max-w-xs">{video.video_url}</p>
                            <span className="text-xs text-red-500 font-mono mt-1 block">POSIÇÃO: {video.order_position}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => startEditVideo(video)} className="p-2 bg-slate-700 hover:bg-blue-600 rounded-lg transition-colors"><Edit2 size={18} /></button>
                          <button onClick={() => handleDeleteVideo(video.id)} className="p-2 bg-slate-700 hover:bg-red-600 rounded-lg transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
