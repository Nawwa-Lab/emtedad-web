# --- Base Stage (Shared dependencies) ---
FROM oven/bun:1-alpine AS base
WORKDIR /app
COPY package.json bun.lock  ./ 

# --- Development Stage ---
# This is what you use for local running/development
FROM base AS development
RUN bun install
COPY . .
EXPOSE 3000
ENV PORT=3000
CMD ["bun", "run", "dev"]

# --- Build Stage (Compiles Next.js) ---
FROM base AS builder
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
# Prune devDependencies so only production dependencies are left in node_modules
RUN bun install --production

# --- Production Stage (Final lean image) ---
FROM oven/bun:1-alpine AS production
WORKDIR /app
# Copy the compiled Next.js build output (.next) instead of dist, and include the public folder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
ENV PORT=3000
CMD ["bun", "start"]
