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

🚀 Como Executar o Projeto
Siga estas instruções para configurar e executar a aplicação utilizando Docker Compose.

Pré-requisitos
Certifique-se de ter o Docker Desktop (ou o daemon do Docker) instalado e em execução em sua máquina.

1. Configuração do Projeto
   Clone o repositório:

git clone https://github.com/Bruno90Barbosa/mini-gerenciador-tarefas
cd seu-repositorio # Navegue para a pasta raiz do projeto clonado

Configuração do Firebase/Firestore:
Este projeto utiliza o Firestore para persistência de dados. Para que ele funcione, você precisa:

Criar um Projeto Firebase: Vá para console.firebase.google.com e crie um novo projeto.

Configurar o Firestore: No seu projeto Firebase, vá em "Firestore Database" e crie um banco de dados em modo de produção (ou teste, mas ajuste as regras de segurança).

Regras de Segurança do Firestore: No Firestore, vá na aba "Rules" e publique as seguintes regras para permitir leitura e escrita na coleção de tarefas:

rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /artifacts/{appId}/public/data/tarefas/{documentId} {
allow read, write: if request.auth != null;
}
// Regras para dados privados (se aplicável, não usado diretamente neste exemplo)
match /artifacts/{appId}/users/{userId}/{documents=\*\*} {
allow read, write: if request.auth != null && request.auth.uid == userId;
}
}
}

Credenciais do Firebase Admin (para o Backend):

No seu projeto Firebase, vá em "Project settings" (Configurações do projeto) -> "Service accounts" (Contas de serviço).

Clique em "Generate new private key" (Gerar nova chave privada) e baixe o arquivo JSON.

Renomeie este arquivo JSON para firebase-admin-credentials.json e coloque-o na pasta backend/api/.

Importante: Este arquivo contém suas credenciais sensíveis. NÃO O COLOQUE NO CONTROLE DE VERSÃO GIT. Ele já está incluído no .gitignore do backend.

No backend/api/src/main.ts, a inicialização do Firebase Admin usa a variável global \_\_firebase_config. Para rodar localmente fora do ambiente Canvas, você precisaria ajustar essa inicialização para carregar o arquivo JSON diretamente. Por exemplo:

// src/main.ts (exemplo para rodar localmente fora do Canvas)
// ...
import \* as serviceAccount from '../firebase-admin-credentials.json'; // Ajuste o caminho conforme necessário

// ...
// Substitua a lógica de \_\_firebase_config por:
admin.initializeApp({
credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
console.log('Firebase Admin SDK inicializado com sucesso!');
// ...

Para o ambiente Canvas, a configuração atual do main.ts é suficiente, pois \_\_firebase_config é injetado.

Configurações do Firebase Client (para o Frontend):

No seu projeto Firebase, vá em "Project settings" (Configurações do projeto) -> "Your apps" (Seus apps) e selecione "Web".

Copie o objeto de configuração do Firebase (contém apiKey, authDomain, projectId, etc.).

Crie um arquivo .env.local na pasta frontend/web/.

Cole a configuração do Firebase Client neste arquivo, prefixando cada chave com NEXT*PUBLIC*. Exemplo:

NEXT_PUBLIC_API_KEY=AIzaSy...
NEXT_PUBLIC_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_APP_ID=1:...
NEXT_PUBLIC_MEASUREMENT_ID=G-...

Importante: Este arquivo .env.local também contém informações sensíveis e já está incluído no .gitignore do frontend.

2. Construção e Execução com Docker Compose
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
