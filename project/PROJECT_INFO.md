# Reyel Produções - Website de Fotografia Profissional

## Visão Geral

Site moderno e visualmente impactante para o estúdio de fotografia Reyel Produções. O site apresenta uma estética premium com animações suaves, design responsivo e sistema de gerenciamento de conteúdo.

## Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **Framer Motion** - Animações e transições
- **React Router** - Navegação entre páginas
- **Supabase** - Banco de dados e backend
- **Lucide React** - Ícones modernos

## Estrutura do Projeto

```
src/
├── components/
│   ├── Header.tsx           # Cabeçalho com navegação
│   ├── Hero.tsx             # Seção hero com animação typewriter
│   ├── Experiences.tsx      # Cards de experiências com efeitos 3D
│   ├── About.tsx            # Sobre o fotógrafo com estatísticas
│   ├── Gallery.tsx          # Galeria de projetos
│   ├── Team.tsx             # Membros da equipe
│   ├── Purpose.tsx          # Seção "Qual Nossa Intenção"
│   ├── Footer.tsx           # Rodapé com contatos
│   └── AdminPanel.tsx       # Painel administrativo
├── lib/
│   └── supabase.ts          # Configuração do Supabase
├── App.tsx                  # Componente principal com rotas
├── main.tsx                 # Ponto de entrada
└── index.css                # Estilos globais
```

## Seções do Site

### 1. Hero Section
- Animação de texto digitando (typewriter effect)
- Background cinematográfico com gradiente
- Botão CTA animado
- Totalmente responsivo

### 2. Experiências
- Grid responsivo de cards
- Efeitos 3D no hover
- Botões estilizados "Ver no Drive"
- Integração com banco de dados

### 3. Sobre
- Layout split-screen
- Estatísticas animadas
- Imagens com efeitos parallax
- Tipografia elegante

### 4. Galeria
- Grid masonry de projetos
- Overlay com informações
- Botão para Instagram
- Sistema de gerenciamento completo

### 5. Equipe
- Grid circular de membros
- Links para Instagram individual
- Efeitos hover sofisticados
- Ordenação customizável

### 6. Qual Nossa Intenção?
- Design cinematográfico
- Cards com ícones animados
- Citações estilizadas
- Background com overlay

### 7. Footer
- Informações de contato
- Navegação rápida
- Links sociais
- Copyright dinâmico

## Painel Administrativo

Acesse via `/admin` para:
- ✅ Adicionar/editar/remover projetos da galeria
- ✅ Gerenciar membros da equipe
- ✅ Ordenar itens
- ✅ Atualizar imagens e links

## Design Features

### Paleta de Cores
- **Primária**: Preto profundo (#000000)
- **Secundária**: Cinza ardósia (#1e293b)
- **Acento**: Vermelho (#dc2626)
- **Texto**: Branco e tons de cinza

### Tipografia
- **Títulos**: Poppins Bold
- **Corpo**: Poppins Regular
- **Especial**: Playfair Display (quando necessário)

### Animações
- Fade in ao scroll
- Typewriter effect no hero
- Hover 3D nos cards
- Transições suaves
- Parallax sutil

## Responsividade

O site é totalmente responsivo com breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Menu hamburger aparece automaticamente em telas menores.

## Banco de Dados (Supabase)

### Tabelas:

#### projects
- `id` - UUID
- `title` - Título do projeto
- `description` - Descrição
- `cover_image` - URL da imagem
- `drive_link` - Link do Google Drive
- `order_position` - Ordem de exibição

#### team_members
- `id` - UUID
- `name` - Nome do membro
- `role` - Cargo
- `photo_url` - URL da foto
- `instagram_url` - Link do Instagram
- `order_position` - Ordem de exibição

## Como Usar

### Desenvolvimento
```bash
npm install
npm run dev
```

### Build para Produção
```bash
npm run build
npm run preview
```

### Acessar Painel Admin
```
http://localhost:5173/admin
```

## Configuração

### Variáveis de Ambiente (.env)
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

## Personalização

### Alterar Cores
Edite `tailwind.config.js` ou use classes do Tailwind diretamente.

### Adicionar Novas Seções
1. Crie um componente em `src/components/`
2. Importe em `App.tsx`
3. Adicione à estrutura da página

### Modificar Animações
Ajuste os parâmetros do Framer Motion em cada componente.

## Próximos Passos Recomendados

1. ✅ Adicionar fotos reais da equipe
2. ✅ Preencher projetos no painel admin
3. ✅ Atualizar links do Instagram
4. ✅ Configurar domínio personalizado
5. ⚠️ Adicionar autenticação no painel admin
6. ⚠️ Configurar analytics (Google Analytics)
7. ⚠️ Otimizar SEO (meta tags, sitemap)
8. ⚠️ Adicionar formulário de contato

## Segurança

⚠️ **IMPORTANTE para Produção**:
- Implementar autenticação no painel admin
- Configurar Row Level Security no Supabase
- Proteger rotas sensíveis
- Validar inputs do usuário

## Suporte

Para dúvidas ou problemas:
- Consulte ADMIN_GUIDE.md para usar o painel
- Consulte SAMPLE_DATA.md para exemplos de dados
- Entre em contato com o desenvolvedor

## Créditos

- **Design**: Baseado em tendências modernas de fotografia
- **Imagens**: Pexels (temporárias - substituir por reais)
- **Ícones**: Lucide React
- **Fonte**: Google Fonts (Poppins, Playfair Display)

## Licença

Todos os direitos reservados © 2023 Reyel Produções
