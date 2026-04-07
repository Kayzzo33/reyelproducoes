# Guia do Painel Administrativo - Reyel Produções

## Acessando o Painel Admin

Para acessar o painel administrativo, visite:
```
http://localhost:5173/admin
```

(Em produção, use: `https://seudominio.com/admin`)

## Funcionalidades

### 1. Gerenciar Projetos da Galeria

O painel permite adicionar, editar e remover projetos da galeria principal.

#### Adicionar um Novo Projeto:
1. Clique em "Adicionar Projeto"
2. Preencha os campos:
   - **Título**: Nome do projeto/evento
   - **Descrição**: Breve descrição do trabalho
   - **URL da Imagem**: Link direto para a imagem de capa
   - **Link do Drive**: URL do Google Drive com as fotos completas
   - **Ordem**: Número para ordenar os projetos (menor = primeiro)
3. Clique em "Salvar"

#### Editar um Projeto:
1. Clique no ícone de lápis (Editar) ao lado do projeto
2. Modifique os campos desejados
3. Clique em "Salvar"

#### Deletar um Projeto:
1. Clique no ícone de lixeira (Deletar) ao lado do projeto
2. Confirme a exclusão

### 2. Gerenciar Membros da Equipe

O painel permite adicionar, editar e remover membros da equipe.

#### Adicionar um Novo Membro:
1. Clique em "Adicionar Membro"
2. Preencha os campos:
   - **Nome**: Nome completo do membro
   - **Cargo**: Função (ex: Fotógrafo, Editor, Assistente)
   - **URL da Foto**: Link direto para a foto de perfil
   - **URL do Instagram**: Link completo do Instagram (ex: https://instagram.com/usuario)
   - **Ordem**: Número para ordenar os membros (menor = primeiro)
3. Clique em "Salvar"

#### Editar um Membro:
1. Clique no ícone de lápis (Editar) ao lado do membro
2. Modifique os campos desejados
3. Clique em "Salvar"

#### Deletar um Membro:
1. Clique no ícone de lixeira (Deletar) ao lado do membro
2. Confirme a exclusão

## Dicas Importantes

### URLs de Imagens
- Use serviços como [Imgur](https://imgur.com/), Google Drive (link direto), ou hospede no seu próprio servidor
- Para Google Drive: compartilhe a imagem publicamente e use o link direto
- Formato recomendado: JPG ou PNG
- Resolução recomendada: Mínimo 1200x800px para projetos, 500x500px para membros

### Ordenação
- Projetos e membros são ordenados pelo campo "Ordem"
- Números menores aparecem primeiro
- Exemplo: Ordem 1, 2, 3, 4, etc.

### Links do Instagram
- Use o formato completo: `https://instagram.com/nomedousuario`
- Os usuários poderão clicar na foto do membro para ir ao Instagram

### Backup dos Dados
- Todos os dados são armazenados no Supabase
- Recomenda-se fazer backup regular das informações

## Estrutura de Dados

### Exemplo de Projeto:
```json
{
  "title": "Casamento João & Maria",
  "description": "Linda cerimônia na praia com 200 convidados",
  "cover_image": "https://exemplo.com/imagem.jpg",
  "drive_link": "https://drive.google.com/pasta/abc123",
  "order_position": 1
}
```

### Exemplo de Membro da Equipe:
```json
{
  "name": "Carlos Silva",
  "role": "Fotógrafo Principal",
  "photo_url": "https://exemplo.com/foto-carlos.jpg",
  "instagram_url": "https://instagram.com/carlossilva",
  "order_position": 1
}
```

## Solução de Problemas

### Imagens não aparecem:
- Verifique se a URL da imagem está correta
- Certifique-se de que a imagem está publicamente acessível
- Teste a URL diretamente no navegador

### Erros ao salvar:
- Verifique sua conexão com a internet
- Certifique-se de que todos os campos obrigatórios estão preenchidos
- Tente recarregar a página e tentar novamente

### Dados não aparecem no site:
- Recarregue a página principal (F5)
- Verifique se os dados foram salvos corretamente no painel admin

## Seguranca e Autenticacao

O painel administrativo esta protegido por autenticacao. Somente usuarios autorizados podem adicionar, editar ou excluir conteudo.

### Primeiro Acesso - Criar Usuario Admin

Para criar seu primeiro usuario administrador:

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Va em **Authentication** > **Users**
4. Clique em **Add User** > **Create New User**
5. Preencha:
   - Email: seu email de admin (ex: admin@reyel.com)
   - Password: uma senha segura
   - Marque "Auto Confirm User"
6. Clique em **Create User**

Agora voce pode fazer login no painel admin em `/admin`.

### Fazer Login

1. Acesse `/admin`
2. Digite seu email e senha cadastrados
3. Clique em "Entrar"

### Fazer Logout

Clique no botao "Sair" no canto superior direito do painel.

### Politicas de Seguranca

- **Leitura**: Qualquer pessoa pode visualizar os projetos e membros no site publico
- **Escrita**: Somente usuarios autenticados podem adicionar, editar ou excluir dados
- Todas as operacoes de escrita sao protegidas por Row Level Security (RLS)

## Contato e Suporte

Para duvidas ou problemas, entre em contato com o desenvolvedor do site.
