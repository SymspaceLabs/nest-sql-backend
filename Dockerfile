# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy the package.json and package-lock.json files
COPY package*.json ./

#COPY .env /app/.env

# Install the dependencies (only production dependencies)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN nest build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
