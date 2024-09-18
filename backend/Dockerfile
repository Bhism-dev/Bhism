# Use an official Node.js runtime as the base image
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Expose the port that your backend runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the backend
CMD ["npm", "run", "start"]
