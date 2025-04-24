FROM 920373012959.dkr.ecr.us-east-1.amazonaws.com/nutriwork-dev-frontend:latest

#FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy frontend files
COPY . .

RUN rm -rf package-lock.json

# Install dependencies
RUN npm install

# Build frontend
RUN npm run build

# Install serve to serve the production build
RUN npm install -g serve

# Expose port
EXPOSE 5173

# Serve frontend
CMD ["serve", "-s", "dist", "-l", "5173"]