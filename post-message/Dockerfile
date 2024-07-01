# client/Dockerfile
FROM node:14-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the project (compile TypeScript to JavaScript)
RUN npm run build

# Use a smaller image for the final stage
FROM node:14-alpine
WORKDIR /app

# Copy the compiled files from the builder stage
COPY --from=builder /app/dist ./dist

# Also copy package.json and package-lock.json to install production dependencies
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install production dependencies
RUN npm install --only=production

# Expose the application port
EXPOSE 4002

# Start the application
CMD ["node", "dist/index.js"]
