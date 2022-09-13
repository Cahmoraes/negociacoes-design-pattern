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
  <li><b>Padrão arquitetural MVC</b>: cada aspecto do padrão MVC (Model, Controller e View)</li>
  <br>
  <li><b>Padrão Observer</b>: é um padrão de projeto comportamental que permite que você defina um mecanismo de assinatura para notificar múltiplos objetos sobre quaisquer eventos que aconteçam com o objeto que eles estão observando.</li>
  <br>
  <li><b>Padrão Chain of Responsibility</b>: é um padrão de projeto comportamental que permite que você passe pedidos por uma corrente de handlers. Ao receber um pedido, cada handler decide se processa o pedido ou o passa adiante para o próximo handler na corrente.</li>
  <br>
  <li><b>Padrão Factory</b>: padrão utilizado para abstrair a complexidade na construção de objetos mais complexos.</li>
  <br>
  <li><b>Parão Proxy</b>: padrão utilizado para interceptar chamadas a métodos e propriedades de objetos. No projeto, este padrão foi utilizado para separar códigos da View e de Infra. No momento que uma negociação fosse excluída, um proxy intercepta a exclusão na View e aciona uma chamada para camada de infra realizar a exclusão no banco,</li>
  <br>
  <li><b>Padrão Promise</b>: este padrão foi utilizado para facilitar chamadas assícronas na API do IndexedDB</li>
  <br>
  <li><b>Error-First Callback</b>: Técnica utilizada em funções de callback para tratar resultados de operações assíncronas</li>
  <br>
  <li><b>Padrão Decorator</b>: é um padrão de projeto estrutural que permite que você acople novos comportamentos para objetos ao colocá-los dentro de invólucros de objetos que contém os comportamentos. Neste projeto foi utilizado para injetar elementos DOM em propriedades de Classe, evitando duplicação de código.</li>
  <br>
  <li><b>IndexedDB</b>: banco de dados transacional para persistência de dados no navegador</li>
  <br>
  <li><b>Monkey Patching (dynamic runtime patching)</b>: técnica para modificar ou estender o comportamento de uma aplicação em seu tempo de execução</li>
  <br>
  <li><b>Padrão DAO (Data Access Object)</b>: tem como objetivo esconder os detalhes de acesso aos dados, fornecendo métodos de alto nível para o desenvolvedor</li>
  <br>
  <li><b>Code Splitting</b>: técnica para dividir o bundle final em vários pedaços, visando ganho de performance e rápido carregamento da aplicação</li>
  <br>
  <li><b>Lazy Loading</b>: carregamento preguiçoso de módulos. Módulo NegociacaoService será carregado somente quando necessário</li>
  <br>
  <li><b>Memoization</b>: foram utilizadas técnicas de memoização para evitar re-computar informações previamente calculadas em funções puras.</li>
  <br>
  <li><b>Data Mapper</b>: padrão de projeto utilizado para mapear resultados vindo de respostas do servidor, para instâncias de classes.</li>
  <br>
  <li><b>Template Method</b>: pO Template Method é um padrão de projeto comportamental que define o esqueleto de um algoritmo na superclasse mas deixa as subclasses sobrescreverem etapas específicas do algoritmo sem modificar sua estrutura.</li>
  <br>
  <li><b>Barrel</b>: técnica utilizada para centralizar todas as importações de arquivos em um único lugar, evitando centenas de instruções de imports.</li>
  <br>
  <li><b>Padrão Facade</b>: é um padrão de projeto estrutural que fornece uma interface simplificada para uma biblioteca, um framework, ou qualquer conjunto complexo de classes.. Foi utilizado neste projeto para abstrair a complexidade de criar um objeto de DataMapper.</li>
  <br>
  <li><b>Padrão Strategy</b>: é um padrão de projeto comportamental que permite que você defina uma família de algoritmos, coloque-os em classes separadas, e faça os objetos deles intercambiáveis. Neste projeto foi utilizado para definir a mensagem exibida em tela, para cada ação.</li>
  <br>
   <li><b>Debounce</b>: é uma técnica de perfomance utilizada para agendar o disparado de uma ação após um intervalo de tempo. Mesmo se essa ação for disparada diversas vezes, somente uma será agendada para ser disparada após um timer configurado.</li>
   <br>
</ul>
</p>

## :computer: Tecnologias utilizadas

- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [typescript](https://www.typescriptlang.org/)
- [vitejs](https://vitejs.dev/)
