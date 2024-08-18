#!/bin/sh
ENV=${ENV:-PROD}

# Change to the app directory
cd /app

npx prisma generate

if [ "$ENV" = "PROD" ]
then
    npm run build
    npm run start:migrate:prod
else
    npm run start:migrate:dev
fi
