# Use Node.js official image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Expose application port
EXPOSE 3000

# Start application
CMD ["node", "index.js"]