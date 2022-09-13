<h3 align="center">
  <a href="https://cahmoraes.github.io/negociacoes-design-pattern/" target="_blank">Design Patterns com Typescript</a>
</h3>

<h4 align="center">Pratique como você joga e você jogará como pratica</h4>

---

## :rocket: Sobre
<p align="center">
  <img src="https://github.com/Cahmoraes/negociacoes-design-pattern/blob/main/src/assets/example.gif" alt="Negociações">
</p>

## Descrição

<p>Este projeto foi desenvolvido após o término do livro <a href="https://www.casadocodigo.com.br/products/colecao-cangaceiro-javascript?_pos=1&_sid=eded78d67&_ss=r&variant=12268851298379">Cangaceiro Javascript</a>, do professor Flávio Almeida. Onde eu 
reproduzi utilizando a linguagem Typscript e adicionando novos Design Patterns ao longo do desenvolvimento, com o intuito de praticar e refinar minhas habilidades.
</p>
<p>
Aprendizados aplicados:
<ul>
  <li>Padrão arquitetural MVC: cada aspecto do padrão MVC (Model, Controller e View)</li>
  <li>Padrão Observer: padrão utilizado para notificar ouvintes em fluxos de dados. Neste projeto foi utilizado para notificar as Views, sempre que o modelo de NegotiationList fosse atualizado.</li>
  <li>Padrão Factory: padrão utilizado para abstrair a complexidade na construção de objetos mais complexos.</li>
  <li>Parão Proxy: padrão utilizado para interceptar chamadas a métodos e propriedades de objetos. No projeto, este padrão foi utilizado para separar códigos da View e de Infra. No momento que uma negociação fosse excluída, um proxy intercepta a exclusão na View e aciona uma chamada para camada de infra realizar a exclusão no banco,</li>
  <li>Padrão Promise: este padrão foi utilizado para facilitar chamadas assícronas na API do IndexedDB</li>
  <li>Error-First Callback: Técnica utilizada em funções de callback para tratar resultados de operações assíncronas</li>
  <li>Padrão Decorator: este padrão permitir adicionar camadas de funcionalidades extras em funcionalidades existentes. Neste projeto foi utilizado para injetar elementos DOM em propriedades de Classe, evitando duplicação de código.</li>
  <li>IndexedDB: banco de dados transacional para persistência de dados no navegador</li>
  <li>Monkey Patching (dynamic runtime patching): técnica para modificar ou estender o comportamento de uma aplicação em seu tempo de execução</li>
  <li>Padrão DAO (Data Access Object): tem como objetivo esconder os detalhes de acesso aos dados, fornecendo métodos de alto nível para o desenvolvedor</li>
  <li>Code Splitting: técnica para dividir o bundle final em vários pedaços, visando ganho de performance e rápido carregamento da aplicação</li>
  <li>Lazy Loading: carregamento preguiçoso de módulos. Módulo NegociacaoService será carregado somente quando necessário</li>
  <li>Memoization: Foram utilizadas técnicas de memoização para evitar re-computar informações previamente calculadas em funções puras.</li>
  <li>Data Mapper: padrão de projeto utilizado para mapear resultados vindo de respostas do servidor, para instâncias de classes.</li>
  <li>Template Method: padrão de projeto utilizado para definir uma classe template para classes filhas implementarem o algoritmo de execução.</li>
  <li>Barrel: técnica utilizada para centralizar todas as importações de arquivos em um único lugar, evitando centenas de instruções de imports.</li>
  <li>Facade: padrão de projeto criacional utilizado para abstrair uma criação complexa de objetos, entregando uma interface simples. Foi utilizado neste projeto para abstrair a complexidade de criar um objeto de DataMapper.</li>
</ul>
</p>

## :computer: Tecnologias utilizadas

- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [typescript](https://www.typescriptlang.org/)
- [vitejs](https://vitejs.dev/)
