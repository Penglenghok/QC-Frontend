# Use Node to build the app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Use a lightweight Node image to serve the app
FROM node:20-alpine

# Install the 'serve' package globally
RUN npm install -g serve

WORKDIR /app

# Copy build output from builder
COPY --from=builder /app/dist ./build

# Expose your desired port
EXPOSE 9090

# Use serve to run the static site on port 9090
CMD ["serve", "-s", "dist", "-l", "9090"]
