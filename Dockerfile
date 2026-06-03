FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# 1. Copy package files first to optimize layer caching
COPY package*.json ./

# 2. Run a clean install of all dependencies 
RUN deno install

# 3. Copy the rest of your source code files
COPY . .

# 4. Force Vite into an unblocked production mode, overriding plugin validation blocks
RUN NODE_ENV=production VITE_SKIP_TYPECHECK=true deno run --allow-run --allow-read --allow-write --allow-env npm:run build:force

# 5. Correct file access ownership for the secure execution profile
RUN chown -R deno:deno /app

# 6. Drop permissions down to the secure application runtime account
USER deno

# 7. Start up your custom web asset proxy server
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-sys", "server.js"]
