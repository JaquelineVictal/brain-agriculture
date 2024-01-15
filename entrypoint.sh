#!/bin/bash

# Instalar as dependências
yarn

# Rodar as migrações
npx prisma migrate dev

# Rodar o seed
npx prisma db seed

# Iniciar a aplicação
yarn start:dev
