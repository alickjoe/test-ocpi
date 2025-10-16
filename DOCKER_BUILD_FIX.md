# Docker Build Fix Documentation

## Problem

The `docker compose up -d` command failed with the following error:

```
npm error ERESOLVE could not resolve
npm error While resolving: react-scripts@5.0.1
npm error Could not resolve dependency:
npm error peerOptional typescript@"^3.2.1 || ^4" from react-scripts@5.0.1
npm error Conflicting peer dependency: typescript@4.9.5
```

## Root Cause

The project has conflicting peer dependency requirements for TypeScript:

1. **react-scripts@5.0.1** requires `typescript@"^3.2.1 || ^4"` (TypeScript 3.x or 4.x)
2. **i18next@25.5.2** requires `typescript@"^5"` (TypeScript 5.x)
3. **react-i18next@16.0.0** requires `typescript@"^5"` (TypeScript 5.x)

These conflicting requirements caused npm to fail during dependency resolution.

## Solutions Applied

### 1. Fixed Dockerfile - Added `--legacy-peer-deps` Flag

**File**: `Dockerfile`

**Change**:
```dockerfile
# Before:
RUN npm ci --only=production

# After:
RUN npm ci --legacy-peer-deps
```

**Explanation**:
- Removed `--only=production` because we need dev dependencies to build the React app
- Added `--legacy-peer-deps` to bypass strict peer dependency resolution
- This allows npm to install packages even when peer dependency versions conflict

### 2. Fixed nginx.conf - Port Alignment

**File**: `public/nginx.conf`

**Change**:
```nginx
# Before:
listen 8080;
listen [::]:8080;

# After:
listen 3002;
listen [::]:3002;
```

**Explanation**:
- The Dockerfile exposes port 3002
- The nginx.conf was listening on port 8080
- This mismatch would cause the health check to fail
- Now both are aligned to use port 3002

## How to Deploy

Now you can successfully build and run the application:

```bash
# Build and start the container
docker compose up -d

# Check container status
docker ps

# View logs
docker compose logs -f

# Stop the container
docker compose down
```

## Verification

Once the container is running, you can verify it's working:

1. **Check container health**:
   ```bash
   docker ps
   # Should show "healthy" status after ~40 seconds
   ```

2. **Test health endpoint**:
   ```bash
   curl http://localhost:3002/health
   # Should return: healthy
   ```

3. **Access the application**:
   Open browser to: `http://localhost:3002`

## Technical Details

### Why --legacy-peer-deps?

The `--legacy-peer-deps` flag tells npm to use the legacy (npm v6) peer dependency resolution algorithm. This is necessary because:

1. Modern versions of React and related libraries (React 19, i18next 25) require TypeScript 5
2. react-scripts 5.0.1 was released before TypeScript 5 and only supports up to TypeScript 4
3. The flag allows both to coexist, prioritizing the project's direct dependencies

### Alternative Solutions (Not Recommended)

1. **Downgrade i18next and react-i18next**: Would lose features and security updates
2. **Upgrade to newer build tools**: Would require major refactoring (e.g., switching from react-scripts to Vite)
3. **Use --force flag**: Less safe than --legacy-peer-deps

### Future Considerations

To avoid this issue in the future:

1. **Migrate to modern build tools**: Consider migrating from react-scripts to Vite or Next.js
2. **Use TypeScript 4.x**: If possible, lock TypeScript to version 4.9.5 for compatibility
3. **Monitor react-scripts updates**: Watch for react-scripts 6.x which should support TypeScript 5

## Files Modified

1. ✅ `Dockerfile` - Updated npm install command
2. ✅ `public/nginx.conf` - Fixed port configuration

## Testing

The build has been validated to work with:
- Node.js 18 (alpine)
- npm ci with --legacy-peer-deps
- Multi-stage Docker build
- nginx alpine for production serving

---

**Date**: 2025-10-16  
**Issue**: TypeScript peer dependency conflict  
**Status**: ✅ Resolved
