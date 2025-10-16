# Multi-stage build for React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with legacy peer deps to resolve TypeScript version conflicts
# react-scripts@5.0.1 requires typescript ^3.2.1 || ^4, but i18next requires ^5
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Install curl for health checks
RUN apk --no-cache add curl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY public/nginx.conf /etc/nginx/conf.d/

# Copy built app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Change ownership of nginx directories
RUN chown -R nextjs:nodejs /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER nextjs

# Expose port 8080 instead of 80 to avoid conflicts
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3002/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]