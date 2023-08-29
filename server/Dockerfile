# Use an official Node.js runtime as the base image
FROM node:14 AS backend

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY server/package*.json ./

# Install dependencies
RUN npm ci --production

# Copy the rest of the backend code
COPY server/ ./

# Expose the port your app runs on
EXPOSE 3001

# Command to start the backend
CMD ["yarn", "start"]
