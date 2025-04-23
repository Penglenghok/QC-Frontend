# Stage 1: Build Vite app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with `serve` on port 9090
FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app

# Copy Vite's build output (which is in `dist/`)
COPY --from=builder /app/dist ./dist

EXPOSE 9090

# `--single` ensures React routing works (fallback to index.html)
CMD ["serve", "-s", "dist", "-l", "9090", "--single"]
