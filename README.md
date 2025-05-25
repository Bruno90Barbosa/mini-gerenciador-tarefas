Mini Gerenciador de Tarefas Fullstack
Este projeto é um mini gerenciador de tarefas fullstack, composto por um backend desenvolvido com NestJS e um frontend construído com Next.js. A persistência de dados é realizada utilizando o Google Cloud Firestore. A aplicação é projetada para ser executada de forma eficiente e padronizada através de contêineres Docker, orquestrados com Docker Compose.

🚀 Funcionalidades
Criação de Tarefas: Adicione novas tarefas com título e descrição.

Listagem de Tarefas: Visualize todas as tarefas existentes.

Edição de Tarefas: Atualize o título, descrição e status (Pendente, Em Andamento, Concluída) de uma tarefa existente.

Exclusão de Tarefas: Remova tarefas da lista.

Filtragem por Status: Filtre a lista de tarefas para exibir apenas as tarefas com um status específico.

Persistência de Dados: As tarefas são armazenadas no Firestore, garantindo que os dados não sejam perdidos ao reiniciar a aplicação.


🛠️ Tecnologias Utilizadas
Backend:

NestJS: Framework progressivo Node.js para construção de aplicações eficientes e escaláveis do lado do servidor.

TypeScript: Linguagem de programação que adiciona tipagem estática ao JavaScript.

Firestore: Banco de dados NoSQL flexível e escalável do Google Cloud para persistência de dados.

Firebase Admin SDK: Para interação segura com o Firestore no backend.

Frontend:

Next.js: Framework React para construção de aplicações web de alto desempenho.

React: Biblioteca JavaScript para construção de interfaces de usuário.

TypeScript: Para tipagem estática.

Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.

Axios: Cliente HTTP baseado em Promises para o navegador e Node.js (utilizado para chamadas de API).

Firebase Client SDK: Para autenticação e interação com o Firestore no frontend.

Orquestração:

Docker: Para contêinerização das aplicações.

Docker Compose: Para definir e executar aplicações Docker multi-contêiner.



1. Construção e Execução com Docker Compose
   Com as configurações do Firebase ajustadas, você pode construir e executar a aplicação.

Navegue até a pasta raiz do projeto no seu terminal (onde o docker-compose.yml está):

cd C:\Users\Bruno Barbosa\Desktop\mini-gerenciador-tarefas

Construa as imagens Docker e inicie os contêineres:
Este comando construirá as imagens do backend e do frontend (se ainda não existirem ou se houver alterações nos Dockerfiles) e iniciará os serviços.

docker-compose up --build

Para rodar os contêineres em segundo plano (liberando o terminal):

docker-compose up -d --build

Acesse a Aplicação:

Frontend (Next.js): Abra seu navegador e acesse http://localhost:3001

Backend (NestJS): O backend estará acessível internamente na rede Docker Compose pelo nome backend na porta 3000. Você pode testá-lo diretamente com ferramentas como Thunder Client em http://localhost:3000.

Contêinerização com Docker:

Vantagens: Garante um ambiente de desenvolvimento e produção consistente, isola dependências, facilita a implantação e a escalabilidade.

Backend NestJS: Escolhido por sua estrutura modular, forte tipagem com TypeScript, e uso de decorators que facilitam a criação de APIs robustas e escaláveis.

Frontend Next.js (App Router e Client Components):

Comunicação entre Contêineres: A comunicação entre o frontend e o backend dentro do Docker Compose é feita usando o nome do serviço (http://backend:3000), aproveitando a rede interna do Docker. Isso é mais robusto do que usar localhost dentro dos contêineres.

🤝 Contribuição
Sinta-se à vontade para contribuir para este projeto. Abra issues para bugs ou sugestões, e envie pull requests com melhorias.
