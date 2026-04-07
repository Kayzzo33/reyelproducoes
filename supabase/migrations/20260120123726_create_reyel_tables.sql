/*
  # Reyel Producoes - Tabelas do Site
  
  Este arquivo cria as tabelas necessarias para o site da Reyel Producoes.
  As tabelas usam o prefixo "reyel_" para evitar conflitos com outras tabelas
  existentes no mesmo projeto Supabase.
  
  1. Novas Tabelas
    - `reyel_projects`
      - `id` (uuid, primary key) - Identificador unico do projeto
      - `title` (varchar) - Titulo do projeto
      - `description` (text) - Descricao do projeto
      - `cover_image` (text) - URL da imagem de capa
      - `drive_link` (text) - Link do Google Drive com as fotos
      - `order_position` (integer) - Posicao na ordenacao
      - `created_at` (timestamptz) - Data de criacao
      - `updated_at` (timestamptz) - Data da ultima atualizacao
    
    - `reyel_team_members`
      - `id` (uuid, primary key) - Identificador unico do membro
      - `name` (varchar) - Nome do membro
      - `role` (varchar) - Cargo/funcao
      - `photo_url` (text) - URL da foto do membro
      - `instagram_url` (text) - URL do Instagram
      - `order_position` (integer) - Posicao na ordenacao
      - `created_at` (timestamptz) - Data de criacao
  
  2. Seguranca (RLS)
    - RLS habilitado em ambas as tabelas
    - Leitura publica permitida (para exibir no site)
    - Escrita publica permitida (para o painel admin sem autenticacao)
    
  3. Indices
    - Indices criados para order_position para otimizar ordenacao
*/

-- Tabela de Projetos da Galeria
CREATE TABLE IF NOT EXISTS reyel_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  cover_image TEXT NOT NULL,
  drive_link TEXT NOT NULL,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Membros da Equipe
CREATE TABLE IF NOT EXISTS reyel_team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT '',
  photo_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE reyel_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reyel_team_members ENABLE ROW LEVEL SECURITY;

-- Politicas para reyel_projects
CREATE POLICY "Permitir leitura publica de projetos" 
  ON reyel_projects FOR SELECT 
  USING (true);

CREATE POLICY "Permitir insercao de projetos" 
  ON reyel_projects FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Permitir atualizacao de projetos" 
  ON reyel_projects FOR UPDATE 
  USING (true);

CREATE POLICY "Permitir exclusao de projetos" 
  ON reyel_projects FOR DELETE 
  USING (true);

-- Politicas para reyel_team_members
CREATE POLICY "Permitir leitura publica de membros" 
  ON reyel_team_members FOR SELECT 
  USING (true);

CREATE POLICY "Permitir insercao de membros" 
  ON reyel_team_members FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Permitir atualizacao de membros" 
  ON reyel_team_members FOR UPDATE 
  USING (true);

CREATE POLICY "Permitir exclusao de membros" 
  ON reyel_team_members FOR DELETE 
  USING (true);

-- Indices para ordenacao
CREATE INDEX IF NOT EXISTS idx_reyel_projects_order ON reyel_projects(order_position);
CREATE INDEX IF NOT EXISTS idx_reyel_team_members_order ON reyel_team_members(order_position);

-- Funcao para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_reyel_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at em projetos
DROP TRIGGER IF EXISTS trigger_reyel_projects_updated_at ON reyel_projects;
CREATE TRIGGER trigger_reyel_projects_updated_at
  BEFORE UPDATE ON reyel_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_reyel_updated_at();
