Prezados alunos, segue abaixo as instrucoes para execucao deste projeto
Passo 1: executar
npm install

Passo 2:
abrir o arquivo .env e alterar, caso for, a variável abaixo
DATABASE_URL="mysql://root:@localhost:3306/mydbprisma"

para 

DATABASE_URL="mysql://<user>:<password>@localhost:3306/MEU_BANCO_DE_DADOS"

salvar arquivo .env

Passo 3:
observa o arquivo prisma/schema.prisma e analisar seu conteúdo. 
Vejam o model

Passo 4: migracao: 
npx prisma migrate dev --name init

Confirmar reescrita ou destruicao dos dados. 

passo 5: executar o comando
npx prisma studio

para visualizacao das tabelas, similar à 
interface localhost/phpmyadmin

finalmente 
executar:

node --watch server
