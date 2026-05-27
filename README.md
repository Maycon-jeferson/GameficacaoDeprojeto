# Projeto de notas em formato cards para gameficação do ambiente de trabalho

Uma aplicação web gamificada para gerenciar projetos pessoais.

**Nota: Este é um MVP (Produto Viável Mínimo)** – uma versão inicial e funcional, mas com espaço para melhorias e expansões futuras.

## Funcionalidades

- **Rastreamento de Missões**: Organize suas tarefas em capítulos e missões, com critérios de conclusão claros.
- **Sistema de Gamificação**: Ganhe XP ao completar missões e suba de nível.
- **Temas**: Alternar entre modo claro e escuro.
- **Estilos de Cards**: Escolha entre cards arredondados ou quadrados.
- **Progresso Persistente**: Salvo localmente no navegador (localStorage).
- **Exportação**: Exporte seu progresso em JSON.
- **Interface Responsiva**: Funciona em desktop e mobile.

## Como Usar

* acesse o site https://maycon-jeferson.github.io/GameficacaoDeprojeto/

1. Abra o arquivo `index.html` em qualquer navegador moderno.
2. Navegue pelos capítulos e marque missões como concluídas clicando no botão ✓ ou dando duplo clique no card.
3. Monitore seu progresso na barra superior.
4. Use os botões para alternar tema, estilo de cards, resetar progresso ou exportar.

O aplicativo funciona completamente offline, sem necessidade de servidor.

## Estrutura do Projeto

- `index.html`: Página inicial / dashboard.
- `project.html`: Página do projeto em execução.
- `create-project.html`: Página para adicionar um novo projeto.
- `css/styles.css`: Arquivo de estilos CSS.
- `js/app.js`: Lógica principal da aplicação em JavaScript.
- `js/missions-data.js`: Dados das missões e capítulos.

## Tecnologias

- HTML5
- CSS3 (com variáveis CSS para temas)
- JavaScript (ES6+)

## Desenvolvimento

Para contribuir ou modificar:

1. Clone o repositório.
2. Edite os arquivos conforme necessário.
3. Teste abrindo `index.html` no navegador.

## Licença

Este projeto é de código aberto. Sinta-se à vontade para usar e modificar.