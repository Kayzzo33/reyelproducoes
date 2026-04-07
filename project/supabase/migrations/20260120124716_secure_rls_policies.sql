/*
  # Atualizar Politicas RLS para Seguranca

  Esta migracao atualiza as politicas de seguranca (RLS) para restringir
  operacoes de escrita (INSERT, UPDATE, DELETE) apenas para usuarios autenticados.
  A leitura (SELECT) continua publica para exibicao no site.

  1. Alteracoes em reyel_projects
    - SELECT: Publico (mantido)
    - INSERT: Apenas usuarios autenticados
    - UPDATE: Apenas usuarios autenticados
    - DELETE: Apenas usuarios autenticados

  2. Alteracoes em reyel_team_members
    - SELECT: Publico (mantido)
    - INSERT: Apenas usuarios autenticados
    - UPDATE: Apenas usuarios autenticados
    - DELETE: Apenas usuarios autenticados

  3. Seguranca
    - Todas as operacoes de escrita agora verificam auth.uid()
    - Dados protegidos contra modificacoes nao autorizadas

  4. Funcao update_reyel_updated_at
    - Corrigido search_path para SECURITY DEFINER
*/

-- Remover politicas antigas de reyel_projects (escrita)
DROP POLICY IF EXISTS "Permitir insercao de projetos" ON reyel_projects;
DROP POLICY IF EXISTS "Permitir atualizacao de projetos" ON reyel_projects;
DROP POLICY IF EXISTS "Permitir exclusao de projetos" ON reyel_projects;

-- Remover politicas antigas de reyel_team_members (escrita)
DROP POLICY IF EXISTS "Permitir insercao de membros" ON reyel_team_members;
DROP POLICY IF EXISTS "Permitir atualizacao de membros" ON reyel_team_members;
DROP POLICY IF EXISTS "Permitir exclusao de membros" ON reyel_team_members;

-- Novas politicas seguras para reyel_projects

CREATE POLICY "Authenticated users can insert projects"
  ON reyel_projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update projects"
  ON reyel_projects FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete projects"
  ON reyel_projects FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Novas politicas seguras para reyel_team_members

CREATE POLICY "Authenticated users can insert team members"
  ON reyel_team_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update team members"
  ON reyel_team_members FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete team members"
  ON reyel_team_members FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Corrigir funcao update_reyel_updated_at com search_path fixo
CREATE OR REPLACE FUNCTION update_reyel_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
