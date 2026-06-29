FROM node:20-alpine AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build --workspace=@workspace/obsidian-abyss

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app /app

EXPOSE 3000

CMD ["sh", "-c", "npm run serve --workspace=@workspace/obsidian-abyss -- --host 0.0.0.0 --port ${PORT:-3000}"]
