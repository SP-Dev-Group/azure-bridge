FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Prefer to run as a non-root user for security
USER deno

# Copy EVERYTHING from your GitHub repository into /app
# Your file structure inside the container becomes /app/src/main.ts
COPY . .

# Let Deno handle caching automatically at startup and point to the true path
CMD ["run", "--allow-net", "--allow-env", "src/main.ts"]
