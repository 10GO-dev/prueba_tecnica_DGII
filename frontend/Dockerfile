FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Use npm install to avoid lockfile mismatches in the builder environment
# --legacy-peer-deps helps with peer dependency issues on older node images
RUN npm install --legacy-peer-deps

# Build
COPY . .
RUN npm run build
# build Tailwind CSS if script exists (produces ./dist/index.css)
RUN if [ -f package.json ] && npm run | grep -q "build:css" ; then npm run build:css || true; fi

# Runtime: serve static files with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# copy custom nginx config to proxy API calls to backend
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
