# Calculadora Prestamista Front-End

Este projeto é o front-end da aplicação de simulação de seguro prestamista. Desenvolvido em React com TypeScript, utiliza `styled-components` para estilização, `axios` para requisições HTTP e `react-query` para gerenciamento de dados assíncronos. Abaixo está a descrição das principais pastas e componentes do projeto.

## Estrutura do Projeto

O projeto é organizado nas seguintes pastas:

### Componentes

Esta pasta armazena os principais componentes reutilizáveis usados no projeto:

- **Container**: Define um componente `Container` em React. Este componente recebe um título (`title`) e conteúdo (`children`) para exibição. Usa `styled-components` para estilizar a estrutura e facilita a criação de seções organizadas na interface.

- **Input**: Componente `Input` em React, que representa um campo de entrada com rótulo (`label`). Este componente é altamente reutilizável para formulários, e é estilizado com `styled-components`. Ele aceita propriedades como tipo (`type`), valor (`value`), e função de mudança (`onChange`) para capturar entradas de usuário.

### Páginas

As páginas contêm componentes que organizam e exibem a interface do usuário, combinando os componentes reutilizáveis para criar as funcionalidades principais do front-end:

- **nova-simulacao**: Componente `NovaSimulacao` que exibe um formulário de simulação de seguro prestamista. Usa `axios` para enviar dados à API e `react-query` para gerenciar requisições assíncronas. A estilização é feita com `styled-components` para organizar o layout do formulário e botões.

- **simulacoes**: Componente `Simulacoes` que exibe uma tabela com o histórico de simulações. Usa `axios` para buscar os dados de simulação e exibe-os em uma tabela estilizada com `styled-components`, incluindo formatação de data e valores.

### Arquivos Principais

- **App.tsx**: Define a estrutura de navegação e roteamento da aplicação com `react-router-dom`, permitindo que o usuário acesse as páginas "Nova Simulação" e "Simulações". Inclui um componente de navegação (`NavBar`) com links estilizados para facilitar a navegação entre as páginas. O `QueryClientProvider` envolve o `Router`, permitindo o gerenciamento de dados assíncronos com `react-query`.

- **main.tsx**: Ponto de entrada da aplicação, onde o React DOM renderiza o componente `App` no elemento root do HTML.

## Tecnologias Utilizadas

- **React com TypeScript**: Criação de interfaces de usuário reativas e organizadas com tipagem estática.
- **styled-components**: Biblioteca de estilização para React, permitindo CSS-in-JS para componentes isolados e reutilizáveis.
- **axios**: Cliente HTTP para realizar requisições à API.
- **react-query**: Gerenciamento de dados assíncronos, facilitando o cache e a sincronização de dados no front-end.
- **react-router-dom**: Gerenciamento de rotas, permitindo navegação entre as páginas principais.

## Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
