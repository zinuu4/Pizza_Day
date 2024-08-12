# Base Image
#####################################################
# This stage sets up the base image, ensuring that
# both development and production stages share the
# same foundation.
#####################################################
FROM node:20 AS base

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

#####################################################
# Stage 1: Development Stage
#####################################################
# This stage is specifically for development.
# It starts the development server with hot reloading.
#####################################################
FROM base AS development

# Install development dependencies
RUN npm install --only=development

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the development server
EXPOSE 3000

# Environment variables for development
ENV REACT_APP_ENV=development
ENV CHOKIDAR_USEPOLLING=true

# Start the development server
CMD ["npm", "start"]

#####################################################
# Stage 2: Build Stage
#####################################################
# This stage builds the React application for production.
#####################################################
FROM base AS build

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

#####################################################
# Stage 3: Production Stage
#####################################################
# This stage prepares the production image with the
# built files served by a lightweight web server.
#####################################################
FROM nginx:alpine AS production

# Copy the built files from the build stage to the Nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
