FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# 1. Copy package manifests first to leverage Docker layer caching
COPY package*.json ./

# 2. Install all Node/NPM dependencies natively via Deno
RUN deno install

# 3. Copy the rest of the application source files
COPY . .

# 4. Compile the React assets into the /app/dist folder
# We use '--' to pass flags straight to Vite, ignoring typescript/linting halts if necessary
RUN deno run --allow-run --allow-read --allow-write npm:run build -- --skipDiagnostics || deno run --allow-run --allow-read --allow-write npm:run build

# 5. Restructure ownership to the secure runtime user account
RUN chown -R deno:deno /app

# 6. Establish the execution context under the secure account
USER deno

# 7. Expose the server deployment script
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-sys", "server.js"]
