/*
  Dados dos decks, fases e cards de missão.
  Aqui ficam as classes e os dados dos cards, separados da lógica do app.
*/

class Mission {
  constructor({ title, xp, doneCriteria }) {
    this.title = title;
    this.xp = xp;
    this.doneCriteria = doneCriteria;
  }
}

class Chapter {
  constructor({ title, description, boss, reward, missions }) {
    this.title = title;
    this.description = description;
    this.boss = boss;
    this.reward = reward;
    this.missions = missions.map((mission) => new Mission(mission));
  }
}

const GAME_CHAPTERS = [
  new Chapter({
    title: "Capítulo 1 — Fundação do Reino",
    description: "Preparação do projeto, stack inicial, estrutura e ambiente rodando.",
    boss: "Projeto Next.js rodando sem erro, com estrutura base criada.",
    reward: "Conquista: Fundação Estável",
    missions: [
      { title: "Criar projeto Next.js", xp: 50, doneCriteria: "Projeto criado e abrindo no navegador." },
      { title: "Configurar TypeScript", xp: 30, doneCriteria: "Tipagem ativa e sem erros iniciais." },
      { title: "Configurar Tailwind CSS", xp: 30, doneCriteria: "Estilos Tailwind funcionando na aplicação." },
      { title: "Criar estrutura de pastas", xp: 50, doneCriteria: "Pastas app, components, modules, database, sync, services e shared criadas." },
      { title: "Criar README inicial", xp: 40, doneCriteria: "README explica objetivo, stack e como rodar o projeto." }
    ]
  }),
  new Chapter({
    title: "Capítulo 2 — Interface Profissional",
    description: "Criação do layout principal e dos componentes visuais reutilizáveis.",
    boss: "Layout responsivo funcionando em desktop e mobile.",
    reward: "Conquista: Interface de Produto Real",
    missions: [
      { title: "Criar AppShell", xp: 80, doneCriteria: "Aplicação com estrutura visual principal pronta." },
      { title: "Criar Sidebar", xp: 50, doneCriteria: "Menu lateral funcional no desktop." },
      { title: "Criar Header", xp: 40, doneCriteria: "Topo com título, ações e status visual." },
      { title: "Criar componentes Button, Input e Card", xp: 60, doneCriteria: "Componentes reutilizáveis funcionando." },
      { title: "Criar dashboard mockado", xp: 100, doneCriteria: "Dashboard inicial com cards e dados fictícios." }
    ]
  }),
  new Chapter({
    title: "Capítulo 3 — Banco Local",
    description: "Implementação da persistência local para funcionamento offline-first.",
    boss: "Dados continuam salvos após fechar e abrir o navegador.",
    reward: "Conquista: Guardião Offline",
    missions: [
      { title: "Escolher biblioteca IndexedDB", xp: 20, doneCriteria: "Biblioteca definida e instalada." },
      { title: "Criar schema local", xp: 80, doneCriteria: "Stores principais definidos." },
      { title: "Criar repositório base", xp: 100, doneCriteria: "Camada de acesso local abstraída." },
      { title: "Implementar soft delete", xp: 80, doneCriteria: "Registros marcados com deleted_at ao excluir." },
      { title: "Testar persistência offline", xp: 100, doneCriteria: "Dados permanecem salvos offline." }
    ]
  }),
  new Chapter({
    title: "Capítulo 4 — Módulo de Despesas",
    description: "Primeiro módulo completo do sistema, servindo de padrão para os demais.",
    boss: "CRUD completo de despesas funcionando offline.",
    reward: "Conquista: Primeiro Módulo Vivo",
    missions: [
      { title: "Criar entidade Expense", xp: 40, doneCriteria: "Tipo e campos principais definidos." },
      { title: "Criar caso de uso CreateExpense", xp: 60, doneCriteria: "Regra de criação isolada da interface." },
      { title: "Criar formulário de despesa", xp: 80, doneCriteria: "Formulário com validação básica." },
      { title: "Criar listagem de despesas", xp: 80, doneCriteria: "Despesas exibidas a partir do banco local." },
      { title: "Criar edição e exclusão lógica", xp: 140, doneCriteria: "Usuário consegue editar e excluir sem apagar fisicamente." },
      { title: "Criar filtros por mês e categoria", xp: 100, doneCriteria: "Listagem filtrável." }
    ]
  }),
  new Chapter({
    title: "Capítulo 5 — Dashboard Vivo",
    description: "Dashboard com dados reais vindos do banco local e insights simples.",
    boss: "Dashboard usando dados reais dos módulos locais.",
    reward: "Conquista: Olho Financeiro",
    missions: [
      { title: "Exibir total de despesas do mês", xp: 70, doneCriteria: "Total calculado com dados reais." },
      { title: "Exibir boletos próximos do vencimento", xp: 70, doneCriteria: "Alertas baseados na data atual." },
      { title: "Exibir faturas estimadas", xp: 80, doneCriteria: "Cartões aparecem no painel." },
      { title: "Criar auto insights simples", xp: 100, doneCriteria: "Sistema gera avisos automáticos." },
      { title: "Adaptar dashboard para mobile", xp: 80, doneCriteria: "Cards viram lista vertical no celular." }
    ]
  }),
  new Chapter({
    title: "Capítulo 6 — Supabase e Backup",
    description: "Login, banco remoto seguro e backup manual dos dados locais.",
    boss: "Usuário faz login e envia backup local para o Supabase.",
    reward: "Conquista: Guardião do Backup",
    missions: [
      { title: "Criar projeto no Supabase", xp: 40, doneCriteria: "Projeto remoto criado." },
      { title: "Configurar Supabase Auth", xp: 80, doneCriteria: "Login e logout funcionando." },
      { title: "Criar tabelas remotas", xp: 120, doneCriteria: "Schema remoto equivalente ao local." },
      { title: "Configurar RLS por user_id", xp: 150, doneCriteria: "Usuário acessa apenas os próprios dados." },
      { title: "Criar backup manual", xp: 150, doneCriteria: "Dados locais enviados para o Supabase." }
    ]
  }),
  new Chapter({
    title: "Capítulo 7 — Sincronização",
    description: "Criação do Sync Service e preparação para uso multi-dispositivo.",
    boss: "App sincroniza automaticamente quando há login e internet.",
    reward: "Conquista: Arquiteto da Sincronização",
    missions: [
      { title: "Criar sync-service.ts", xp: 100, doneCriteria: "Serviço central de sincronização criado." },
      { title: "Criar sync-queue.ts", xp: 100, doneCriteria: "Fila de alterações pendentes funcionando." },
      { title: "Detectar status online/offline", xp: 60, doneCriteria: "App sabe quando pode sincronizar." },
      { title: "Implementar envio em lote", xp: 120, doneCriteria: "Alterações pendentes enviadas juntas." },
      { title: "Implementar regra última alteração vence", xp: 130, doneCriteria: "Conflitos simples resolvidos por updated_at." }
    ]
  }),
  new Chapter({
    title: "Capítulo 8 — Deploy e Portfólio",
    description: "Publicação, documentação e acabamento profissional do projeto.",
    boss: "Projeto online, documentado e apresentável para recrutadores.",
    reward: "Conquista: Projeto Pleno/Sênior",
    missions: [
      { title: "Publicar deploy web", xp: 150, doneCriteria: "Aplicação acessível online." },
      { title: "Criar documentação de arquitetura", xp: 100, doneCriteria: "ARCHITECTURE.md completo." },
      { title: "Criar ROADMAP.md", xp: 80, doneCriteria: "Etapas futuras documentadas." },
      { title: "Criar SECURITY.md", xp: 80, doneCriteria: "Cuidados de segurança descritos." },
      { title: "Finalizar README profissional", xp: 120, doneCriteria: "README com objetivo, stack, prints, setup e deploy." }
    ]
  }),
  new Chapter({
    title: "Capítulo 9 — Mobile First e Acessibilidade",
    description: "Refinamento da experiência em celular, acessibilidade e usabilidade para público real.",
    boss: "Aplicação confortável de usar no celular, com navegação clara e acessível.",
    reward: "Conquista: Experiência Pública",
    missions: [
      { title: "Revisar layout em telas pequenas", xp: 90, doneCriteria: "Todas as páginas funcionam bem abaixo de 420px de largura." },
      { title: "Melhorar navegação mobile", xp: 100, doneCriteria: "Menu e ações principais são fáceis de acessar no celular." },
      { title: "Adicionar estados vazios mais claros", xp: 70, doneCriteria: "Telas sem dados orientam o usuário sobre o próximo passo." },
      { title: "Revisar contraste e legibilidade", xp: 80, doneCriteria: "Textos, botões e badges ficam legíveis em fundos claros e escuros." },
      { title: "Ajustar foco e navegação por teclado", xp: 90, doneCriteria: "Inputs, botões e links podem ser usados com teclado." }
    ]
  }),
  new Chapter({
    title: "Capítulo 10 — Produto Público Beta",
    description: "Preparação do ERP doméstico para ser testado por usuários reais com mais segurança e confiança.",
    boss: "Versão beta pronta para ser apresentada e testada por outras pessoas.",
    reward: "Conquista: Beta Público",
    missions: [
      { title: "Criar onboarding inicial", xp: 120, doneCriteria: "Usuário novo entende o propósito do app e como começar." },
      { title: "Criar tela de status do sistema", xp: 90, doneCriteria: "Usuário consegue ver modo local, login, backup e sync." },
      { title: "Adicionar exportação completa dos dados", xp: 110, doneCriteria: "Usuário consegue baixar backup local em JSON." },
      { title: "Criar política de privacidade inicial", xp: 100, doneCriteria: "Documento explica quais dados existem e como são usados." },
      { title: "Fazer teste com usuário real", xp: 150, doneCriteria: "Uma pessoa testa o app e o feedback é registrado." }
    ]
  })
];

const GAME_LEVELS = [
  { min: 0, label: "Nível 1 — Aprendiz Local-First" },
  { min: 250, label: "Nível 2 — Construtor de Interface" },
  { min: 600, label: "Nível 3 — Guardião do Banco Local" },
  { min: 1000, label: "Nível 4 — Mestre dos Módulos" },
  { min: 1600, label: "Nível 5 — Arquiteto de Sincronização" },
  { min: 2300, label: "Nível 6 — Defensor da Segurança" },
  { min: 3100, label: "Nível 7 — Engenheiro Full Stack" },
  { min: 4000, label: "Nível 8 — Projeto Pleno/Sênior" }
];
