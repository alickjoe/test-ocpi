# OCPI Validator Deployment Guide

## Docker Deployment

### Prerequisites
- Docker installed on your VM
- If nginx is already running on port 80, this container will use port 8080

### Building and Running

1. **Build the Docker image:**
```bash
docker build -t ocpi-validator .
```

2. **Run with Docker:**
```bash
docker run -d --name ocpi-validator -p 8080:8080 ocpi-validator
```

3. **Or use Docker Compose (recommended):**
```bash
docker-compose up -d
```

### Accessing the Application
- Application: http://your-vm-ip:8080
- Health check: http://your-vm-ip:8080/health

### Integration with Existing Nginx

If you want to integrate with your existing nginx service, add this location block to your nginx configuration:

```nginx
location /ocpi-validator/ {
    proxy_pass http://localhost:8080/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

Then reload nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

This will make the application available at: http://your-vm-ip/ocpi-validator/

### Management Commands

```bash
# View logs
docker logs ocpi-validator

# Stop container
docker stop ocpi-validator

# Start container
docker start ocpi-validator

# Remove container
docker rm ocpi-validator

# Update application (rebuild and restart)
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Security Considerations

- The container runs as a non-root user
- Security headers are configured in nginx
- Health checks are enabled
- Only necessary ports are exposed

### Troubleshooting

1. **Port 8080 already in use:**
   - Change the port mapping in docker-compose.yml: `"8081:8080"`

2. **Container won't start:**
   - Check logs: `docker logs ocpi-validator`
   - Verify nginx config: `docker exec ocpi-validator nginx -t`

3. **Application not accessible:**
   - Check if container is running: `docker ps`
   - Verify port is open: `netstat -tlnp | grep 8080`