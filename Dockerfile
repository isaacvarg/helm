FROM node:20-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm prisma generate
RUN pnpm build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable

COPY --from=builder /app ./

EXPOSE 3000
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]
