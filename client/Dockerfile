# Advantages of using bullseye-slim for Node.js in Docker:
# - Smaller image size & less disk space usage.
# - Reduced attack surface & improved security.
# - Faster build times with fewer dependencies.
# - Better resource utilization & improved performance.
FROM node:18.14.2-bullseye-slim
ENV NODE_ENV=development

WORKDIR /app

# Copy files - ignores files from .dockerignore file.
COPY client/ .

# Npm install packages.
RUN npm i

# Expose port for dev server.
EXPOSE 9000

# Start the development server.
CMD ["npm", "run", "dev"]