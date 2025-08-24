FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --production=false

# Build
COPY . .
RUN npm run build
# Ensure Tailwind CSS is compiled in case Vite/PostCSS didn't emit a standalone file
RUN npm run build:css || echo "build:css failed, continuing"

# Runtime: serve static files with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# copy custom nginx config to proxy API calls to backend
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
