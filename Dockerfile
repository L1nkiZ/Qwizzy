FROM node:24-alpine AS base

# Loading pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory
WORKDIR /app

# Expose the port the app runs on
EXPOSE 3000

# Development stage
FROM base AS development

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml .npmrc ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Start dev server
CMD ["pnpm", "dev"]

# Production stage
FROM base AS production

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml .npmrc ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Start the production server
CMD ["node", ".output/server/index.mjs"]