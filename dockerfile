FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

ENV PGHOST=db
ENV PGPORT=5432
ENV PGUSER=user_agriculture
ENV PGPASSWORD=password_agriculture
ENV PGDATABASE=agriculture

RUN apt-get update && apt-get install -y postgresql-client

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
