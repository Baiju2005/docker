# Deployment

The client image builds the Vite frontend and serves it with Nginx. Nginx serves the frontend at `/`, serves SPA routes, and proxies `/api` to the Express app on the same host. Docker Compose also starts MySQL with a persistent data volume.

## First deployment

1. Copy `.env.example` to `.env` and replace each placeholder with strong values. Do not commit `.env`.
2. On the Linux host, install Docker Compose and `rsync`. Ensure the SSH user can run `docker compose`, create the deployment directory, and put the same production `.env` file there.
3. Point the domain to the host and allow inbound HTTP traffic on port 80.
4. Configure these GitHub repository secrets:
   - `DEPLOY_HOST`: server hostname or IP
   - `DEPLOY_USER`: SSH user
   - `DEPLOY_SSH_KEY`: private key for that user
   - `DEPLOY_KNOWN_HOSTS`: verified `known_hosts` entry for the server
   - `DEPLOY_PATH`: absolute path to a dedicated application directory

Pushes to `main` then sync the source and run `docker compose up -d --build` on the host. The deployment keeps the host `.env` file in place. To start manually, run `docker compose up -d --build` from the project directory.

The Compose file serves HTTP on port 80; configure a TLS reverse proxy if HTTPS is required.
