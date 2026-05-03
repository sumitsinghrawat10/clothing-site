#
# Date		Owner			Change description
# 24-Mar-2026	Karthikeyan Annamalai	Working version of Docker file for dev. env. with Nginx.
#
# Build:	docker build -t compass-ui -f Dockerfile.dev.nginx .
# Run:		docker run -d -p 80:80 compass-ui
#

# Stage 1: Build the React application
# Use a lightweight Node.js image for building
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the static files with Nginx
# Use a lightweight Nginx image
FROM nginx:stable-alpine

# Copy the built files from the 'builder' stage to the Nginx static file directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx and serve the app
CMD ["nginx", "-g", "daemon off;"]
