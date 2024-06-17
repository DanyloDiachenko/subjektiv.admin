FROM node:lts as dependencies

RUN mkdir /app

COPY package.json /app

WORKDIR /app

RUN npm i --force

WORKDIR ..

FROM node:lts as builder

COPY . /app

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY .env /app/.env

ENV $(cat /app/.env | xargs)
RUN npm run build

FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./

EXPOSE 3000
CMD ["npm", "start"]
