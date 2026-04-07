import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, LogOut, User } from 'lucide-react';
import { supabase, GalleryProject, TeamMember, TABLES } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from './AdminLogin';

type Tab = 'projects' | 'team';

export default function AdminPanel() {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
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
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    photo_url: '',
    instagram_url: '',
    order_position: 0,
  });

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchTeamMembers();
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
    if (data) {
      const mappedData: GalleryProject[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        cover_image: item.cover_image,
        drive_link: item.drive_link,
        order_position: item.order_position,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
      setProjects(mappedData);
    }
  };

  const fetchTeamMembers = async () => {
    const { data } = await supabase
      .from(TABLES.TEAM_MEMBERS)
      .select('*')
      .order('order_position', { ascending: true });
    if (data) setTeamMembers(data as TeamMember[]);
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

    if (!projectForm.cover_image.trim()) {
      setError('A URL da imagem é obrigatória');
      setIsSaving(false);
      return;
    }

    if (!projectForm.drive_link.trim()) {
      setError('O link do Drive é obrigatório');
      setIsSaving(false);
      return;
    }

    const { error: insertError } = await supabase.from(TABLES.PROJECTS).insert([projectForm]);

    setIsSaving(false);

    if (insertError) {
      console.error('Erro ao salvar projeto:', insertError);
      if (insertError.code === '42501') {
        setError('Erro: Você precisa estar autenticado para adicionar projetos. Por favor, configure a autenticação.');
      } else {
        setError(`Erro ao salvar: ${insertError.message}`);
      }
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

    if (!projectForm.title.trim()) {
      setError('O título é obrigatório');
      setIsSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from(TABLES.PROJECTS)
      .update(projectForm)
      .eq('id', id);

    setIsSaving(false);

    if (updateError) {
      console.error('Erro ao atualizar projeto:', updateError);
      if (updateError.code === '42501') {
        setError('Erro: Você precisa estar autenticado para atualizar projetos.');
      } else {
        setError(`Erro ao atualizar: ${updateError.message}`);
      }
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

  const handleAddTeamMember = async () => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    if (!teamForm.name.trim()) {
      setError('O nome é obrigatório');
      setIsSaving(false);
      return;
    }

    const { error: insertError } = await supabase.from(TABLES.TEAM_MEMBERS).insert([teamForm]);

    setIsSaving(false);

    if (insertError) {
      console.error('Erro ao salvar membro:', insertError);
      if (insertError.code === '42501') {
        setError('Erro: Você precisa estar autenticado para adicionar membros.');
      } else {
        setError(`Erro ao salvar: ${insertError.message}`);
      }
    } else {
      setSuccess('Membro adicionado com sucesso!');
      await fetchTeamMembers();
      setIsAdding(false);
      resetTeamForm();
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleUpdateTeamMember = async (id: string) => {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    if (!teamForm.name.trim()) {
      setError('O nome é obrigatório');
      setIsSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from(TABLES.TEAM_MEMBERS)
      .update(teamForm)
      .eq('id', id);

    setIsSaving(false);

    if (updateError) {
      console.error('Erro ao atualizar membro:', updateError);
      if (updateError.code === '42501') {
        setError('Erro: Você precisa estar autenticado para atualizar membros.');
      } else {
        setError(`Erro ao atualizar: ${updateError.message}`);
      }
    } else {
      setSuccess('Membro atualizado com sucesso!');
      await fetchTeamMembers();
      setIsEditing(null);
      resetTeamForm();
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este membro?')) {
      await supabase.from(TABLES.TEAM_MEMBERS).delete().eq('id', id);
      fetchTeamMembers();
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

  const resetTeamForm = () => {
    setTeamForm({
      name: '',
      role: '',
      photo_url: '',
      instagram_url: '',
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

  const startEditTeamMember = (member: TeamMember) => {
    setIsEditing(member.id);
    setTeamForm({
      name: member.name,
      role: member.role,
      photo_url: member.photo_url,
      instagram_url: member.instagram_url,
      order_position: member.order_position,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie projetos e membros da equipe</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <User size={18} />
              <span className="text-sm">{user.email}</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-gray-300"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-200">
            {success}
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            Projetos
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'team'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            Equipe
          </button>
        </div>

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Projetos da Galeria</h2>
              <button
                onClick={() => {
                  setIsAdding(true);
                  resetProjectForm();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Adicionar Projeto
              </button>
            </div>

            {isAdding && (
              <div className="bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Novo Projeto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Título"
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, title: e.target.value })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Ordem"
                    value={projectForm.order_position}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        order_position: parseInt(e.target.value),
                      })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="URL da Imagem"
                    value={projectForm.cover_image}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        cover_image: e.target.value,
                      })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Link do Drive"
                    value={projectForm.drive_link}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        drive_link: e.target.value,
                      })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                </div>
                <textarea
                  placeholder="Descrição"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg mb-4"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddProject}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Save size={20} />
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      resetProjectForm();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg"
                  >
                    <X size={20} />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-800 p-6 rounded-lg"
                >
                  {isEditing === project.id ? (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              title: e.target.value,
                            })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                        <input
                          type="number"
                          value={projectForm.order_position}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              order_position: parseInt(e.target.value),
                            })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                        <input
                          type="text"
                          value={projectForm.cover_image}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              cover_image: e.target.value,
                            })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                        <input
                          type="text"
                          value={projectForm.drive_link}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              drive_link: e.target.value,
                            })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                      </div>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-slate-700 rounded-lg mb-4"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateProject(project.id)}
                          disabled={isSaving}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                          <Save size={20} />
                          {isSaving ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(null);
                            resetProjectForm();
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg"
                        >
                          <X size={20} />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mb-2">
                          {project.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Ordem: {project.order_position}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditProject(project)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Membros da Equipe</h2>
              <button
                onClick={() => {
                  setIsAdding(true);
                  resetTeamForm();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Adicionar Membro
              </button>
            </div>

            {isAdding && (
              <div className="bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Novo Membro</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={teamForm.name}
                    onChange={(e) =>
                      setTeamForm({ ...teamForm, name: e.target.value })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Cargo"
                    value={teamForm.role}
                    onChange={(e) =>
                      setTeamForm({ ...teamForm, role: e.target.value })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="URL da Foto"
                    value={teamForm.photo_url}
                    onChange={(e) =>
                      setTeamForm({ ...teamForm, photo_url: e.target.value })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="URL do Instagram"
                    value={teamForm.instagram_url}
                    onChange={(e) =>
                      setTeamForm({
                        ...teamForm,
                        instagram_url: e.target.value,
                      })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Ordem"
                    value={teamForm.order_position}
                    onChange={(e) =>
                      setTeamForm({
                        ...teamForm,
                        order_position: parseInt(e.target.value),
                      })
                    }
                    className="px-4 py-2 bg-slate-700 rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddTeamMember}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    <Save size={20} />
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      resetTeamForm();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg"
                  >
                    <X size={20} />
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-slate-800 p-6 rounded-lg"
                >
                  {isEditing === member.id ? (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          value={teamForm.name}
                          onChange={(e) =>
                            setTeamForm({ ...teamForm, name: e.target.value })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                        <input
                          type="text"
                          value={teamForm.role}
                          onChange={(e) =>
                            setTeamForm({ ...teamForm, role: e.target.value })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                        <input
                          type="text"
                          value={teamForm.photo_url}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              photo_url: e.target.value,
                            })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                        <input
                          type="text"
                          value={teamForm.instagram_url}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              instagram_url: e.target.value,
                            })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                        <input
                          type="number"
                          value={teamForm.order_position}
                          onChange={(e) =>
                            setTeamForm({
                              ...teamForm,
                              order_position: parseInt(e.target.value),
                            })
                          }
                          className="px-4 py-2 bg-slate-700 rounded-lg"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateTeamMember(member.id)}
                          disabled={isSaving}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                          <Save size={20} />
                          {isSaving ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(null);
                            resetTeamForm();
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg"
                        >
                          <X size={20} />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <p className="text-gray-400">{member.role}</p>
                          <p className="text-sm text-gray-500">
                            Ordem: {member.order_position}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditTeamMember(member)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteTeamMember(member.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
