FROM denoland/deno:alpine

# 1. Set the working directory inside the container
WORKDIR /app

# 2. Copy EVERYTHING from your repository into /app while root
# (We must copy files BEFORE switching users so Deno has permission to read them)
COPY . .

# 3. Build your React app assets into the /app/dist folder
# (If your project uses standard Vite, this runs your build command)
RUN deno task build || true

# 4. Change ownership of the files to the secure, non-root deno user
RUN chown -R deno:deno /app

# 5. Switch to the secure non-root user for runtime execution
USER deno

# 6. Run the static file server with necessary sandbox permissions
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-sys", "server.js"]
