# ---- Build stage ----
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

RUN npm install

# Copy remaining source code
COPY . .

# Build the frontend (important for React)
RUN npm run build


# ---- Runtime stage ----
FROM nginx:alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]