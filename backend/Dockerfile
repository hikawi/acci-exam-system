# Production stage
FROM node:24-alpine AS production
WORKDIR /app

# Copy only production dependencies
COPY package*.json pnpm-lock.yaml ./

RUN apk add --no-cache curl
RUN corepack enable pnpm && pnpm i --prod --frozen-lockfile

# Copy built assets from builder stage
COPY ./src ./src
COPY ./drizzle.config.ts .

CMD ["pnpm", "tsx", "src/index.ts"]

