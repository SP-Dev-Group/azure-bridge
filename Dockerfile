FROM denoland/deno:alpine

# Set the working directory inside the container
WORKDIR /app

# Prefer to run as a non-root user for security
USER deno

# Copy EVERYTHING from your GitHub repository into /app
# This maps your code to /app/src/main.ts
COPY . .

# Cache the dependencies at build time using the correct path
RUN deno cache src/main.ts

# Execute the application on startup
CMD ["run", "--allow-net", "--allow-env", "src/main.ts"]
