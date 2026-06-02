FROM denoland/deno:alpine-1.46.3

# Set working directory
WORKDIR /app

# Prefer to run as a non-privileged user
USER deno

# Cache dependencies ahead of time
COPY deno.json* .
# If your app uses a lockfile, uncomment the line below:
# COPY deno.lock .

# Copy the rest of your app source code
COPY . .

# Grant network permissions natively required by Deno
CMD ["run", "--allow-net", "--allow-env", "main.ts"]
