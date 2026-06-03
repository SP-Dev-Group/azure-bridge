FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# 1. Copy package files first to optimize layer caching
COPY package*.json ./

# 2. Run a clean install of all dependencies required to build the React application
# (Deno's runtime natively supports running npm scripts and binaries)
RUN deno install

# 3. Copy the rest of your source code files into the working directory
COPY . .

# 4. Compile your React production assets into the /app/dist folder
RUN deno run --allow-run --allow-read --allow-write npm:run build

# 5. Correct file access ownership for the secure execution profile
RUN chown -R deno:deno /app

# 6. Drop permissions down to the secure application runtime account
USER deno

# 7. Start up your custom web asset proxy server
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-sys", "server.js"]
